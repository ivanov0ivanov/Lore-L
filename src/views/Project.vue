<template>
  <div class="container">
    <div :class="'layout-'+$store.getters.layout">
      <div class="wrapper" v-if="show">
        <router-view></router-view>
        <div class="wrapper-project">
          <div class="panel panel-1">
            <router-link to="/user" class="link-back"><i class="icon-left"></i></router-link>
            <router-link to="/" class="link-share"><i class="icon-export"></i></router-link>
            <h1 class="header">{{project.name}}</h1>
          </div>
          <div class="panel panel-2">
            <figure class="clearfix">
              <figcaption>
                <img src="/img/profile.jpg" alt="" class="img-rounded">
                <strong>Ilia Loreland</strong><br>
                <small>Автор 1 проекта<br><router-link to="/">Про автора</router-link></small>
              </figcaption>
              <p><em>{{2500000|cost}}<i class="icon-rouble"></i></em>Выплачено из {{100000000|cost}}</p>
            </figure>
            <div class="worker" data-percent="60%">
              <div class="done" style="width:60%"></div>
              <p>Степень готовности<br><small>Поучаствовали 3 чел.</small></p>
            </div>
            <a v-scroll-to="'#tasks'" class="btn btn-task">
              <span class="circles">
                <em class="c-1"></em>
                <em class="c-2"></em>
                <em class="c-3"></em>
                <em class="c-0"></em>
                <em class="c-4"></em>
                <em class="c-0"></em>
              </span>
              Открытые задания ({{tasks.length}})
            </a>
          </div>
          <div class="panel panel-3">
            <p>Площадка ("Платформа")  для совместного выполнения любых проектов - от ведения блога до межпланетного путешествия.</p>
            <div class="video">
              <a href="javascript:;" class="btn-play"><i class="icon-play"></i></a>
              <iframe src=""></iframe>
            </div>
          </div>
          <div class="panel panel-4">
            <h4 class="header">Описание проекта</h4>
            <p>
              <vue-simple-markdown :source="project.description" v-if="project.description"></vue-simple-markdown>
            </p>
            <a href="#" class="btn btn-next">Читать далее</a>
          </div>
          <div class="panel panel-5" id="tasks">
            <h3 class="header">Открытые задания</h3>
            <ul class="task-list">
              <li class="c-1" v-for="(task, index) in tasks" :key="index">
                <em></em>
                <strong>{{task.subject}}</strong>
                <p>Дизайн</p>
                <p class="cost">
                  <router-link :to="getSubmitLink(task)">
                    <i class="icon-right"></i>
                  </router-link>
                  {{task.laborCosts}}
                  <i class="icon-rouble"></i>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'project',
  props: ['id'],
  data: function() {
    return {
      show: false,
      project: {
        name: '',
        description: ''
      },
      tasks: []
    }
  },
  mounted () {
    this.loadProject()
    this.loadTasks()
  },
  methods: {
    getSubmitLink (task) {
      return {
        name: 'task_page',
        params: {
          task_id: task.id,
          project_id: this.$route.params.project_id
        },
        query: {
          userId: '5c802dd4a5e259192aa6dad2'
        }
      }
    },
    async loadProject () {
      const projectId = this.$route.params.project_id
      const URL = `/open_project/projects/${projectId}`
      let result = await this.$api.send('get', URL)
      if (result) {
        this.$set(this, 'project', result.data)
      }
    },
    async loadTasks () {
      const projectId = this.$route.params.project_id
      const URL = `/open_project/projects/${projectId}/work_packages`
      let result = await this.$api.send('get', URL)
      if (result) {
        let data = _.map(
          _.get(result, 'data._embedded.elements'),
          el => {
            return _.pick(
              el, ['id', 'subject', 'description', 'dueDate', 'createdAt', 'laborCosts']
            )
          }
        )
        this.$set(this, 'tasks', data)
      }
      this.show = true
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/css/project.css" scoped></style>

<style lang="stylus">

</style>
