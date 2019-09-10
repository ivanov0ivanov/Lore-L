<template>
  <div class="layout-1">
    <div class="wrapper wrapper-home">
      <language-selector/>
      <logo/>
      <div id="header">
            <i18n path="textHeader" tag="h1">
                <br place="break">
                <b place = "b">{{$t('anew')}}</b>
            </i18n>
      </div>
      <div class="btn-group d-block">
        <router-link to="/signin?register=true" class="btn active">
            {{$t('signin.signupConfirm')}}
        </router-link>
        <!-- <router-link to="/signin" class="btn">
            {{$t('signin')}}
        </router-link> -->
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
