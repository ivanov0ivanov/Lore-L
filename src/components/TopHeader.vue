<template>
  <nav v-bind:class="{
  bg: !this.$store.state.isProfile,
  generalBg:this.$store.state.isProfile === null,
  bgTransparent:this.$store.state.isProfile === 0}" class="navbar pt-4 pb-1">
    <router-link to="/" class="menu-link back">
      <font-awesome-icon class="text-dark" icon="arrow-left"/>
    </router-link>
    <div>
      <a href="#" class="check-lang ml-2 text-muted" @click.prevent="setLocale('ru')">RU</a>
      <a href="#" class="check-lang ml-2 text-muted" @click.prevent="setLocale('en')">EN</a>
      <a href="#" class="check-lang ml-2 text-muted" @click.prevent="setLocale('ch')">CH</a>
    </div>
<!--    <div class="wrapper-home">-->
<!--      <language-selector/>-->
<!--    </div>-->

    <div class="d-flex align-items-center">
      <button type="button" class="menu-link btn pb-0 pt-0 btn__menu">
        <font-awesome-icon class="text-dark" icon="ellipsis-h"/>
      </button>

      <router-link to="/notification" class="menu-link notification">
        <font-awesome-icon class="text-dark" icon="bell"/>
      </router-link>

      <router-link v-if="this.$store.state.isProfile || this.$store.state.isProfile === null" to="/profile" class="menu-link profile">
        <font-awesome-icon class="text-dark" icon="user-circle"/>
      </router-link>
    </div>
  </nav>
</template>

<style scoped lang="sass">
  .bgTransparent
    background: transparent !important

  .wrapper-home
    min-height: auto !important
</style>
<script>
  export default {
    name: 'TopHeader',

    methods:{
      setLocale (locale){
        this.$i18n.locale = locale;
      }
    }
  };
</script>

