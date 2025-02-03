import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.spacexdata.com',
});

export default apiClient;
