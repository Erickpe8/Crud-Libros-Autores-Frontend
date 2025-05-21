<template>
  <div>
    <h2>Agregar Autor</h2>
    <input v-model="nombre" placeholder="Nombre del autor" />
    <input v-model="apellido" placeholder="Apellido del autor" />
    <button @click="guardarAutor">Guardar</button>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import autorService from '@/services/autorService'

const nombre = ref('')
const apellido = ref('')
const error = ref('')

const guardarAutor = async () => {
  error.value = '' 

  if (!nombre.value || !apellido.value) {
    error.value = 'Por favor, complete todos los campos.'
    return
  }

  const nuevoAutor = {
    nombre: nombre.value,
    apellido: apellido.value
  }

  try {
    await autorService.create(nuevoAutor)
    nombre.value = ''
    apellido.value = ''
  } catch (err) {
    error.value = 'Error al guardar el autor. Intente nuevamente.'
    console.error(err)
  }
}
</script>
