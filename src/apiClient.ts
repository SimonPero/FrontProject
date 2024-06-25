import axios from 'axios';
import { auth } from './auth';

//create an Axios instance 
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
});

//interceptor to add jwt
apiClient.interceptors.request.use(async (config) => {
  //get the current session
  const session = await auth();
  //if session has a jwt, added to the headers
  if (session?.jwt) {
    config.headers.Authorization = session.jwt;
  }
  return config;
});

export default apiClient;
