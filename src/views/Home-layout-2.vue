<template>
  <div class="layout-2">
    <div class="wrapper wrapper-home">
<!--      <div id="language">-->
<!--        <ul>-->
<!--          <li v-for="(l,key) in ['ru','en','ch']" :key="key" :class="{active:l==$store.getters.lang}"><a href="#" :class="l" @click.prevent="$store.commit('changeLanguage',{storage:!0,value:l})"></a></li>-->
<!--        </ul>-->
<!--      </div>-->
        <language-selector/>
      <div id="logo">
        <img src="/img/layout-2/logo.png" alt="">
      </div>
      <div id="header">
        <img src="/img/layout-2/girl.png" alt="">
        <p>
          {{$t('layout2.welcome')}}
        </p>
      </div>
      <div class="btn-group">
        <router-link to="/signin?register=true" class="btn active">
            {{$t('signin.signupConfirm')}}
        </router-link>
        <router-link to="/signin" class="btn">
            {{$t('signin')}}
        </router-link>
        <router-link to="/idea">
            {{$t('signin.guest')}}
        </router-link>
      </div>
    </div>
    <aside class="home">
      <h5>
          {{$t('appStyle')}}:
      </h5>
      <ul>
        <li v-for="(l,key) in 3" :key="key" :class="{active:$store.getters.layout==l}"><a href="#" @click.prevent="$store.commit('changeLayout',{storage:!0,value:l})"><img :src="'/img/layout-'+l+'.png'" alt=""></a></li>
      </ul>
    </aside>
  </div>
</template>
