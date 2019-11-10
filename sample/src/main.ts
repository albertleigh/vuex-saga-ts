import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/animate.css';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
