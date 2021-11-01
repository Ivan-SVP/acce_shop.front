import catalog from "./catalog";
import order from "./order";
import auth from "./auth";


export default {
    ...auth,
    ...catalog,
    ...order,
}