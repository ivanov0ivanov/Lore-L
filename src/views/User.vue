<template>
  <div class="container__custom">
    <div :class="'layout-'+$store.getters.layout">
      <div class="wrapper">
        <div class="wrapper-register">
          <router-link to="/" class="link-back"><i class="icon-left-open-big"></i></router-link>
          <router-link to="/idea" class="link-idea"><i class="icon-right-open-big"></i></router-link>
			<button @click="signout">
				{{ getLocaleString('user' + '.signout', '!Выйти из учетной записи')}}
			</button>
          <WorkProjects></WorkProjects>
          <router-link :to="{ name: 'profile' }">{{$t('tabProfile')}}</router-link>
          <div></div>
          <router-link :to="{ name: 'votingPage' }">{{$t('voting.vote')}}</router-link>
          <div></div>
          <router-link :to="{ name: 'addtask' }">{{$t('addtasklogingrid.title')}}</router-link>
          <div></div>
          <router-link :to="{ name: 'listOfSolutions' }">{{$t('list.title')}}</router-link>
          <div></div>
          <router-link :to="{ name: 'listInProgress' }">{{$t('list.inProgress')}}</router-link>
          <div></div>
          <router-link :to="{ name: 'investments' }">{{$t('investments.office')}}</router-link>
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
