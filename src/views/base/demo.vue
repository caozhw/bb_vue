<template>
  <div>
  <h1>demo</h1>
    <h1>{{lang}}</h1>
    <h1>{{msg}}</h1>
     <button @click="zhClick">{{ $t("message.chinese") }}</button>
    <button @click="enClick">{{ $t("message.english") }}</button>
  </div>
</template>
<script>
  import util from '../../common/js/util';
  export default {
  data(){
    return {
      title: 'demo'
    }
  },
  mounted(){
     //document.cookie="lang="+"ZH";
    //util.getQueryStringByString('ZH');
  },
  computed:{

    lang(){
      return this.$store.state.demo.lang;
    },
    msg(){
      return this.$store.state.base.res.lang;
    },

  },
  methods:{
    zhClick() {
      this.$store.dispatch('chineseAction');
    },
    enClick() {
      this.$store.dispatch('englishAction');
    },
   
  }
}
</script>