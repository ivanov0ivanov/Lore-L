<template>
  <div class="container__custom">
    <div :class="'layout-'+$store.getters.layout">
      <ul class="wrapper list-unstyled w-100">
        <SectionList v-for="(item, index) of items" :key="item.id" :index="index" :item="item" class="wrapper-idea"/>
      </ul>
    </div>
  </div>
</template>
<script>
import SectionList from "./sectionPageList/SectionList";
import { mapGetters } from 'vuex';

export default {
  name: 'idea',
  components: {SectionList},
  data() {
    return {
    }
  },
  computed: mapGetters ({
    items: 'getDefaultSections'
  })

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/css/idea.css" scoped></style>
