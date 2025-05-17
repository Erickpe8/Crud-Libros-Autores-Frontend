import axios from 'axios'

const API = 'http://localhost:8000/api/autores'

export default {
  getAll: () => axios.get(API),
  get: (id) => axios.get(`${API}/${id}`),
  create: (data) => axios.post(API, data),
  update: (id, data) => axios.put(`${API}/${id}`, data),
  delete: (id) => axios.delete(`${API}/${id}`),
}
