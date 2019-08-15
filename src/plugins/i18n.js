import Vue from 'vue'
import Vuei18n from 'vue-i18n'
import dbi18n from '../locale.json'

Vue.use(Vuei18n);

export const i18n = new Vuei18n({
    locale: 'ru',
    fallbackLocale:  'en' || 'ch',
    messages: {
        ru: dbi18n.ru,
        en: dbi18n.en,
        ch: dbi18n.ch
    }
});
