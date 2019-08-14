<template>
  <div>
    <div class="container">
      <div :class="'layout-'+$store.getters.layout">
        <div class="wrapper">
          <div class="icons">
            <router-link class="back-btn" :to="generateBackwardLink">
              <img class="svg-back" src="@/assets/img/svg/back.svg" width="32">
            </router-link>
            <div class="icon-line">
              <Dropdown
                  :options="testopt"
              >
                <template>
                  <img class="svg-btn" src="@/assets/img/svg/BTN.svg" width="32" alt="">
                </template>
              </Dropdown>
              <router-link to="/profile">
                <img class="svg-bell" src="@/assets/img/svg/bell.svg" width="32" alt="">
              </router-link>
              <router-link to="/user">
                <img class="svg-profile" src="@/assets/img/svg/profile.svg" width="60" alt="">
              </router-link>
            </div>
          </div>
          <div class="content">
            <div class="top">
              <div class="thumbnail">
                <img :src="image" alt="">
                <h2 class="heading">{{task.subject}}</h2>
                <router-link tag="div" class="project-link" to="/project/3">
                  <img src="@/assets/img/svg/prLoreland_icon.svg" alt="">
                </router-link>
              </div>
            </div>
            <div class="bottom">
              <div class="infobox">
                <div class="heading">
                  <div class="cost">
                    {{task.laborCosts}}
                  </div>
                  <div class="time">
                    <img src="@/assets/img/svg/clock.svg" alt="">
                    {{calcTime}}
                  </div>
                </div>
                <div class="devider"></div>
                <p class="text">
                  <vue-simple-markdown :image="false" :source="getTaskText()"></vue-simple-markdown>
                </p>
              </div>
              <div class="overview">
                <div class="btn btn-black" @click="more = !more">
                  <span v-if="more">{{translate('taskPage.hide')}}</span>
                  <span v-else>{{translate('taskPage.detailed')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bar">
          <div class="wrapper-bottom">
            <router-link tag="div" class="btn" to="/listOfSolutions">
              <img src="@/assets/img/svg/list.svg" alt="">
              <div class="text">
                {{translate('taskPage.solutions')}} (3)
              </div>
            </router-link>
            <router-link tag="div" class="btn" to="/listInProgress">
              <img src="@/assets/img/svg/inProgr.svg" alt="">
              <div class="text">
                {{translate('taskPage.inProgress')}} (1)
              </div>
            </router-link>
            <router-link tag="div" class="btn" to="/comments">
              <img src="@/assets/img/svg/comments.svg" alt="">
              <div class="text">
                {{translate("taskPage.comments")}} (1)
              </div>
            </router-link>
          <router-link tag="div" class="btn active" :to="generateSubmitLink">
            <img src="@/assets/img/svg/sendHeartWhite.svg" alt="">
            <div class="text">
              {{translate('taskPage.offerSolution')}}
            </div>
          </router-link>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'

  import Dropdown from '@/components/Elements/Dropdown'

  export default {
    name: "TaskPage",
    data: () => {
      return {
        image: 'http://placehold.it/500x300',
        more: false,
        task: {
          subject: '',
          description: {
            raw: ''
          },
          dueDate: '',
          laborCosts: ''
        },
        testopt: [
          { name: 'One' },
          { name: 'Two' },
          { name: 'Three' }
        ]
      }
    },
    filters: {
      date_time: (date) => {
        return moment(date).locale('ru').format('MMMM Do YYYY, h:mm')
      }
    },
    computed: {
      generateSubmitLink () {
        let params = this.$route.params
        return `/project/${params.project_id}/submit/${params.task_id}`
      },
      generateBackwardLink () {
        return `/project/${this.$route.params.project_id}`
      },
      calcTime() {
        if (_.isEmpty(this.task.dueDate)) return ''
        let start = moment()
        let end = moment(this.task.dueDate)
        let diff = end.diff(start)
        let out = moment.utc(diff).format("DD HH");
        let [days, hours] = out.split(' ')
        return `${days}${this.translate('taskPage.day')} ${hours}${this.translate('taskPage.hour')}`
      }
    },
    methods: {
      getTaskText () {
        let text = this.getByPath(this.task, 'description.raw')
        if (this.more) {
          return text
        }
        let dotPos = text.indexOf('.')
        if (dotPos <= 0) {
          return text
        }
        return text.substring(0, dotPos + 1)
      },
      translate(value) {
        return this.$store.getters.getLocaleString(value)
      },
      // utility methos
      getByPath (value, path) {
        return _.get(value, path)
      },
      // loading content funcs
      async loadTaskInfo () {
        // полуучение задачи по id тестовый вариант
        const taskId = this.$route.params.task_id
        const URL = `/open_project/projects/3/work_packages`
        let result = await this.$api.send('get', URL)
        if (result) {
          let data = _.map(
            _.get(result, 'data._embedded.elements'),
            el => {
              return _.pick(
                el, ['id', 'subject', 'dueDate', 'createdAt', 'laborCosts', 'description']
              )
            }
          )
          let task = _.find(data, {id: parseInt(taskId)})
          if (!_.isEmpty(_.get(task, 'description.raw'))) {
            // eslint-disable-next-line no-console
            // const regex = new RegExp('!\\[\\][a-zA-Z0-9\\/(_]*\\)')
            // eslint-disable-next-line no-console
            const findreg = new RegExp('!\\[\\]\\(([a-zA-Z0-9\\/_]*)\\)')
            // change links to proxy links
            task.description.raw = task.description.raw
              .replace('/api/v3/attachments', '/open_project/attachments')
            // find image to show in prevew
            if (_.get(task.description.raw.match(findreg), '[1]')) {
              this.image = _.get(task.description.raw.match(findreg), '[1]')
            }
            // remove all images from description
            // task.description.raw = task.description.raw.replace(regex ,'')

          }
          this.$set(this, 'task', task)
        }
      }
    },
    mounted() {
      this.translate('kek')
      this.loadTaskInfo()
    },
    components: {
      Dropdown
    }
  }
</script>

<style lang="stylus" scoped>

  dark = rgb(31, 24, 48)
  col-pink = rgb(152, 71, 174)
  col-purple = rgb(84, 83, 155)

  // Reactive change all images in vue-simple-markdown block
  .vue-simple-markdown >>> img
    max-width 50% !important
    display: block;
    margin: 0 auto;

  *
    font normal normal 1em SFProText,serif;

  .wrapper
    position relative

  .footer-bar
    background-color dark
    display block
    color white
    margin-top 30px
    height 80px
    padding-top 10px
    border-radius 70px 0% 0% 0% / 70px 0% 0% 0%
    padding-left: 70px
    .btn
      cursor pointer
      display inline-block
      position relative
      height 70px
      width 20%
      margin-right 4%

      @media (max-width 750px)
        font-size: .8em

      &:last-child
        margin-right 0

      img
        position: absolute;
        top 15%
        left calc(50% - 14px)

        @media (max-width 600px)
          top 3%

      .text
        width 100%
        text-align center
        bottom 7px
        position absolute

     .active
      border-radius 5px;
      border 3px solid col-pink
      background-color col-purple

  .content
    margin-top 40px
    .top
      display: block
      height auto
      box-sizing border-box
      border-radius 0% 30% 0% 0% / 0% 40% 0% 0%
      background white
      overflow hidden
      z-index 9999

      .thumbnail
        position relative
        height 300px
        img
          z-index: 100
          width 100%
        .heading
          position absolute
          font-size 1.6em
          top 2em
          left 2em
          color white
          padding-right 15px
        .project-link
          cursor pointer
          font-size 1.2em
          position absolute
          bottom 1.3em
          right 2em
          color white
    .bottom
      background-color white
      border-radius 0% 0% 0% 150px / 0% 0% 0% 150px
      overflow hidden

      .infobox
        .heading
          display block
          height 50px
          padding-left 2em
          padding-right 2em
          position relative
          .cost
          .time
            position absolute
            display block
            line-height 50px
            font-size 1.2em
            height 50px
          .time
            right 2em
          .cost
            left: 2em
        .text
          font-size: 1.2em
          padding 2em

        .devider
          background-color gray
          display: block
          margin-left 1em
          margin-right 1em
          border-radius 1px
          height 2px


      .overview
        display block
        height 70px
        background-color dark
        line-height 70px
        color white
        text-align right
        padding-right 2em
        font-size 1.3em
        cursor pointer

        .btn-black
          height 70px
          line-height 70px


  .svg-back,
  .svg-bell,
  .svg-btn,
  .svg-profile
    cursor pointer
  .svg-back
    margin-left 20px
    margin-top 15px

  .svg-back,
  .svg-bell,
  .svg-btn,
  .svg-profile
  cursor pointer
  .svg-back
    margin-left 20px
    margin-top 15px
  .icon-line
    display inline-block
    margin-top 20px
    float right
    position relative
    width 270px
    .svg-bell
      top 14px
      left 65px
    .svg-btn
      left 0
      top 33px
    .svg-profile
      position absolute
      right 15px
    img
      margin-right 2em
  .icon-line
    position absolute
    top 0
    right 0
    .svg
      &-profile
        filter invert(1)
  .icon-line .svg-bell,
  .icon-line .svg-btn,
  .icon-line .svg-profile
    position absolute

  .icons
    .svg-back
      filter invert(1)

  .wrapper-bottom
    width auto
    max-width 768px
    margin 0 auto
    box-sizing border-box
</style>
