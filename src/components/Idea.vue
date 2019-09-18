<template>
  <div class="container__custom">
      <div :class="'layout-'+$store.getters.layout">
        <header>
            <TopHeader/>
        </header>
      <ul class="wrapper list-unstyled w-100">
        <SectionList v-for="(item, index) of items" :key="item.id" :index="index" :item="item" class="wrapper-idea"/>
      </ul>
    </div>
  </div>
</template>
<script>
import SectionList from "./sectionPageList/SectionList";
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import TopHeader from "./TopHeader";

export default {
  name: 'idea',
  components: {TopHeader, SectionList},
    data() {
        return {
            isProfile: 0
        };
    },

    methods: mapActions({
        setProfile: 'setProfile'
    }),

    mounted() {
        this.setProfile(this.isProfile);
    },

  computed: mapGetters ({
    items: 'getDefaultSections'
  })

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/css/idea.css" scoped>

</style>
