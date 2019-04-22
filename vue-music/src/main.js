// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import VueLazyload from "vue-lazyload"
import store from "./store"
import "babel-polyfill"
import fastclick from "fastclick"
import iView from "iview"
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
fastclick.attach(document.body);
Vue.prototype.$axios = axios;
Vue.use(iView);

Vue.use(VueLazyload, {
  loading: require("./common/image/default.gif"),
  error: require("./common/image/singer.png")
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
