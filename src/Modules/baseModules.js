import Vue from 'vue';
import VueRouter from 'vue-router'
import router from '../router/router'
import {getRequest} from '../axios/axios'
Vue.use(VueRouter)
/*types*/
const types = {
  INCREASE:'increase',//增加
  REQUEST_ACTION:'requestAction'//请求
}

/*states*/
const state = {
  count:0,
  res:{
    msg:'',
  }
}

/*mutations*/
const mutations = {
  [types.INCREASE](state, data) {
     state.count++
  },
  [types.REQUEST_ACTION](state, data) {
     state.res = data;
  },
}

/*actions*/
const actions = {
  actionIncrease: function ({commit, state}) {
    commit(types.INCREASE)
  },
  requestAction:function({commit, state},params){
    //请求
    getRequest(params).then((res) => {
      console.log('res',res);
      if(res.status != 200){

      }else{
         commit(types.REQUEST_ACTION,res);
         console.log('msg',res.msg)
         console.log('router',router)
         router.push({ path: '/demo'}); 
      }
    }).catch(() => {
    });
  }
} 

/*getters*/
const getters = {
    count:function(state){
        return state.count +=100;
    }
}

export default{
    state,
    mutations,
    actions,
    //getters
}