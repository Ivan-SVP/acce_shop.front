import {httpClient} from "@/api/main_server";
import store from '@/store'

export default {
    createJWT(formData) {
        return httpClient.post('/api/jwt/create/',  formData
        )
    },
    refreshJWT() {
        const refresh = store.getters.REFRESH || 'empty';
        return httpClient.post('/api/jwt/refresh/',  {'refresh': refresh})
    },

}