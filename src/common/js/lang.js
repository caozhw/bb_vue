import Vue from 'vue'
import VueI18n from 'vue-i18n'
import util from './util.js';

//let lang = util.getQueryStringByName('lang')||'ZH';
let lang = util.getCookie('lang')||'ZH';

Vue.use(VueI18n);
/* 语言包 */
const i18n = new VueI18n({
  locale:lang,    // 语言标识
  messages: {
    'ZH': require('../lang/zh.js'),   // 中文语言包
    'EN': require('../lang/en.js')    // 英文语言包
  },
})


export default i18n;