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

const cargarAutores = async () => {
  const res = await autorService.getAll()
  autores.value = res.data
}

const guardarLibro = async () => {
  if (!titulo.value || !genero.value || !autor_id.value) return
  await libroService.create({
    titulo: titulo.value,
    genero: genero.value,
    autor_id: autor_id.value
  })
  titulo.value = ''
  genero.value = ''
  autor_id.value = ''
}

onMounted(cargarAutores)
</script>
