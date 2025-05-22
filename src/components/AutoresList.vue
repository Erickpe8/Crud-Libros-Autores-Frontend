<template>
  <div>
    <h2>Lista de Libros</h2>
    <ul>
      <li v-for="libro in libros" :key="libro.id">
        {{ libro.titulo }} - Género: {{ libro.genero }} - Autor ID: {{ libro.autor_id }}
        <button @click="eliminarLibro(libro.id)">Eliminar</button>
        <button @click="editarLibro(libro)">Editar</button>
      </li>
    </ul>

    <div v-if="libroEditando">
      <h3>Editar Libro</h3>
      <input v-model="libroEditando.titulo" placeholder="Título" />
      <input v-model="libroEditando.genero" placeholder="Género" />
      <button @click="guardarEdicion">Guardar</button>
      <button @click="cancelarEdicion">Cancelar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import libroService from '@/services/libroService'

const libros = ref([])
const libroEditando = ref(null)

const cargarLibros = async () => {
  try {
    const res = await libroService.getAll()
    console.log('Libros recibidos:', res.data)
    libros.value = res.data
  } catch (error) {
    console.error('Error al cargar libros:', error)
  }
}

const eliminarLibro = async (id) => {
  try {
    await libroService.delete(id)
    console.log('Libro eliminado, actualizando lista...')
    await cargarLibros()
  } catch (error) {
    console.error('Error al eliminar el libro:', error)
  }
}

const editarLibro = (libro) => {
  libroEditando.value = { ...libro }
}

const guardarEdicion = async () => {
  try {
    await libroService.update(libroEditando.value.id, {
      titulo: libroEditando.value.titulo,
      genero: libroEditando.value.genero,
      autor_id: libroEditando.value.autor_id,
    })
    libroEditando.value = null
    await cargarLibros()
  } catch (error) {
    console.error('Error al guardar el libro:', error)
  }
}

const cancelarEdicion = () => {
  libroEditando.value = null
}

onMounted(cargarLibros)
</script>
