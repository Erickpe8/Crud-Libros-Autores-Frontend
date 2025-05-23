<template>
  <h1>Libros</h1>
  <LibroForm :autores="autores" @libroCreado="obtenerLibros" />
  <LibrosList :libros="libros" @libroEliminado="obtenerLibros" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LibroForm from '@/components/LibroForm.vue'
import LibrosList from '@/components/LibrosList.vue'
import api from '@/api'

const libros = ref([])
const autores = ref([])

  // Función para obtener la lista de libros
const obtenerLibros = async () => {
  const response = await api.get('/libros')
  libros.value = response.data
}

  // Función para obtener la lista de autores
const obtenerAutores = async () => {
  const response = await api.get('/autores')
  autores.value = response.data
}

onMounted(() => {
  obtenerLibros()
  obtenerAutores()
})
</script>
