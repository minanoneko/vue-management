import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as filter from './utils/filter';
import io from './plugin/socket'

Vue.use(ElementUI);
Vue.use(io);
Vue.config.productionTip = false;

Object.keys(filter).forEach(key=>{
  Vue.filter(key,filter[key])
})




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
