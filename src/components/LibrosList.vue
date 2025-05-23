<template>
  <div>
    <h2>Lista de Libros</h2>
    <ul>
      <li v-for="libro in libros" :key="libro.id">
        {{ libro.titulo }} - Género: {{ libro.genero }} - Autor: {{ libro.autor?.nombre }} {{ libro.autor?.apellido }}
        <button @click="eliminarLibro(libro.id)">Eliminar</button>
        <button @click="editarLibro(libro)">Editar</button> 
      </li>
    </ul>

    <div v-if="libroEditando">
      <h3>Editar Libro</h3>
      <input v-model="libroEditando.titulo" placeholder="Título" />
      <input v-model="libroEditando.genero" placeholder="Género" />
      <input v-model="libroEditando.autor_id" placeholder="ID Autor" />
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

  // Función para cargar la lista de libros
const cargarLibros = async () => {
  try {
    const res = await libroService.getAll()
    console.log('Libros recibidos:', res.data)
    libros.value = res.data
  } catch (error) {
    console.error('Error al cargar libros:', error)
  }
}

  // Función para eliminar un libro
const eliminarLibro = async (id) => {
  try {
    await libroService.delete(id)
    console.log('Libro eliminado, actualizando lista...')
    await cargarLibros()
  } catch (error) {
    console.error('Error al eliminar el libro:', error)
  }
}

  // Función para editar un libro
const editarLibro = (libro) => {
  libroEditando.value = { ...libro }
}

  // Función para guardar la edición de un libro
const guardarEdicion = async () => {
  try {
    console.log('Editando libro ID:', libroEditando.value.id)
    await libroService.update(libroEditando.value.id, {
      titulo: libroEditando.value.titulo,
      genero: libroEditando.value.genero,
      autor_id: libroEditando.value.autor_id
    })
    libroEditando.value = null
    await cargarLibros()

  //Manejo de errores en caso de haber alguno
  } catch (error) {
    if (error.response) {
      console.error('Error al guardar la edición:', error.response.data)
    } else if (error.request) {
      console.error('No hubo respuesta del servidor:', error.request)
    } else {
      console.error('Error inesperado:', error.message)
    }
  }
}

  // Función para cancelar la edición de un libro
const cancelarEdicion = () => {
  libroEditando.value = null
}

onMounted(cargarLibros)
</script>
