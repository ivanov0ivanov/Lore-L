<template>
  <nav v-bind:class="{active__custom: this.$store.state.isProfile}" class="navbar navbar-expand-lg p-0 nav-link__custom_container">
    <router-link to="/featured" class="nav-item nav-link nav-link__custom">{{$t('tabFeatured')}}</router-link>
    <router-link to="/profile" class="nav-item nav-link nav-link__custom">{{$t('tabProfile')}}</router-link>
  </nav>
</template>

<script>
  export default {
    name: 'Tabs'
  };
</script>

