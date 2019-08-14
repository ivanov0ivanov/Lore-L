import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Api from './plugins/api'
import moment from 'moment'
import VueSimpleMarkdown from 'vue-simple-markdown'
import VueScrollTo from 'vue-scrollto'
import separatorNum from "@/filters/separatorNum.js";

import components from './components'

Vue.filter('cost', (cost) => {cost=cost.toFixed?cost.toFixed(0):cost;while(/\d{4,}/.test(cost))cost=cost.replace(/(\d)(\d\d\d)( |$)/,'$1 $2$3');return cost});
Vue.filter('date_time', (date, lang) => {return moment(date).locale(lang).format('MMMM Do YYYY, h:mm')});

Vue.config.productionTip = false
Vue.prototype.$console = console
Vue.prototype.$axios = window.axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Скроллинг вниз
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
// Поддержка markdown
Vue.use(VueSimpleMarkdown)
// Библиотека валидации форм
Vue.use(Vuelidate)
// Плагин для доступа к апи
Vue.use(Api)

Vue.filter("separatorNum", separatorNum);

// Вынесенные компоненты для логотипа и модуля выборов языков
// Модуль выборов не отображается на страних кроме главной из-за привязки стилизации
const { Logo, LanguageSelector } = components;
Vue.component('logo', Logo)
Vue.component('language-selector', LanguageSelector)
