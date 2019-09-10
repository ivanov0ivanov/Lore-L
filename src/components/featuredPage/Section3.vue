<template>
  <section class="bg-3">
    <div class="container categories__container text-center pt-3 pb-3">

      <h1 class="h1__custom mb-3">{{$t('featured.selTasks')}}</h1>

      <div class="tasks">
        <router-link to="/task45" class="task__link">
            <span>
            <img src="../../assets/png/loreland1.png" width="42" height="42" class="tasks__img" alt="loreland">
            <img src="../../assets/svg/task1.svg" width="42" height="42" class="tasks__img" alt="loreland">
            </span>
          <span class="task__text pt-2">
              {{$t('featured.task')}} №45
            </span>
          <span>
              <span class="point point-green"></span>
              <span class="point point-blue"></span>
            </span>
        </router-link>

        <router-link to="/task44" class="task__link">
            <span>
              <img src="../../assets/png/loreland1.png" width="42" height="42" class="tasks__img" alt="loreland">
              <img src="../../assets/svg/task2.svg" width="42" height="42" class="tasks__img" alt="loreland">
            </span>
          <span class="task__text pt-2">
               {{$t('featured.task')}} №44
            </span>
          <span>
                <span class="point point-red"></span>
            </span>
        </router-link>
      </div>

    </div>
  </section>
</template>

<script>
  export default {
    name: 'Section3'
  };
</script>

