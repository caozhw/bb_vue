// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import store from './store/store.js'
import router from './router/router'
import i18n from './common/js/lang.js'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Vuex);
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.http.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/*Vue.http.interceptors.push(function(request, next) {
  // modify method
  request.method = 'POST';
  // modify headers
  //request.headers.set('X-CSRF-TOKEN', 'TOKEN');
  //request.headers.set('Authorization', 'Bearer TOKEN');
  request.headers.set('Content-Type', 'application/x-www-form-urlencoded:charset=UTF-8');
  // continue to next interceptor
  next();
});*/



//Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  next()
  /*if (to.path == '/login') {
  }
  if (!user && to.path != '/login') {
    next({ path: '/login' });
  } else {
    next();
  }*/
})

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App }, 
  template: '<App/>'
})
