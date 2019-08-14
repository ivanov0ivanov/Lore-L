<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style>
  #app {
    min-height: 100%;
  }
</style>
