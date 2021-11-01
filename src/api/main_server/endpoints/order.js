import {httpClient} from '@/api/main_server';

const base_path = '/api/orders'

export default {
    createOrder(orderData) {
        return httpClient.post(base_path + '/', orderData)
    },
}