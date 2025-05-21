<template>
  <div>
    <h2>Lista de Libros</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Género</th>
          <th>Autor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="libro in libros" :key="libro.id">
          <td>{{ libro.id }}</td>
          <td>{{ libro.titulo }}</td>
          <td>{{ libro.genero }}</td>
          <td>{{ libro.autor?.nombre }} {{ libro.autor?.apellido }}</td>
          <td>
            <button @click="eliminarLibro(libro.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import libroService from '@/services/libroService'

const libros = ref([])

const cargarLibros = async () => {
  const res = await libroService.getAll()
  libros.value = res.data
}

const eliminarLibro = async (id) => {
  await libroService.delete(id)
  cargarLibros()
}

onMounted(cargarLibros)
</script>
