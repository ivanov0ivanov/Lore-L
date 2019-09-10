<template>
  <section class="bg-2">
    <div class="container categories__container text-center pt-3 pb-3">

      <h1 class="h1__custom mb-3">{{$t('featured.selCategories')}}</h1>

      <ul class="categories">
        <li class="categories__design">
          <router-link to="/design" class="categories__link">
            <span class="point point-red"></span>
            {{$t('featured.design')}}
          </router-link>
        </li>
        <li class="categories__development">
          <router-link to="/development" class="categories__link">
            <span class="point point-blue"></span>
            {{$t('featured.dev')}}
          </router-link>
        </li>
        <li class="categories__translations">
          <router-link to="/translations" class="categories__link">
            <span class="point point-green"></span>
            {{$t('featured.translations')}}
          </router-link>
        </li>
      </ul>

    </div>
  </section>
</template>

<script>
  export default {
    name: 'Section2'
  };
</script>
