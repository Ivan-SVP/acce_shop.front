import {httpClient} from '@/api/main_server';

const base_path = '/api/catalog'

export default {
    getProductList(params) {
        return httpClient.get(base_path + '/products/', {'params': params})
    },
    getProduct(productId) {
        return httpClient.get(base_path + '/products/' + productId)
    },
}