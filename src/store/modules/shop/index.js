import productList from './productList';
import productDetail from './productDetail';
import cart from './cart';
import checkout from './checkout';

const modules = {
    productList,
    productDetail,
    cart,
    checkout,
}
export default {
    namespaced: true,
    modules,
}