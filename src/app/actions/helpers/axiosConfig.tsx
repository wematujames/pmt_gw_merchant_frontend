import axios from 'axios';

const axiosConfig = axios.create({
  // baseURL: 'http://localhost:8682/api/v1/payasyoudump',
  // baseURL: 'https://preprod.iwmisussd.neravas.com/api/v1/payasyoudump',
  baseURL: 'https://prod.iwmisussd.neravas.com/api/v1/payasyoudump',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default axiosConfig;
