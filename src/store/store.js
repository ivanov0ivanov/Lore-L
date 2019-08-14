import Vue from 'vue'
import Vuex from 'vuex'
// файл локализации
import i18n from '../locale.json';
// ссылка на роутер
import router from '../router/router';
import alert from './alert'

// привязка аксиоса для установки токена и исполнения запросов
const axios = window.axios;
Vue.use(Vuex)

var plgIntoStorage = function(store) {
	var storageRenewAfter = 86400 * 10;

	// called when the store is initialized
	if (store.state.Storage.storage) {
		if (JSON.parse(store.state.Storage.storage).updateTime && JSON.parse(store.state.Storage.storage).updateTime < Math.floor((new Date()).getTime() / 1000) - storageRenewAfter)
			store.state.Storage.removeItem('storage');
		else
			store.commit('loadFromStorage');
		}

	store.subscribe(function(mutation, state) {
		// called after every mutation.
		// The mutation comes in the format of `{ type, payload }`.
		if (mutation.payload && mutation.payload.storage) {
			state.storage.updateTime = Math.floor((new Date()).getTime() / 1000);
			state.Storage.storage = JSON.stringify(state.storage);
		}
	});
}

// вынесенное persistence хранилище по умолчанию
const defaultStorage = {
	authenticationToken: null,
	updateTime: Math.floor((new Date()).getTime() / 1000),
	layout: 1,
	lang: 'ru'
}

export default new Vuex.Store({
	state: {
		Storage: sessionStorage || localStorage || {},
		storage: defaultStorage,

		// данные получаемые от сервера для формы
		//  возможно их стоит вынести в форму
		// но тогда придется перенести всю логику авторизации и регистрации туда
		// или настраивать передачу ошибок от сервера на форму (частично сделано)
		captchaQuery: 'q=' + Date.now(),
		authenticationState: null,
		authenticationErrorMessage: null
	},
	getters: {
		// простые геттеры аля layout: (state) => state.storage.layout следует заменить на mapState
		layout(state) {
			return state.storage.layout;
		},
		lang(state) {
			return state.storage.lang;
		},
		captchaQuery: (state) => state.captchaQuery,
		// функция для получения строки локализации
		// сигнатура (ключ локализации, строка по умолчанию)
		getLocaleString(state) {
			return(key, def = '') => {
				// TODO поменять геттер локализации на нормальную библиотеку
				const string = i18n[state.storage.lang][key] || def
				// если собрано для локальной разработки
				if (process.env.NODE_ENV === 'development')
					// отправлять на сервер все не добавленные в локализацию строки
					if (!i18n[state.storage.lang][key])
						axios.post('/missignTranslation', {key, def})
			return string
			}
		},
		authenticationState: state => ({
			state: state.authenticationState,
			message: state.authenticationErrorMessage
		}),
		authenticationToken: state => state.storage.authenticationToken
	},
	actions: {
		// функция обновления токена авторизации
		updateAuthenticationToken(store, token) {
			// привязывает в заголовки аксиоса
			window.axios.defaults.headers.common['authorization'] = `Bearer: ${token}`
			return store.commit('authenticationTokenUpdated', {
				token,
				storage: true // a bit bs, but okay
			})
		},
		// обработка серверных ошибок авторизации
		// see ~/server/user/errors.js
		handleAuthenticationErrors(store, {err, reject}) {
			switch (err.response.data.err) {
				case 'wrongData':
					store.commit('authenticationStateUpdated', 'ERR')
					store.commit('authenticationErrorMessageUpdated', store.getters.getLocaleString('authentication.wrongData', `Попробуйте еще раз, пароль неверен либо такого пользователя не существует`))
					break;
				case 'userExists':
					store.commit('authenticationStateUpdated', 'EXISTS')
					store.commit('authenticationErrorMessageUpdated', store.getters.getLocaleString('authentication.userExists', `К сожалению такой пользователь уже существует`))
					break;
				case 'tooManyTries':
					store.commit('authenticationStateUpdated', 'ERR')
					store.commit('authenticationErrorMessageUpdated', store.getters.getLocaleString('authentication.tooManyTries', `Слишком много неудачных попыток авторизации подряд. Подождите час и попробуйте снова, либо снимите блокировку пройдя по ссылке в письме, отправленному на ваш почтовый адрес`))
					break;
				case 'accountBlocked':
					store.commit('authenticationStateUpdated', 'ERR')
					store.commit('authenticationErrorMessageUpdated', store.getters.getLocaleString('authentication.tooManyTries', `Слишком много неудачных попыток авторизации подряд. Ваш аккаунт заблокирован, пройдите по ссылке в письме, отправленному на ваш почтовый адрес, чтобы снять блокировку`))
					break;
			}
			reject(null)
		},
		// авторизация
		signin(store, params) {
			store.commit('authenticationStateUpdated', null)
			return new Promise((resolve, reject) => axios
				.post('/user/signin', params)
				.then(async resp => {
					if (resp.data.message === 'success')
						await store.dispatch('updateAuthenticationToken', resp.data.user.token)
					resolve(true)
				})
				.catch(err => store.dispatch('handleAuthenticationErrors', {err, reject}))
				// обновлять капчу при каждом запросе
				.finally(store.commit('requestNewCaptcha'))
			)
		},
		signup(store, params) {
			store.commit('authenticationStateUpdated', null)
			return new Promise((resolve, reject) => axios
				.post('/user/signup', params)
				.then(resp => {
					if (resp.data.message !== 'success')
						throw new Error('unexpected signup response')

					store.commit('authenticationStateUpdated', null)
					store.dispatch('updateAuthenticationToken', resp.data.user.token)
					resolve(true)
				})
				.catch(err => store.dispatch('handleAuthenticationErrors', {err, reject}))
				.finally(store.commit('requestNewCaptcha'))
			)
		},
		// ручной выход пользователя
		signout(store) {
			store.dispatch('updateAuthenticationToken', null)
			router.push('/')
		}
	},
	mutations: {
		loadFromStorage(state) {
			if (state.Storage.storage && JSON.parse(state.Storage.storage)) {
				let i,
					a = {
						...defaultStorage,
						...JSON.parse(state.Storage.storage)
					}
				// проверка что в состояние не пытаются добавить несуществующие значения
				// ранее была логика ломающая загрузку состояния при нулевых значениях
				// что портит картинку так как токен по умолчанию === null
				for (i in state.storage)
					if (!defaultStorage.hasOwnProperty(i))
						delete a[i];
			state.storage = a;
				window.axios.defaults.headers.common['authorization'] = `Bearer: ${a.authenticationToken}`
			}
		},
		changeLayout(state, payload) {
			state.storage.layout = payload.value;
		},
		changeLanguage(state, payload) {
			state.storage.lang = payload.value;
		},

		requestNewCaptcha: (state) => state.captchaQuery = 'q=' + Date.now(),
		authenticationTokenUpdated: (state, {token}) => state.storage.authenticationToken = token,
		authenticationStateUpdated: (state, newState) => state.authenticationState = newState,
		authenticationErrorMessageUpdated: (state, message) => state.authenticationErrorMessage = message
	},
	plugins: [plgIntoStorage],
  // another modules
  modules: {
    alert: alert
  }
})
