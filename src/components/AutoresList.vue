<template>
  <div>
    <h2>Lista de Autores</h2>
    <ul>
      <li v-for="autor in autores" :key="autor.id">
        {{ autor.nombre }} {{ autor.apellido }} - Número de libros: {{ autor.libros.length }}
        <button @click="editarAutor(autor)">Editar</button>
        <button @click="eliminarAutor(autor.id)">Eliminar</button>
      </li>
    </ul>

    <div v-if="autorEditando">
  <h3>Editar Autor</h3>
  <input v-model="autorEditando.nombre" placeholder="Nombre" />
  <input v-model="autorEditando.apellido" placeholder="Apellido" />
  <button @click="guardarEdicion">Guardar</button>
  <button @click="cancelarEdicion">Cancelar</button>
</div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import autorService from '@/services/autorService'

  // Importa el servicio de autores
const autores = ref([])
const autorEditando = ref(null)

  // Función para cargar la lista de autores
const cargarAutores = async () => {
  try {
    const res = await autorService.getAll() 
    autores.value = res.data

  } catch (error) {
    console.error('Error al cargar autores:', error)
  }
}

  // Función para eliminar un autor
const editarAutor = (autor) => {
  autorEditando.value = { ...autor }
}

  // Función para guardar la edición de un autor
const guardarEdicion = async () => {
  try {
    await autorService.update(autorEditando.value.id, {
      nombre: autorEditando.value.nombre,
      apellido: autorEditando.value.apellido
    })
    autorEditando.value = null
    await cargarAutores()
  } catch (error) {
    console.error('Error al actualizar autor:', error)
  }
}

  // Función para cancelar la edición de un autor
const cancelarEdicion = () => { 
  autorEditando.value = null
}

  // Función para eliminar un autor
const eliminarAutor = async (id) => {
  try {
    await autorService.delete(id)
    await cargarAutores()
  } catch (error) {
    console.error('Error al eliminar autor:', error)
  }
}

onMounted(cargarAutores)
</script>
