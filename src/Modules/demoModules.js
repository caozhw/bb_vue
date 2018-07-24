import Vue from 'vue';
import VueRouter from 'vue-router'
import router from '../router/router'
import {getRequest} from '../axios/axios'
Vue.use(VueRouter)
/*types*/
const types = {
  CHINESE:'chinese',//中文
  ENGLISH:'english'//英文
}

/*states*/
const state = {
  lang:'ZH' 
}

/*mutations*/
const mutations = {
  [types.CHINESE](state, data) {
     state.lang = 'ZH';
     document.cookie="lang="+state.lang;
     window.location.reload();
  },
  [types.ENGLISH](state, data) {
     state.lang = 'EN';
     document.cookie="lang="+state.lang;
     window.location.reload();
  },
}

/*actions*/
const actions = {
  chineseAction: function ({commit, state}) {
    commit(types.CHINESE)
  },
  englishAction: function ({commit, state}) {
    commit(types.ENGLISH)
  },
  
} 




export default{
    state,
    mutations,
    actions,
    //getters
}