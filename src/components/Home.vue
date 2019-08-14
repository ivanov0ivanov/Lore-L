<template>
  <div class="container">
    <transition name="fade" mode="out-in" appear @after-enter="transitionComplete">
      <component :is="'layout'+$store.getters.layout"></component>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    layout1:  () => import('../views/Home-layout-1'),
    layout2:  () => import('../views/Home-layout-2'),
    layout3:  () => import('../views/Home-layout-3')
  },
  data: function() {
    return {
      scrollToTopAfterLayoutChange: false
    }
  },
  methods: {
    transitionComplete: function (el) {
      if (!el || !this.scrollToTopAfterLayoutChange || window.scrollBy==undefined && window.scrollTo==undefined) return;
      if (window.scrollBy==undefined) {window.scrollTo(0,0); return}
      var o = document.documentElement || document.body,
          h = setInterval(function(){
            window.scrollBy(0,o.scrollTop-15<0?-o.scrollTop:-15);
            if (o.scrollTop==0) clearInterval(h);
          },5);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/css/home.css"></style>
