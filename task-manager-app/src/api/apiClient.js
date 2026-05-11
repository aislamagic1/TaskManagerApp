import axios from 'axios';

const apiClient = axios.create({
    //baseURL: "http://localhost:8080/api"
    baseURL: "http://taskmanagerapp-env.eba-agrebdxr.eu-central-1.elasticbeanstalk.com/api"
});

apiClient.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
)

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            if (window.location.pathname !== "/") {
                window.location.href = "/";
            }
        }
        return Promise.reject(error);
    }
);


export default apiClient;