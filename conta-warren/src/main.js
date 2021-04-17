import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './routes';

require("./registerPlugins");
require("./registerComponents");

Vue.config.productionTip = false;

new Vue({
  router,
  render: function (h) { return h(App); }
}).$mount('#app');

import 'bootstrap';
import './assets/css/theme.scss';
