<template>
  <div>
    Voting page
    <br>
    <router-link to="/privatePage">Назад</router-link>
    <br>
    <router-link to="/listOfSolutions">Решение 1</router-link>
    <br>
    <router-link to="/project/3">Проект</router-link>
    <br>
    <router-link to="/project/3">Раздел</router-link>
    <br>
    <router-link to="/project/3/task_page/42?userId=5c802dd4a5e259192aa6dad2/project/3">Задача 42</router-link>
    <br>
    <router-link to="/project/3">Like</router-link>
    <br>
    <router-link to="/project/3">Dislike</router-link>
  </div>
</template>

<script>
  export default {
    name: "VotingPage"
  }
</script>

<style scoped>

</style>
