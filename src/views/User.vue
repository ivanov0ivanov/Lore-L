<template>
  <div class="container">
    <div :class="'layout-'+$store.getters.layout">
      <div class="wrapper">
        <div class="wrapper-register">
          <router-link to="/" class="link-back"><i class="icon-left-open-big"></i></router-link>
          <router-link to="/idea" class="link-idea"><i class="icon-right-open-big"></i></router-link>
			<button @click="signout">
				{{ getLocaleString('user' + '.signout', '!Выйти из учетной записи')}}
			</button>
          <WorkProjects></WorkProjects>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import WorkProjects from "../components/WorkProjects";

export default {
  components: {WorkProjects},
  data: () => {
    return {
      projects: [{
        name: 'one',
        id: 1
      }]
    }
  },
  async mounted () {
  },
	computed: mapGetters(['getLocaleString']),
	methods: mapActions(['signout'])
}
</script>

<style src="../assets/css/register.css" scoped></style>
