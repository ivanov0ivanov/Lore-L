import Vue from 'vue'
import Vuex from 'vuex'
// файл локализации
import i18n from '../locale.json';
// ссылка на роутер
import router from '../router/router';
import alert from './alert'

// привязка аксиоса для установки токена и исполнения запросов
const axios = window.axios;
Vue.use(Vuex);

var plgIntoStorage = function (store) {
    var storageRenewAfter = 86400 * 10;

    // called when the store is initialized
    if (store.state.Storage.storage) {
        if (JSON.parse(store.state.Storage.storage).updateTime && JSON.parse(store.state.Storage.storage).updateTime < Math.floor((new Date()).getTime() / 1000) - storageRenewAfter)
            store.state.Storage.removeItem('storage');
        else
            store.commit('loadFromStorage');
    }

    store.subscribe(function (mutation, state) {
        // called after every mutation.
        // The mutation comes in the format of `{ type, payload }`.
        if (mutation.payload && mutation.payload.storage) {
            state.storage.updateTime = Math.floor((new Date()).getTime() / 1000);
            state.Storage.storage = JSON.stringify(state.storage);
        }
    });
};

// вынесенное persistence хранилище по умолчанию
const defaultStorage = {
    authenticationToken: null,
    updateTime: Math.floor((new Date()).getTime() / 1000),
    layout: 1,
    lang: 'ru'
};

export default new Vuex.Store({
    state: {
        isProfile: null,
        query: 0,
        tokensCounter: {
            totalTokens: 10000,
            specialPartShare: 0,
            specialPartTokens: 0
        },
        defaultSections: [
            {
                id: 1,
                done: false,
                section: "Идея",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: [
                    {
                        id: 1,
                        done: false,
                        title: 'Разработать дизайн',
                        description: 'Дизайн',
                        tokens: '2000'
                    },
                    {
                        id: 2,
                        done: false,
                        title: 'Создать модуль',
                        description: 'Программирование',
                        tokens: '30000'
                    },
                    {
                        id: 3,
                        done: false,
                        title: 'Перевести на китайский',
                        description: 'Переводы',
                        tokens: '5000'
                    },
                    {
                        id: 4,
                        done: false,
                        title: 'Обновить сайт',
                        description: 'Веб',
                        tokens: '3000'
                    }
                ]
            },
            {
                id: 2,
                done: false,
                section: "Концепция",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: [
                    {
                        id: 1,
                        done: false,
                        title: 'Разработать дизайн',
                        description: 'Дизайн',
                        tokens: '2000'
                    },
                    {
                        id: 2,
                        done: false,
                        title: 'Создать модуль',
                        description: 'Программирование',
                        tokens: '30000'
                    },

                ]
            },
            {
                id: 3,
                done: false,
                section: "Сайт",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: []
            },
            {
                id: 4,
                done: false,
                section: "Документация",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: []
            },
            {
                id: 5,
                done: false,
                section: "Демо",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: []
            },
            {
                id: 6,
                done: false,
                section: "Сообщество",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: []
            },
            {
                id: 7,
                done: false,
                section: "Прототип",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: []
            },
            {
                id: 8,
                done: false,
                section: "Маркетинг",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: []
            },
            {
                id: 9,
                done: false,
                section: "Моб. версия (iOS, android)",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: []
            },
            {
                id: 10,
                done: false,
                section: "Раб. версия (PC)",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 100,
                tasksList: []
            },
            {
                id: 11,
                special: true,
                done: false,
                section: "Особая часть",
                description: 'Искусство преобразует закон исключённого третьего. Апостериори, гравитационный парадокс абстрактен.',
                share: 1,
                tokens: 1,
                tasksList: []
            }
        ],
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
        //for count tokens
        getTokensCounter: state => state.tokensCounter,

        //for sort items
        getQuery: state => state.query,
        //default sections
        //
        getDefaultSections: (state, _, store) => {
            const query = Number(store.query);

            if (!!query) {
                return state.defaultSections.filter(item => {
                    if(item.section === store.defaultSections[query].section) { // id не стабилен !!!
                        return item
                    }
                });
            } else if (query === 0) {
                return state.defaultSections.filter(item => {
                    if(item.section === store.defaultSections[query].section) { // id не стабилен !!!
                        return item
                    }
                });
            }
        },

        //header
        getIsProfile: state => {
            return state.isProfile
        },
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
            return (key, def = '') => {
                // TODO поменять геттер локализации на нормальную библиотеку
                const string = i18n[state.storage.lang][key] || def
                // если собрано для локальной разработки
                if (process.env.NODE_ENV === 'development')
                // отправлять на сервер все не добавленные в локализацию строки
                    if (!i18n[state.storage.lang][key])
                        axios.post('/missignTranslation', {key, def});
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
        recountSpecialPart: (context, recountTokens) => {
            context.commit('RECOUNT_SPECIAL_PART', recountTokens)
        },

        editTotalTokens: (context, totalTokens) => {
            context.commit('EDIT_TOTAL_TOKENS', totalTokens)
        },

        setQuery: (context , query) => {
            context.commit('SET_QUERY', query)
        },

        recountShare:(context, share) => {
            context.commit('RECOUNT_SHARE', share)
        },

        addTask: (context, {id, sectId}) => {
            context.commit('ADD_TASK', {
                id: id + 1,
                title: 'New Task',
                description: 'description',
                tokens: 0,
                done: false,
                sectId
            });
        },

        addSection: (context, id) => {
            context.commit('ADD_SECTION', {
                id: id + 1,
                done: false,
                section: '',
                description: '',
                share: 0,
                tokens: 0,
                tasksList: []
            });
        },


        deleteTask: (context) => {
            context.commit('DELETE_TASK');
        },

        deleteSection: (context) => {
            context.commit('DELETE_SECTION');
        },

        toggleDoneTask: (context, sectId) => {
            context.commit('TOGGLE_DONE_TASK', sectId);
        },

        toggleDone: (context, id) => {
            context.commit('TOGGLE_DONE', id);
        },

        editSections: (context, section) => {
            context.commit('EDIT_SECTIONS', section);
        },

        editTask: (context, section) => {
            context.commit('EDIT_TASK', section);
        },

        setProfile: (context, isProfile) => {
            context.commit('USER_PROFILE', isProfile);
        },

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
                    store.commit('authenticationStateUpdated', 'ERR');
                    store.commit('authenticationErrorMessageUpdated', store.getters.getLocaleString('authentication.wrongData', `Попробуйте еще раз, пароль неверен либо такого пользователя не существует`));
                    break;
                case 'userExists':
                    store.commit('authenticationStateUpdated', 'EXISTS');
                    store.commit('authenticationErrorMessageUpdated', store.getters.getLocaleString('authentication.userExists', `К сожалению такой пользователь уже существует`));
                    break;
                case 'tooManyTries':
                    store.commit('authenticationStateUpdated', 'ERR');
                    store.commit('authenticationErrorMessageUpdated', store.getters.getLocaleString('authentication.tooManyTries', `Слишком много неудачных попыток авторизации подряд. Подождите час и попробуйте снова, либо снимите блокировку пройдя по ссылке в письме, отправленному на ваш почтовый адрес`));
                    break;
                case 'accountBlocked':
                    store.commit('authenticationStateUpdated', 'ERR');
                    store.commit('authenticationErrorMessageUpdated', store.getters.getLocaleString('authentication.tooManyTries', `Слишком много неудачных попыток авторизации подряд. Ваш аккаунт заблокирован, пройдите по ссылке в письме, отправленному на ваш почтовый адрес, чтобы снять блокировку`));
                    break;
            }
            reject(null)
        },
        // авторизация
        signin(store, params) {
            store.commit('authenticationStateUpdated', null);
            return new Promise((resolve, reject) => axios
                .post('/user/signin', params)
                .then(async resp => {
                    if (resp.data.message === 'success')
                        await store.dispatch('updateAuthenticationToken', resp.data.user.token);
                    resolve(true)
                })
                .catch(err => store.dispatch('handleAuthenticationErrors', {err, reject}))
                // обновлять капчу при каждом запросе
                .finally(store.commit('requestNewCaptcha'))
            )
        },
        signup(store, params) {
            store.commit('authenticationStateUpdated', null);
            return new Promise((resolve, reject) => axios
                .post('/user/signup', params)
                .then(resp => {
                    if (resp.data.message !== 'success')
                        throw new Error('unexpected signup response');

                    store.commit('authenticationStateUpdated', null);
                    store.dispatch('updateAuthenticationToken', resp.data.user.token);
                    resolve(true)
                })
                .catch(err => store.dispatch('handleAuthenticationErrors', {err, reject}))
                .finally(store.commit('requestNewCaptcha'))
            )
        },
        // ручной выход пользователя
        signout(store) {
            store.dispatch('updateAuthenticationToken', null);
            router.push('/')
        }
    },
    mutations: {
        RECOUNT_SPECIAL_PART: (state, {recountShare, recountTokens}) => {
            state.tokensCounter.specialPartShare = recountShare;
            state.tokensCounter.specialPartTokens = recountTokens;
            state.defaultSections = state.defaultSections.map(item => {
                if(item.special === true) {
                    item.share = recountShare;
                    item.tokens = recountTokens;
                }
                return item
            })
        },

        EDIT_TOTAL_TOKENS: (state, totalTokens) => {
            state.tokensCounter.totalTokens = totalTokens;
        },

        SET_QUERY:(state, {newQuery}) => {
            if (state.query <= 0) state.query = 0;
            if (state.query >= state.defaultSections.length) state.query = state.defaultSections.length;
            state.query += newQuery;
        },

        RECOUNT_SHARE:(state, {id, share}) => {
            state.defaultSections = state.defaultSections.map(item => {

                if (item.id === id){
                    item.share += share;
                    item.tokens = 1000000;
                    item.tokens = item.tokens * item.share;
                    if (item.share <= 1) {
                        item.share = 1;
                        item.tokens = 1000000;
                    }
                    if (item.share >= 50) {
                        item.share = 50;
                        item.tokens = 1000000 * item.share //tmp
                    }
                }
                return item;
            })
        },

        ADD_TASK: (state, {id, done, title, description, tokens, sectId}) => {
            const task= {
                id: id,
                done: done,
                title: title,
                description: description,
                tokens: tokens
            };
            state.defaultSections = state.defaultSections.map(item => {
                if(item.id === sectId) {
                     item.tasksList.push(task)
                }
                return item;
            });
        },

        ADD_SECTION: (state, section) => {
            state.defaultSections.push(section);
        },

        DELETE_TASK: (state) => {
                state.defaultSections = state.defaultSections.map(item => {
                    item.tasksList = item.tasksList.filter(itm => itm.done !== true);
                    return item
                })

        },

        DELETE_SECTION: (state) => {
                state.defaultSections = state.defaultSections.filter(item => item.done !== true);
        },

        TOGGLE_DONE_TASK: (state, {done, sectId}) => {
            state.defaultSections = state.defaultSections.map(item => {
                if(item.id === sectId) {
                    item.tasksList = item.tasksList.map(itm => {
                        if(itm.id === done) {
                            itm.done = !itm.done;
                        }
                       return itm
                    });
                }
                return item;
            });
        },

        TOGGLE_DONE: (state, id) => {
            state.defaultSections = state.defaultSections.map(item => {
                if(item.id === id) {
                    item.done = !item.done;
                }
                return item;
            });
        },

        EDIT_SECTIONS: (state, {id, section, description, share, tokens}) => {
            state.defaultSections = state.defaultSections.map(item => {
                if (item.id === id) {
                    item.section = section;
                    item.description = description;
                    item.share = share;
                    item.tokens = tokens;
                }
                return item;
            });
        },

        EDIT_TASK: (state, {id, title, description}) => {
        state.defaultSections = state.defaultSections.map(item => {
            item.tasksList.map(itm => {
                if(itm.id === id) {
                    itm.title = title;
                    itm.description = description;
                }
                return itm
            });
            return item;
        });
    },

        USER_PROFILE: (state, isProfile) => {
            state.isProfile = isProfile;
        },

        loadFromStorage(state) {
            if (state.Storage.storage && JSON.parse(state.Storage.storage)) {
                let i,
                    a = {
                        ...defaultStorage,
                        ...JSON.parse(state.Storage.storage)
                    };
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
