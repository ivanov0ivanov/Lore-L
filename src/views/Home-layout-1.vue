<template>
  <div class="layout-1">
    <div class="wrapper wrapper-home">
      <language-selector/>
      <logo/>
      <div id="header">
        <h1 v-html="{
          ru: 'Совместная<br>удалённая работа<br><b>по-новому</b>',
          en: 'Beginning<br>remote collaboration<br><b>anew</b>',
          ch: '重新开始远程协作'}[$store.getters.lang]">
        </h1>
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
