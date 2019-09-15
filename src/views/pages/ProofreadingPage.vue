<template>
  <div class="container">
    <div :class="'layout-'+$store.getters.layout">
      <div class="wrapper">
        <div class="content">
          <div class="heading">
            <div class="icons">
              <router-link class="back-btn" to="/listOfSolutions">
                <img class="svg-back" src="@/assets/img/svg/back.svg" width="32">
              </router-link>
              <div class="icon-line">
                <Dropdown>
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
            <router-link
                to="/project/3/task_page/42?userId=5c802dd4a5e259192aa6dad2"
                tag="div"
                class="taskName headline white--text">
              Проверка решения номер 1 задачи: №25
            </router-link>
          </div>
          <div class="bordered-white">
            <p
                v-for="(task, index) in allTasks"
                :class="{
                  active: index === activeTask,
                  addition: getAdditions.includes(index),
                  delition: getDelitions.includes(index)
                  }"
                :key="index"
                @click="activeTask = index"
            >
              <span v-if="!getAdditions.includes(index)">{{index + 1}}</span> {{task}}
            </p>
          </div>
          <div class="action-menu">
            <div class="button-group">
              <div class="btn btn-rounded left" @click="addLine()">Добавить строку</div>
              <div class="btn btn-rounded right" @click="deleteLine()">Удалить строку</div>
            </div>
            <textarea v-model="infoLine" name="" id="" cols="30" rows="5" :placeholder="getAreaPlaceholder()"></textarea>
            <div class="button-group-right">
              <div class="button-group">
                <div class="btn btn-rounded center-block custom-right">Отмена</div>
                <div>
                  <DropdownButton class="custom"
                      :config="config1"
                      @setSelectedOption="selectOption"
                  ></DropdownButton>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <textarea name="" cols="30" rows="5" placeholder="Добавить комментарий"></textarea>
            <div class="button-group-right">
              <div class="button-group left">
                <div class="btn btn-rounded center-block">Файлы</div>
              </div>
              <div class="button-group right">
                <div class="btn btn-rounded center-block custom-right-2">Отмена</div>
                <div>
                  <DropdownButton class="custom"
                                  :config="config2"
                                  @setSelectedOption="selectOption"
                  ></DropdownButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  import Dropdown from '@/components/Elements/Dropdown'
  import DropdownButton from '@/components/Elements/DropdownButton'

  export default {
    name: "ProofreadingPage",
    data: () => {
      return {
        config2: {
          options: [
            {
              value: "Отправить на голосование"
            },
            {
              value: "Не соответствует заданию"
            }
          ],
          placeholder: "Отправить на голосование",
          backgroundColor: "#79e2a3",
          textColor: "black",
          borderRadius: "7px",
          border: "1px solid darkgray",
          width: 280
        },
        config1: {
          options: [
            {
              value: "Отправить"
            },
            {
              value: "Добавить комментарий"
            }
          ],
          placeholder: "Отправить",
          backgroundColor: "#79e2a3",
          textColor: "black",
          borderRadius: "7px",
          border: "1px solid darkgray",
          width: 150
        },
        activeTask: -1,
        infoLine: '',
        tasks: [
          'Один',
          'lorem',
          'two',
          'three',
          'something',
        ]
      }
    },
    computed: {
      allTasks () {
        return this.tasks
      },
      getAdditions () {
        return _.reduce(this.tasks, (acc, el, index) => {
          if (el.startsWith('+')) {
            acc.push(index)
          }
          return acc
        }, [])
      },
      getDelitions () {
        return _.reduce(this.tasks, (acc, el, index) => {
          if (el.startsWith('-')) {
            acc.push(index)
          }
          return acc
        }, [])
      }
    },
    methods: {
      selectOption (option) {
        // eslint-disable-next-line no-console
        console.log(option)
      },
      getAreaPlaceholder () {
        if (this.activeTask === -1) {
          return 'Выделите строку для изменения'
        }
        return 'Введите добавляемый текст'
      },
      isSpecifySymbol (line) {
        const specifySymbols = ['+', '-'];
        let first = _.get(line, '[0]', '');
        return specifySymbols.includes((first));
      },
      addLine () {
        let tasks = _.cloneDeep(this.tasks);
        if (this.activeTask >= 0) {
          if (!_.isEmpty(this.infoLine)) {
            tasks.splice(this.activeTask + 1, 0, `+ ${this.infoLine}`);
            this.infoLine = ''
            this.$set(this, 'tasks', tasks)
          }
        } else {
          tasks.splice(tasks.length, 0, `+ ${this.infoLine}`);
          this.infoLine = ''
          this.$set(this, 'tasks', tasks)
        }
      },
      deleteLine () {
        if (this.activeTask >= 0) {
          let tasks = _.cloneDeep(this.tasks)
          let task = this.tasks[this.activeTask]
          if (_.get(task, '[0]') !== '-' && _.get(task, '[0]') !== '+' ) {
            tasks[this.activeTask] = '- ' + task
            this.$set(this, 'tasks', tasks)
          }
          if (_.get(task, '[0]') === '+' ) {
            tasks.splice(this.activeTask, 1)
            this.$set(this, 'tasks', tasks)
          }
        }
      }
    },
    components: {
      Dropdown,
      DropdownButton
    }
  }
</script>

<style lang="stylus" scoped>
  lightGreen = rgb(232, 242, 202)
  additionGreen = rgb(105, 185, 84)
  deletionRed = rgb(234, 52, 37)

  *
    font normal normal 1em SFProText,serif;

  .custom
    float right

  .custom-right
    position: absolute;
    right: 160px;

  .custom-right-2
    position: absolute;
    right: 290px;

  .heading
    position relative
    background #8a9cdc
    background -moz-linear-gradient(-45deg, #8a9cdc 31%, #c5bbdb 100%, #207cca 100%)
    background -webkit-linear-gradient(-45deg, #8a9cdc 31%, #c5bbdb 100%, #207cca 100%)
    background linear-gradient(135deg, #8a9cdc 31%, #c5bbdb 100%, #207cca 100%)
    height 230px
    border-radius 0% 0% 0% 100px / 0% 0% 0% 100px
    overflow hidden

    .taskName
      display: block
      width 100%
      text-align center
      font-weight bold
      position: absolute
      bottom 40px

  .content
    background white
    margin-bottom 140px

    .bordered-white
      margin 20px
      padding 10px
      border-radius 7px
      border 2px solid darkgray

      .active
        border: 1px solid darkgray
        border-radius 2px
        padding 3px
        background-color lightGreen

      .addition
        color additionGreen
        font-weight bold
        padding-left 10px

      .delition
        font-weight bold
        color deletionRed

  .action-menu
    padding-left 20px
    padding-right 20px

    .button-group
      position relative
      display block
      height 40px
      margin-top 10px

      .left,
      .right
        position absolute

      .left
        left 10px
      .right
        right 10px

  .comment-box
    display block
    margin-left 20px
    margin-right 20px
    margin-bottom 40px


  .button-group-right
     display block
     position: relative
     height:50px

     .left
       position: absolute
       left 10px
       top 10px

       .btn
         margin-right 10px
       &:last-child
         margin-right 0

     .right
       position: absolute
       right 10px
       top 10px

       .btn
         &:last-child
            margin-right 0

  .svg-back,
  .svg-bell,
  .svg-btn,
  .svg-profile
    cursor pointer
  .svg-back
    position relative
    top 30px
    left 15px

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
  .icon-line .svg-bell,
  .icon-line .svg-btn,
  .icon-line .svg-profile
    position absolute

  /* all custom elements*/
  .btn
    display: inline-block
    padding-top 5px
    padding-bottom 5px
    padding-left 10px
    padding-right 10px
    border 1px solid darkgray
    cursor pointer

    &-rounded
      border-radius 10px

  .headline
    font-size 1.5em
    cursor: pointer

  .center-block
    margin 0 auto

  .white--text
    color white

  textarea
    resize none
    display block
    box-sizing border-box
    outline none
    -moz-appearance none
    width 100%
    max-width 100%
    min-width 100%
    display block
    margin 0 auto
    border-radius 30px
    text-align left
    padding 30px
    font-size 1.3em

</style>
