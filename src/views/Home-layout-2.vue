<template>
  <div class="layout-2">
    <div class="wrapper wrapper-home">
      <div id="language">
        <ul>
          <li v-for="(l,key) in ['ru','en','ch']" :key="key" :class="{active:l==$store.getters.lang}"><a href="#" :class="l" @click.prevent="$store.commit('changeLanguage',{storage:!0,value:l})"></a></li>
        </ul>
      </div>
      <div id="logo">
        <img src="/img/layout-2/logo.png" alt="">
      </div>
      <div id="header">
        <img src="/img/layout-2/girl.png" alt="">
        <p>
          {{ {
               ru: `Привет! Рада видеть, но впредь не заставляй меня ждать!`,
               en: `Hi! Glad to see you, but don't make me wait again!`,
               ch: `您好！ 很高兴看到，但从现在开始不要让我等！`
             }[$store.getters.lang] }}
        </p>
      </div>
      <div class="btn-group">
        <router-link to="/signin?register=true" class="btn active">
          {{ {
               ru: 'Регистрация',
               en: 'Registration',
               ch: '注册'
             }[$store.getters.lang] }}
        </router-link>
        <router-link to="/signin" class="btn">
          {{ {
               ru: 'Вход',
               en: 'Log in',
               ch: '登录'
             }[$store.getters.lang] }}
        </router-link>
        <router-link to="/idea">
          {{ {
               ru: 'Войти гостем',
               en: 'Enter as guest',
               ch: '以访客身份进入'
             }[$store.getters.lang] }}
        </router-link>
      </div>
    </div>
    <aside class="home">
      <h5>
        {{ {
             ru: 'Стиль приложения',
             en: 'Application style',
             ch: '应用风格'
           }[$store.getters.lang] }}:
      </h5>
      <ul>
        <li v-for="(l,key) in 3" :key="key" :class="{active:$store.getters.layout==l}"><a href="#" @click.prevent="$store.commit('changeLayout',{storage:!0,value:l})"><img :src="'/img/layout-'+l+'.png'" alt=""></a></li>
      </ul>
    </aside>
  </div>
</template>
