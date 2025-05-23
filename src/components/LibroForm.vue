<template>
  <div>
    <h2>Agregar Libro</h2>

    <input v-model="titulo" placeholder="Título del libro" />
    <input v-model="genero" placeholder="Género" />
    
    <select v-model="autor_id">
      <option disabled value="">Seleccione un autor</option>
      <option v-for="autor in autores" :key="autor.id" :value="autor.id">
        {{ autor.nombre }}
      </option>
    </select>

    <button @click="guardarLibro">Guardar</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import libroService from '@/services/libroService'
import autorService from '@/services/autorService'

const titulo = ref('')
const genero = ref('')
const autor_id = ref('')
const autores = ref([])

  // Función para cargar la lista de autores
const cargarAutores = async () => {
  try {
    const res = await autorService.getAll()
    autores.value = res.data
  } catch (error) {
    console.error('Error al cargar autores:', error)
    alert('No se pudieron cargar los autores.')
  }
}

  // Función para guardar un nuevo libro
const guardarLibro = async () => {
  try {
    if (!titulo.value || !genero.value || !autor_id.value) {
      alert('Todos los campos son obligatorios')
      return
    }

    await libroService.create({
      titulo: titulo.value,
      genero: genero.value,
      autor_id: autor_id.value
    })

    titulo.value = ''
    genero.value = ''
    autor_id.value = ''

    //Manejo de errores
  } catch (error) {
    console.error('Error al guardar libro:', error)
    alert('Error al guardar el libro. Revisa la consola.')
  }
}

onMounted(cargarAutores)
</script>
