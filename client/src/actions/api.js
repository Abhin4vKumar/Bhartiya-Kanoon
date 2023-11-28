import axios from 'axios';

const api = axios.create({
  baseURL: 'https://verifybharatbackend.onrender.com',
  // baseURL: 'http://localhost:4000',
  headers: {
    Authorization: 'Bearer token',
  },
});

export default api;