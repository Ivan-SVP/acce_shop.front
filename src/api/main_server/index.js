import axios from 'axios';
import store from '@/store'
import router from '@/router'


const httpClient = axios.create();


const authInterceptor = config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `JWT ${token}`;
    } else{
        delete config.headers.Authorization
    }
    return config;
};

httpClient.interceptors.request.use(authInterceptor);

httpClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401){
            if (error.config.url === '/api/jwt/refresh/') {
                store.dispatch('logout').then(() => {
                    router.push({name: 'login'})
                    }
                );
                return Promise.reject(error);
            }
            return store.dispatch('refreshJWT').then(() => {
                    return httpClient.request(error.config)
                }
            )
        } else {
            return Promise.reject(error);
        }
    }
);


export { httpClient };