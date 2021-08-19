import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AsyncComputed from 'vue-async-computed'

import 'bootstrap/dist/js/bootstrap.min'


Vue.config.productionTip = false;
Vue.use(AsyncComputed)


const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default vm