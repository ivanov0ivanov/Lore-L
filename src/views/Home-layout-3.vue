<template>
  <div class="layout-3">
    <div class="wrapper wrapper-home">
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
