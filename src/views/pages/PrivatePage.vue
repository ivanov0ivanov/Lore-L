<template>
  <div>
    PrivatePage
    <router-link to="/project/3">Loreland</router-link>
    <br>
    <router-link to="/project/3">Loring start</router-link>
    <br>
    <router-link to="/profile">Профиль</router-link>
    <br>
    <router-link to="/project/3/task_page/42?userId=5c802dd4a5e259192aa6dad2">Задача 42</router-link>
  </div>
</template>

<script>
  export default {
    name: "PrivatePage"
  }
</script>

<style scoped>

</style>
