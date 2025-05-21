import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia a tu URL backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient

// Autores
export function getAutores() {
  return apiClient.get('/autores');
}
export function createAutor(data) {
  return apiClient.post('/autores', data);
}
export function updateAutor(id, data) {
  return apiClient.put(`/autores/${id}`, data);
}
export function deleteAutor(id) {
  return apiClient.delete(`/autores/${id}`);
}

// Libros
export function getLibros() {
  return apiClient.get('/libros');
}
export function createLibro(data) {
  return apiClient.post('/libros', data);
}
export function updateLibro(id, data) {
  return apiClient.put(`/libros/${id}`, data);
}
export function deleteLibro(id) {
  return apiClient.delete(`/libros/${id}`);
}
