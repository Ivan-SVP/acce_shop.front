import {httpClient} from '@/api/main_server';

const base_path = '/api/catalog'

export default {
    getCategoryList(params) {
        return httpClient.get(base_path + '/categories/', {'params': params})
    },
    getProductList(params) {
        return httpClient.get(base_path + '/products/', {'params': params})
    },
    getProduct(productSlug) {
        return httpClient.get(base_path + '/products/' + productSlug)
    },
}