<template>
  <div>
    <h2>Lista de Autores</h2>
    <ul>
      <li v-for="autor in autores" :key="autor.id">
        {{ autor.nombre }} - Libros: {{ autor.libros.length }}
        <button @click="eliminarAutor(autor.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import autorService from '@/services/autorService'

const autores = ref([])

const cargarAutores = async () => {
  const res = await autorService.getAll()
  autores.value = res.data
}

const eliminarAutor = async (id) => {
  await autorService.delete(id)
  cargarAutores()
}

onMounted(cargarAutores)
</script>
