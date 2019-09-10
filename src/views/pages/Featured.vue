<template>
  <main>
    <header>
      <TopHeader/>
    </header>
    <header>
      <Tabs/>
    </header>
    <Section1/>
    <Section2/>
    <Section3/>
  </main>
</template>

<style scoped lang="sass">
main
  max-width: 375px
  margin: 0 auto
</style>

<script>
  import Section1 from '../../components/featuredPage/Section1';
  import Section2 from '../../components/featuredPage/Section2';
  import Section3 from '../../components/featuredPage/Section3';
  import Tabs from '../../components/Tabs';
  import { mapActions } from 'vuex';
  import TopHeader from "../../components/TopHeader";

  export default {
    name: 'Featured',
    components: {
      TopHeader,
      Tabs,
      Section3,
      Section2,
      Section1
    },

    data() {
      return {
        isProfile: true
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
