import Vue from 'vue'
import Vuex from 'vuex'

import baseModules from '../modules/baseModules'//demo
import demoModules from '../modules/demoModules'//demo

Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
      base:baseModules, //demo
      demo:demoModules, //demo
    }
})
export default store