<template>
  <div class="cabinet-menu">
    <div class="cabinet-menu__back">
      <router-link :to="params.back">
        <img src="@/assets/img/svg/arrow-left.svg" alt="">
      </router-link>
    </div>
    <div class="cabinet-menu__nav">
      <a href="#" @click.prevent>
        <img src="@/assets/img/svg/BTN.svg" alt="">
      </a>
    </div>
    <div class="cabinet-menu__posts">
      <router-link :to="params.postsLink">
        <img v-if="params.posts == 0" src="@/assets/img/svg/bell_white_no_posts.svg" alt="">
        <img v-else src="@/assets/img/svg/bell_white.svg" alt="">
      </router-link>
    </div>
    <div class="cabinet-menu__profile">
      <router-link :to="params.profile">
        <img src="@/assets/img/svg/profile_inv.svg" alt="">
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CabinetMenu",
    props: {
      params: Object
    },
    data() {
      return {
        showMenu: false
      }
    }
  }
</script>

<style lang="scss">
  .cabinet-menu {
    height: 70px;
    padding: 30px 15px 0;
    font-size: 30px;
    color: #000;
    text-align: right;

    > div {
      display: inline-block;
      vertical-align: top;
      height: 100%;
    }


    &__back {
      float: left;
    }

    &__nav {
      img {
        transform: translate3d(0, -10px, 0);
      }
    }

    &__posts,
    &__profile {
      margin: 0 0 0 13px;
    }

    &__profile img {
      transform: translate3d(2px, 3px, 0);
    }
  }
</style>