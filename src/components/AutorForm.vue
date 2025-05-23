
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

  // Componente para agregar un nuevo autor
const nombre = ref('')
const apellido = ref('')
const error = ref('')

  // Función para guardar un nuevo autor
const guardarAutor = async () => {
  error.value = '' 

  // Validación de campos
  if (!nombre.value || !apellido.value) {
  // Si alguno de los campos está vacío, mostramos un mensaje de error
    error.value = 'Por favor, complete todos los campos.'
    return
  }

  // Si los campos están completos, creamos un nuevo autor
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
