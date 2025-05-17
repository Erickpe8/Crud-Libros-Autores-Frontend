import axios from 'axios'

const API = 'http://localhost:8000/api/libros'

export default {
  getAll: () => axios.get(API),
  create: (data) => axios.post(API, data),
  update: (id, data) => axios.put(`${API}/${id}`, data),
  delete: (id) => axios.delete(`${API}/${id}`),
}