import axios from "axios";

export const apiUrl = "http://localhost:8000";

const api = axios.create({
    baseURL: apiUrl,
})

// Variable to store CSRF token
let csrfToken: string | null = null;

api.interceptors.request.use(async (config) => {
    if (!csrfToken) {
        try {
            const response = await axios.get(apiUrl+'/csrf-token'); // Replace with your endpoint
            csrfToken = response.data.csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    }
    config.headers['X-CSRF-TOKEN'] = csrfToken;
    return config;
});

api.interceptors.request.use(
    
    // (config) => {
    //   const token = localStorage.getItem('userToken');
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    //   return config;
    // },
    // (error) => {
    //   return Promise.reject(error);
    // }
  );


api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('userToken');
        window.location.href = '/login'; // Redirect to login on 401 error
      }
      return Promise.reject(error);
    }
  );


export default api;

//const OPENWEATHER_KEY= "23797a061eb95004acc2216e6acea008"
