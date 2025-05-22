<template>
  <div>
    <h2>Lista de Autores</h2>
    <ul>
      <li v-for="autor in autores" :key="autor.id">
        {{ autor.nombre }} - Libros: {{ autor.libros.length }}
        <button @click="eliminarAutor(autor.id)">Eliminar</button>
        <button @click="editarAutor(autor)">Editar</button> 
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

const autores = ref([])

const cargarAutores = async () => {
  const res = await autorService.getAll()
  console.log('Autores recibidos:', res.data)
  autores.value = res.data
}

const eliminarAutor = async (id) => {
  try {
    await autorService.delete(id)
    console.log('Autor eliminado, actualizando lista...')
    await cargarAutores()
  } catch (error) {
    console.error('Error al eliminar autor:', error)
  }
}


const autorEditando = ref(null)

const editarAutor = (autor) => {
  autorEditando.value = { ...autor }
}

const guardarEdicion = async () => {
  try {
    console.log('Editando autor ID:', autorEditando.value.id);
    console.log('Datos enviados:', {
      nombre: autorEditando.value.nombre,
      apellido: autorEditando.value.apellido,
    });

    await autorService.update(autorEditando.value.id, {
      nombre: autorEditando.value.nombre,
      apellido: autorEditando.value.apellido,
    });

    autorEditando.value = null;
    cargarAutores();
  } catch (error) {
    if (error.response) {
      console.error('Error al guardar la edición:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No hubo respuesta del servidor:', error.request);
    } else {
      console.error('Error inesperado:', error.message);
    }
  }
}




const cancelarEdicion = () => {
  autorEditando.value = null
}


onMounted(cargarAutores)
</script>
