<template>
  <h1>Autores</h1>
  <AutorForm @autorCreado="obtenerAutores" />
  <AutoresList :autores="autores" @autorEliminado="obtenerAutores" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AutorForm from '@/components/AutorForm.vue'
import AutoresList from '@/components/AutoresList.vue'
import api from '@/api'

const autores = ref([])

const obtenerAutores = async () => {
  const response = await api.get('/autores')
  autores.value = response.data
}

onMounted(obtenerAutores)
</script>
