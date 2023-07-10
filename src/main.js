
import App from './App.vue'
import Vue from 'vue';
import store from './store/store.js';
import router from './router/router.js';

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');