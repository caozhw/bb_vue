<template>
  <div>
    <img src="../../assets/icon_yztg.svg" height="200" width="200">
    <p>{{title}}</p>
    <p>{{ $t("message.language") }}</p>
    <p>{{count}}</p>
    <p>{{msg}}</p>
    <button @click="add">增加数值</button>
    <button @click="requestAction">http</button>
  </div>
</template>
<script>
  import util from '../../common/js/util';
  export default {
  name: 'test',
  data(){
    return {
      title: 'demo'
    }
  },
  mounted(){
    //util.getQueryStringByString('ZH');
  },
  computed:{
    count() {
      return this.$store.state.base.count;
    },
    msg(){
      return this.$store.state.base.res.msg;
    },
    res(){
      return this.$store.state.base.res;
    }
  },
  methods:{
    add() {
      this.$store.dispatch('actionIncrease');
    },
    requestAction(){
      let params = {
        api_type:"otc",
        api_method:"Index_banner"
      }
      this.$store.dispatch('requestAction',params);
    },
   
  }
}
</script>
