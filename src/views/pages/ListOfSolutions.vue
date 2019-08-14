<template>
  <div>
    List of solutions
    <router-link to="/project/3">назад</router-link>
    <br>
    <div>
        <ul>
          <li>
            <router-link to="/project/3">Проект</router-link>
          </li>
          <li>
            <router-link to="/project/3">Раздел</router-link>
          </li>
          <li>
            <router-link to="/project/3">Категория</router-link>
          </li>
        </ul>
    </div>
    <div>
      <table>
        <tr>
        <tr>
          <th>№</th>
          <th>дата</th>
          <th>участник</th>
          <th>Просмотрено</th>
          <th>Действия</th>
        </tr>
        <tr>
          <th>1</th>
          <th>.</th>
          <th>.</th>
          <th>.</th>
          <th>
            <router-link to="/votingPage">Посмотреть</router-link>
          </th>
        </tr>
        <tr>
          <th>2</th>
          <th>.</th>
          <th>.</th>
          <th>.</th>
          <th>
            <router-link to="/votingPage">Проверить</router-link>
          </th>
        </tr>
        <tr>
          <th>3</th>
          <th>.</th>
          <th>.</th>
          <th>.</th>
          <th>
            <router-link to="/proofreadingPage">42%</router-link>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListOfDecisions"
  }
</script>

<style scoped>

</style>
