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
import {i18n} from "./plugins/i18n";
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faUserSecret,
    faArrowLeft,
    faArrowRight,
    faEllipsisH,
    faBell,
    faUserCircle,
    faPlus,
    faMinus,
    faPen,
    faSave
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faUserSecret, faArrowLeft, faArrowRight, faEllipsisH, faBell, faUserCircle, faMinus, faPlus, faPen, faSave);

Vue.component('font-awesome-icon', FontAwesomeIcon);


import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/sass/app.sass";


import components from './components'

Vue.filter('cost', (cost) => {
    cost = cost.toFixed ? cost.toFixed(0) : cost;
    while (/\d{4,}/.test(cost)) cost = cost.replace(/(\d)(\d\d\d)( |$)/, '$1 $2$3');
    return cost
});
Vue.filter('date_time', (date, lang) => {
    return moment(date).locale(lang).format('MMMM Do YYYY, h:mm')
});

Vue.config.productionTip = false;
Vue.prototype.$console = console;
Vue.prototype.$axios = window.axios;

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');

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
});
// Поддержка markdown
Vue.use(VueSimpleMarkdown);
// Библиотека валидации форм
Vue.use(Vuelidate);
// Плагин для доступа к апи
Vue.use(Api);

Vue.filter("separatorNum", separatorNum);

// Вынесенные компоненты для логотипа и модуля выборов языков
// Модуль выборов не отображается на страних кроме главной из-за привязки стилизации
const {Logo, LanguageSelector} = components;
Vue.component('logo', Logo);
Vue.component('language-selector', LanguageSelector);
