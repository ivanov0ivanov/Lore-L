<template>
  <div class="container">
    <!--alert and popup subComponents-->
    <Alert></Alert>
    <!-- submit decision popup-->
    <Popup
        :name="popup.text"
        :show="popup.show"
        @close="popup.show = false"
        @ok="sendDecision"
        :cancelText="$t('cancel')"
        :okText="$t('confirm')"
    >
      <template>
        <h3>Краткое решение: {{submitShortText | zero}}</h3>
        <h3>Полное решение решение: {{submitText | zero}}</h3>
        <h3>Прикрепленные файлы</h3>
        <ul class="popup-list">
          <li v-for="(file, index) in files" :key="index">
            {{ file.name }}: <span class="filesize">{{filesize(file.size)}} Мб</span>
          </li>
        </ul>
        <h3>Прикреплена визуализация: {{images | zeroOrYes}}</h3>
        <img :src="filePreview.file" height="140" v-show="filePreview.show" alt="">
      </template>
    </Popup>

    <!--show task popup-->
    <Popup
        :name="taskPopup.text"
        :show="taskPopup.show"
        @close="taskPopupClose"
        @ok="taskPopupClose"
        okText="Ок"
    >
      <div v-if="task">
        <h2>Название: {{task.subject}}</h2>
        <p>
          <vue-simple-markdown :source="getByPath(task, 'description.raw')"></vue-simple-markdown>
        </p>
        <p>Добавлена: {{task.createdAt | date_time}}</p>
        <p>Время завершения: {{task.dueDate | date_time}}</p>
        <p>Стоимость: {{task.laborCosts}}</p>
      </div>
    </Popup>
    <!--main code-->
    <div :class="'layout-'+$store.getters.layout">
      <div class="wrapper">
        <div class="decision clearfix">
          <div class="icons">
            <router-link class="back-btn" :to="getProjectLink">
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
          <div class="block-header">
            <div class="bordered">
              <h4 class="task-name" @click="taskPopup.show = true">
                Выложить решение <span class="violet">задачи №{{getTaskId()}}</span>
              </h4>
            </div>
          </div>
          <div class="block-short-desc">
            <div class="bordered">
              <div class="thumbs">
                <router-link class="thumb" tag="div" :to="getProjectLink">
                  <img class="thumb-img" src="@/assets/img/svg/loreland_icon.svg" alt="">
                  <div class="name-small">Проект</div>
                  <div class="name">Loreland</div>
                </router-link>
                <router-link class="thumb" tag="div" to="/project/3">
                    <img class="thumb-img svg-idea-blue"  src="@/assets/img/svg/idea_icon_blue.svg" alt="">
                    <div class="name-small">Раздел</div>
                    <div class="name">Идея</div>
                </router-link>
                <router-link class="thumb" tag="div" to="/project/3">
                  <img class="thumb-img svg-task" alt="">
                  <img class="thumb-img svg-red-circle" height="17" src="@/assets/img/svg/red_circle.svg" alt="">
                  <div class="name-small">Категория</div>
                  <div class="name">Дизайн</div>
                </router-link>
              </div>
              <input  class="input-field" type="text" name="task-short-text-decision" v-model="submitShortText" placeholder="Введите краткое описание решения">
            </div>
          </div>
          <div class="block-main-form">
            <div class="bordered">
              <div class="area">
                <div class="tip">Максимум 3000 символов</div>
                <textarea name="task-text-decision" v-model="submitText" placeholder="Решение" cols="30" rows="10">
            </textarea>
              </div>
            </div>
          </div>
          <div class="block-files clearfix" v-if="files">
            <ul>
              <li v-for="(file, index) in files" :key="index">
                {{ file.name }}: <span class="filesize">{{filesize(file.size)}} Мб</span>
                <span class="remove-link" @click="removeFile(index)">
              <img src="@/assets/img/svg/cancel.svg" alt="">
            </span>
              </li>
            </ul>
          </div>
          <div class="block-content clearfix">
            <div class="bordered">
              <div class="info-red" v-show="filesOversize">Превыщено ограничение 10Мб выбирете другие файлы!</div>
              <input name="files" id="files" type="file" class="inputfile" multiple="multiple" @change="onFileChange">
              <div class="btn-group">
                <label class="rounded button-dark btn-mini upload-buttons" for="files">
                  Приложить файл(ы)  (не более {{10 - this.filesOversize}}) Мб
                  <img src="@/assets/img/svg/file-upload-dark.svg" height="32" class="icon-right icon-upload" alt="">
                </label>
              </div>
              <div class="btn-group group2">
                <input name="images" id="images" type="file" class="inputfile" @change="onImageChange">
                <label class="rounded button-light btn-icon upload-buttons btn-down" for="images">
                  Приложить визуализацию (gif, jpg)
                  <img src="@/assets/img/svg/file-upload-light.svg" height="32" class="icon-right" alt="">
                </label>
              </div>
              <div class="visualization">
                <span v-show="!filePreview.show">Визуализация</span>
                <img :src="filePreview.file" height="140" v-show="filePreview.show" alt="">
              </div>
            </div>
          </div>
          <div class="block-buttons clearfix">
            <div class="button-group">
              <div class="btn btn-right" @click="showPopup">
                <img width="64" src="@/assets/img/svg/check.svg" alt="">
              </div>
              <router-link :to="getProjectLink">
                <div class="btn btn-left">
                  <img width="64" src="@/assets/img/svg/cancel_simple.svg" alt="">
                </div>
              </router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

import Popup from '@/components/Elements/Popup'
import Alert from '@/components/Elements/Alert'
import Dropdown from '@/components/Elements/Dropdown'

export default {
  name: "SubmitSolution",
  data: () => {
    return {
      testopt: [
        { name: 'One' },
        { name: 'Two' },
        { name: 'Three' }
      ],
      popup: {
        show: false,
        text: 'Подтвердите отправку'
      },
      taskPopup: {
        show: false,
        text: 'Текущая задача',
        data: {}
      },
      task: {},
      files: {},
      images: {},
      filePreview: {
        show: false,
        file: ''
      },
      submitOpen: false,
      submitShortText: '',
      submitText: '',
    }
  },
  async mounted () {
    await this.loadTaskInfo()
  },
  filters: {
    zero: (value) => {
      if (_.isEmpty(value)) return 'Не приложено'
      return value
    },
    zeroOrYes: (value) => {
      if (_.isEmpty(value)) return 'Не приложено'
      return 'Приложена'
    },
    date_time: (date) => {
      return moment(date).locale('ru').format('MMMM Do YYYY, h:mm')
    }
  },
  computed: {
    getProjectLink () {
      let params = this.$route.params
      return `/project/${params.project_id}/task_page/${params.task_id}`
    },
    filesOversize () {
      return this.checkOversize()
    }
  },
  methods: {
    getByPath (value, path) {
      return _.get(value, path)
    },
    taskPopupClose () {
      this.taskPopup.show = false
    },
    showPopup () {
      this.popup.show = true
    },
    getTaskId () {
      return _.get(this, 'task.id', 'задача не найдена!')
    },
    filesize (size) {
      return  (size / 1048576).toFixed(2)
    },
    checkOversize () {
      if (this.countUsedMemoryByFiles() > 10) {
        return true
      }
      return false
    },
    countUsedMemoryByFiles () {
      return _.reduce(this.files, (acc, file) => {
        acc += this.bytesToMegaBytes(
          _.get(file, 'size', 0)
        )
        return acc
      }, 0)
    },
    bytesToMegaBytes (value) {
      return value / 1048576
    },
    removeFile (index) {
      this.$set(this, 'files', _.omit(this.files, [index, 'item', 'length']))
    },
    onFileChange (e) {
      const allowedFileTypes = ['png', 'swg', 'jpg', 'pdf']
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      let result = _.cloneDeep(this.files)
      files = _.omit(files, ['item', 'length'])
      _.forEach(files, (file) => {
        if (_.get(file, 'name')) {
          let match = file.name.match(/.(\w+)$/)
          if (_.includes(allowedFileTypes, _.get(match, '[1]'))) {
            result[_.keys(result).length] = file
          }
        }
      })
      this.$set(this, 'files', result)
    },
    onImageChange (e) {
      const allowedImageTypes = ['jpg', 'gif']
      let images = e.target.files || e.dataTransfer.files;
      if (!images.length)
        return;

      if (images[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          // this.$set(this, 'filepreview.file', e.target.result)
          this.filePreview.file = e.target.result
          this.filePreview.show = true
        }
        reader.readAsDataURL(images[0]);
      }
      let result = _.cloneDeep(this.images)
      images = _.omit(images, ['item', 'length'])
      _.forEach(images, (image) => {
        if (_.get(image, 'name')) {
          let match = image.name.match(/.(\w+)$/)
          if (_.includes(allowedImageTypes, _.get(match, '[1]'))) {
            result[_.keys(result).length] = image
          }
        }
      })
      this.$set(this, 'images', result)
    },
    generateSuccessMessage () {
      let message = `Успешно отправлено решение ${this.task.subject}!`
      let len = _.keys(this.files).length
      if (len > 0) {
        message += ` с ${len} файлами! `
      }
      return message
    },
    cleanForm () {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    generateDecisionId () {
      // project number, category_name, task_id, counter
      const counter = 10
      // get project number, category_name, counter from api in mounted!
      return `${3}_${3}_${this.task.id}_${counter}`
    },
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
        this.$set(this, 'task', task)
      }
    },
    async sendDecision () {
      if (
        (_.get(this.task, 'id', 0) === 0) || _.isEmpty(this.userId) || _.isEmpty(this.submitText) || this.checkOversize()) {
        // send to user error message
        return
      }
      let formData = new FormData();

      formData.set('id', this.task.id)
      formData.set('decision_id', this.generateDecisionId())
      formData.set('project_id', 3) // test for loring === 3
      formData.set('userId', this.userId)
      formData.set('shortDecision', this.submitShortText)
      formData.set('decision', this.submitText)
      formData.set('status', 'new-task')

      if (!_.isEmpty(this.files)) {
        _.forEach(this.files, (file) => {
          formData.append('file', file);
        })
      }
      if (!_.isEmpty(this.images)) {
        _.forEach(this.images, (image) => {
          formData.append('image', image);
        })
      }
      try {
        let result = await axios.post(`/solutions/${this.$route.params.task_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (result) {
          let message = this.generateSuccessMessage()
          this.$store.commit('alert/setAlert', message)
          this.cleanForm()
          this.$router.push('/listOfSolutions')
        } else {
          this.$store.commit('alert/setAlert', 'Ошибка отправки')
        }

      } catch (e) {
        // send to user can't send decision message
        this.$store.commit('alert/setAlert', 'Не удалось отправить решение!')
      }
      this.popup.show = false
    }
  },
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  components: {
    Popup, Alert, Dropdown
  }
}
</script>

<style >
  .popup-list {
    margin-right: 20px;
  }

  .popup-list li{
    list-style: none;
  }

  .back-btn {
    display: block;
    top: 10px;
    position: absolute;
    left: 10px;
  }

  .btn-group {
    position: relative;
    width: 70%;
    margin: 0 auto;
  }

  .btn-mini {
    width: calc(100% - 90px) !important;
    transform: translateX(-44px);
  }

  .icon-right {
    position: absolute;
    cursor: pointer;
    top: 5px;
    right: 20px;
  }

  .svg-back,
  .svg-bell,
  .svg-btn,
  .svg-profile {
    cursor: pointer;
  }

  .svg-back {
    margin-left: 20px;
    margin-top: 15px;
  }

  .icon-line {
    display: inline-block;
    margin-top: 20px;
    float: right;
    position: relative;
    width: 270px;
  }
  .icon-line .svg-bell,
  .icon-line .svg-btn,
  .icon-line .svg-profile {
    position: absolute;
  }
  .icon-line .svg-bell {
    top: 14px;
    left: 65px;
  }
  .icon-line .svg-btn {
    left: 0;
    top: 33px;
  }
  .icon-line .svg-profile {
    position: absolute;
    right: 15px;
  }
  .icon-line img {
    margin-right: 2em;
  }

  /*design styles*/
  .block-header {
    background-color: #859bdc;
  }
  .block-header .task-name {
    font-size: 1.5em;
    padding-left: 47px;
    margin-top: 55px;
  }
  .block-header .bordered {
    background-color: white;
    margin-top: 40px;
    border-radius: 0% 0% 0% 8%/19% 0% 0% 70%;
    height: auto;
    overflow: auto;
    padding-bottom: 10px;
  }

  .block-short-desc {
    background-color: #201930;
  }
  .block-short-desc .bordered {
    background: #8a9cdc;
    /* Old browsers */
    background: -moz-linear-gradient(-45deg, #8a9cdc 31%, #c5bbdb 100%, #207cca 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(-45deg, #8a9cdc 31%, #c5bbdb 100%, #207cca 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(135deg, #8a9cdc 31%, #c5bbdb 100%, #207cca 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#8a9cdc", endColorstr="#207cca",GradientType=1 );
    /* IE6-9 fallback on horizontal gradient */
    border-radius: 0% 0% 0% 10%/19% 0% 0% 41%;
    height: 200px;
  }
  .block-short-desc .bordered .thumbs {
    display: block;
    width: 80%;
    margin: 0 auto;
    padding-top: 22px;
    margin-bottom: 10px;
  }
  .block-short-desc .bordered .thumbs .thumb {
    display: inline-block;
    width: 155px;
    height: 75px;
    border: 2px solid white;
    border-radius: 10px;
    margin-right: 15px;
    position: relative;
    cursor: pointer;
  }

  .block-short-desc .bordered .thumbs .thumb:first-child {
    width: 200px;
  }
  .block-short-desc .bordered .thumbs .thumb .name-small {
    position: absolute;
    top: 5px;
    right: 26px;
    color: white;
    font-size: 0.9em;
  }
  .block-short-desc .bordered .thumbs .thumb .name {
    display: block;
    position: absolute;
    top: 30px;
    right: 20px;
    font-size: 1.4em;
    font-weight: bold;
    color: white;
  }
  .block-short-desc .bordered {
    overflow: auto;
    padding-bottom: 20px;
    height: auto;
  }
  .block-short-desc .bordered .thumbs .thumb:last-child {
    margin-right: 0;
  }

  .thumb-img {
    position: absolute;
    left: 10px;
    top: 11px;
    cursor: pointer;
  }

  .block-main-form {
    background-color: white;
    height: 340px;
  }
  .block-main-form .bordered {
    height: 340px;
    border-radius: 0% 0% 0% 10%/19% 0% 0% 19%;
    background-color: #201930;
    padding-top: 27px;
  }
  .block-main-form .bordered .area {
    position: relative;
    margin: 0 auto;
    width: 70%;
  }
  .block-main-form .bordered .area .tip {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    display: block;
    margin: 0 auto;
    position: absolute;
    right: 30px;
    text-align: right;
    bottom: 12px;
  }

  .svg-idea-blue {
    top: 16px;
    left: 16px;
  }

  .btn-down {
    margin-bottom: 20px !important;
    box-sizing: border-box;
    margin: auto !important;
    width: 100% !important;
  }

  .block-files {
    width: 70%;
    margin: 0px auto;
    padding-top: 50px;
  }
  .block-files ul li {
    list-style: none;
    margin-bottom: 18px;
    position: relative;
  }
  .block-files ul li .remove-link {
    position: absolute;
    right: 0;
  }

  .block-content {
    margin-top: 20px;
    background-color: #80ccae;
  }
  .block-content .bordered {
    background-color: white;
    border-radius: 0% 0% 0% 9%/19% 0% 0% 29%;
    overflow: auto;
    height: auto;
    padding-bottom: 20px;
  }
  .block-content .bordered .visualization {
    display: block;
    width: 70%;
    height: 140px;
    border-radius: 15px;
    border: 2px solid black;
    margin: 0 auto;
    line-height: 140px;
    text-align: center;
    font-size: 1.3em;
  }

  .block-buttons {
    background: #80ccae;
    /* Old browsers */
    background: -moz-linear-gradient(left, #80ccae 0%, #73c773 100%, #7db9e8 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(left, #80ccae 0%, #73c773 100%, #7db9e8 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, #80ccae 0%, #73c773 100%, #7db9e8 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#80ccae", endColorstr="#7db9e8",GradientType=1 );
    /* IE6-9 */
  }
  .block-buttons .button-group {
    display: block;
    width: 70%;
    margin: 0 auto;
    height: 70px;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  /*design styles end*/
  .button-dark {
    background-color: #201930;
  }

  .button-light {
    position: relative;
    background: #8a9cdc;
    /* Old browsers */
    background: -moz-linear-gradient(-45deg, #8a9cdc 31%, #c5bbdb 100%, #207cca 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(-45deg, #8a9cdc 31%, #c5bbdb 100%, #207cca 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(135deg, #8a9cdc 31%, #c5bbdb 100%, #207cca 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#8a9cdc", endColorstr="#207cca",GradientType=1 );
    /* IE6-9 fallback on horizontal gradient */
  }

  .btn-group label,
  .inputfile + label {
    box-sizing: border-box;
    font-size: 1.1em;
    font-weight: 700;
    color: white;
    display: block;
    width: 70%;
    margin: 0 auto;
    padding: 9px;
    border-radius: 24px;
    cursor: pointer;
    margin-bottom: 10px;
    text-align: center;
  }

  /*input-customize*/
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  /*input-customize*/
  .input-field {
    outline: none;
    -moz-appearance: none;
    width: 70%;
    height: 30px;
    border: none;
    border-radius: 30px;
    text-align: center;
    display: block;
    margin: 0px auto;
    padding: 6px;
    font-size: 1.1em;
  }

  .remove-link {
    float: right;
    cursor: pointer;
  }

  .filesize {
    display: inline-block;
    margin-left: 40px;
  }

  .info-red {
    color: red;
    padding-left: 10px;
  }

  .task-name {
    display: block;
    cursor: pointer;
    text-align: left;
    float: left;
  }

  .decision {
    font-family: 'SFProText';
    background: white;
    position: relative;
    padding: 0;
    display: block;
    width: 100%;
    content: " ";
    clear: both;
    margin-bottom: 40px;
  }

  .task {
    display: block;
    width: 100%;
    padding: 10px;
    border: 2px solid #0f0f0f;
    border-radius: 4px;
  }

  .btn {
    display: block;
    margin-bottom: 2px;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
  }

  .btn-left {
    float: left;
  }

  .btn-right {
    float: right;
  }

  .btn-primary {
    border: 2px solid #db4813;
  }

  .btn-success {
    border: 2px solid #28bf1a;
  }

  textarea {
    resize: none;
    display: block;
    box-sizing: border-box;
    outline: none;
    -moz-appearance: none;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    display: block;
    margin: 0 auto;
    border-radius: 30px;
    text-align: left;
    padding: 30px;
    font-size: 1.3em;
  }

  /* clearfix style classes */
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .clearfix {
    display: inline-block;
  }

  * html .clearfix {
    height: 1%;
  }

  .clearfix {
    display: block;
  }

  .violet {
    color: #8a9cdc;
  }

  .svg-red-circle {
    top: 30px;
    left: 20px;
  }

  .icon-upload {
    transform: translateX(88px);
  }

  .group2 {
    margin-bottom: 10px;
  }

  @media (max-width: 680px) {
    .icon-right {
      display: none;
    }

    .upload-buttons {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      display: inline-block !important;
      width: 100% !important;
      margin: auto !important;
      margin-bottom: 10px !important;
      -webkit-transform: none;
      -moz-transform: none;
      -ms-transform: none;
      -o-transform: none;
      transform: none;
    }
  }

  @media (max-width: 730px) {
    .thumbs {
      margin-bottom: 15px !important;
    }
    .thumbs .thumb {
      width: 100% !important;
    }
  }

</style>
