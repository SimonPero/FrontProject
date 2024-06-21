import axios from 'axios';
import { auth } from './auth';

// Crear una instancia de Axios con la configuración base
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Interceptor para agregar el JWT a las solicitudes
apiClient.interceptors.request.use(async (config) => {
  // Obtener la sesión actual
  const session = await auth();
  // Si la sesión tiene un JWT, agregarlo a las cabeceras de la solicitud
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`;
  }
  return config;
});

export default apiClient;
