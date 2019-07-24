// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routers'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//  主题样式
import './style/index.scss'

Vue.config.productionTip = false

//引入扫描文件
import sca from './ScanFile'
Vue.use(sca)
Vue.use(ElementUI);

//  引入mock
require('./mock')

//  使用axios
import axios from './assets/js/axios'
Vue.prototype.$axios = axios;

// 使用vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 扫描vuex
import store from "./store"

import './style/index.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
