<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>

export default {
  mounted() {
    document.addEventListener('keydown', (e) => {
      let evtobj = window.event? event : e;
      let langs = ['ru','en','ch'];
      let next;
      langs.forEach( (elem, i) => {
        elem == this.$store.getters.lang ? next = (i + 1)%3  : null;
      });
      if (evtobj.keyCode == 81 && evtobj.ctrlKey) {
        this.$store.commit('changeLanguage',{storage:!0,value:langs[next]})
        this.$i18n.locale = this.$store.getters.lang;
      }
    });
  }
}
</script>

<style>
  #app {
    min-height: 100%;
  }
</style>
