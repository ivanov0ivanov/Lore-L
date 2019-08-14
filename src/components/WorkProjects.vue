<template>
  <div>
    <ul v-show="projects.length > 0">
      <li v-for="(project, index) in projects" :key="index">
        <router-link :to="'/project/' + project.id">{{project.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data: () => {
    return {
      projects: []
    }
  },
  mounted () {
    this.updateProjects()
  },
  methods: {
    async updateProjects() {
      const URL = '/open_project/projects'

      // sending url by axios vue plugin
      let result = await this.$api.send('get', URL)

      result = _.get(result, 'data._embedded.elements')
      if (result) {
        this.$set(this, 'projects', _.map(result, el => {
          return _.pick(el, ['name', 'id'])
        }))
      }
    }
  }
}
</script>

