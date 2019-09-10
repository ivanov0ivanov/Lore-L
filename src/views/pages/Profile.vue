<template>
  <main>
    <header>
      <TopHeader/>
    </header>
    <header>
      <Tabs/>
    </header>
    <ProfileSection1/>
    <ProfileSection2/>
    <div class="container d-flex justify-content-end btn__container">
      <router-link to="/more" class="btn__more-info mb-3">
        Подробнее
        <font-awesome-icon icon="arrow-right"/>
      </router-link>
    </div>
    <ProfileSection3/>

  </main>
</template>

<style scoped lang="sass">
  main
    max-width: 375px
    margin: 0 auto
</style>

<script>
  import Tabs from '../../components/Tabs';
  import ProfileSection1 from '../../components/profilePage/Profile-section1';
  import ProfileSection2 from '../../components/profilePage/Profile-section2';
  import ProfileSection3 from '../../components/profilePage/Profile-section3';
  import { mapActions } from 'vuex';
  import TopHeader from "../../components/TopHeader";

  export default {
    name: 'Profile',
    components: {
      TopHeader,
      ProfileSection3,
      ProfileSection2,
      ProfileSection1,
      Tabs
    },
    data() {
      return {
        isProfile: false
      };
    },

    methods: mapActions({
      setProfile: 'setProfile'
    }),

    mounted() {
      this.setProfile(this.isProfile);
    }

  };
</script>

<style scoped lang="sass">
  .btn__container
    border-bottom-left-radius: 100px
    position: relative
    background-color: #ffffff
    z-index: 2

  .btn__more-info
    background-image: linear-gradient(to bottom, #c9cded, #cfcfed, #d4d2ec, #d9d4ec, #ddd7ec)
    padding: 0 10px 3px
    color: #9A99B4
    font-weight: 600
    border: 1px solid #807F7F
    border-radius: 15px
    vertical-align: middle
    text-decoration: none
</style>
