<template>
  <div>
    <h2>Agregar Autor</h2>
    <input v-model="nombre" placeholder="Nombre del autor" />
    <input v-model="apellido" placeholder="Apellido del autor" />
    <button @click="guardarAutor">Guardar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import autorService from '@/services/autorService'

const nombre = ref('')
const apellido = ref('')

const guardarAutor = async () => {
  if (!nombre.value || !apellido.value) return

  const nuevoAutor = {
    nombre: nombre.value,
    apellido: apellido.value
  }

  await autorService.create(nuevoAutor)

  nombre.value = ''
  apellido.value = ''
}
</script>
