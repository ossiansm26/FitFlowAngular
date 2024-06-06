import axios from "axios"
const baseURL = 'http://localhost:3001/api/'

const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluye el token en el encabezado de autorización
    },
  })
  const apiAuth = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
  })

  