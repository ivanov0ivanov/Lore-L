<template>
  <section class="bg-3__profile">
    <div class="container information__container text-center pt-3 pb-3">
      <div class="information">
        <div class="created-projects__container text-white font-weight-bolder">
          <router-link to="/projects" class="information__link created-projects text-white">
              {{$t('profile.basedProjects')}}: <span>2</span>
            <font-awesome-icon icon="arrow-right"/>
          </router-link>
        </div>

        <div class="done-tasks__container text-white font-weight-bolder">
          <router-link to="/done-tasks" class="information__link done-tasks text-white">
            {{$t('profile.doneTasks')}}: <span>12/9</span>
            <font-awesome-icon icon="arrow-right"/>
          </router-link>
        </div>


        <div class="check-tasks__container text-white">
          <router-link to="/check-tasks" class="information__link check-tasks text-white">
            {{$t('profile.verifiedSolutions')}}: <span>17</span>
            <font-awesome-icon icon="arrow-right"/>
          </router-link>
        </div>

        <div class="voting__container text-white">
          <router-link to="/votingPage" class="information__link voting-tasks text-white">
            {{$t('profile.voting')}}: <span>32</span>
            <font-awesome-icon icon="arrow-right"/>
          </router-link>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  export default {
    name: 'Profile-section3'
  };
</script>

<style scoped>

</style>
