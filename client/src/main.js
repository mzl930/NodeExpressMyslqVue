import Vue from 'vue'
import router from './router/index'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
//vee-validate
import './assets/js/vee-validate/validate.js';
import axios from 'axios'
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
