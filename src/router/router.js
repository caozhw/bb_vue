import VueRouter from 'vue-router'

import base from '@/views/base/base' //demo
import demo from '@/views/base/demo'

let routes = [
  //demo
  {
    path: '/',
    name: 'base',
    component: base,
    /*children:[
      { path: '/demo', component: demo, name: '例子'},
    ]*/
  },
  {
   path: '/demo',
    name: '例子', 
    component: demo,
    //children:[
    // { path: '/demo', component: demo, name: '例子'},
    // ]
  }

];

//export default routes;

export default new VueRouter({
  routes: routes
})
