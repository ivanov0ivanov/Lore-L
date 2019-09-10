<template>
  <section class="bg-1">
    <div class="container projects__container text-center pt-3 pb-3">
      <h1 class="h1__custom mb-3">{{$t('featured.selProj')}}</h1>

      <div class="row project-link__container">
        <div class="col-6 d-sm-flex justify-content-end ">
          <div class="project-link__position">
            <router-link to="/loreland" class="project-link mb-2">
              <img src="../../assets/png/loreland1.png" width="42" height="42" class="project-link__img" alt="loreland">
              Loreland
            </router-link>
            <router-link to="/loring-start" class="project-link">
              <img src="../../assets/svg/loringStart.svg" width="42" height="42" class="project-link__img" alt="loreland">
              Loring Start
            </router-link>
          </div>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <div>
            <router-link to="/start-newProject" class="project-link project-link__last">
              {{$t('featured.start')}} <span class="text-uppercase">{{$t('featured.newProj')}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Section1'
  };
</script>
