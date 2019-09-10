<template>
  <div class="container">
    <div :class="'layout-' + $store.getters.layout">
      <div class="wrapper page">
        <app-top-bar v-bind="appTopBarProps" style="z-index: 10">
          <div class="description">
            <div class="description__head">
              <div class="description__title">
                {{$t('addtasklogingrid.title')}}
              </div>
              <div class="description__category">
                <router-link :to="{ name: 'project', params: { project_id: 3 } }">
                  <span v-html="$t('idea')"></span>
                  <img src="@/assets/img/svg/idea.svg" alt="Category icon">
                </router-link>
              </div>
            </div>
          </div>
        </app-top-bar>

        <app-panel theme="blue" style="z-index: 8; align-items: center">
          <div class="task__head">
            <div class="task__head-top">
              <div class="task__logo">
                <img src="@/assets/img/svg/loreland_icon.svg" alt="Project icon">
                <span>Loreland</span>
              </div>
              <div class="task__select">
                <div class="task__select-wrapp" :class="{ 'is-open' : changeTaskType}">
                  <div class="task__select-title" :style="'--color-mark:' + taskTypes[currentType].color + ';'" @click.prevent="changeTaskType = !changeTaskType">
                    {{ $t(`${taskTypes[currentType].name}`) }}
                  </div>
                  <div class="task__select-items">
                    <template v-for="(item, i) in taskTypes" >
                      <p class="task__select-item" :key="`cdd-${i}`" @click.prevent="currentType = i; changeTaskType = !changeTaskType">{{ $t(`${taskTypes[i].name}`) }}</p>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="task__name">
              <input type="text" :placeholder="$t('addtasklogingrid.placeholder')">
            </div>
          </div>
        </app-panel>
        <app-panel theme="dark" style="z-index: 6">
          <div class="task__descr">
            <div class="task__descr-text" :data-warning="$t('addtasklogingrid.warning')">
              <div contenteditable="true" @input="editDescription" @focus="onFocus" @blur="onBlur" ref="taskdescription">
                {{$t('addtasklogingrid.description')}}
              </div>
            </div>
            <div class="task__params">
              <div v-for="(item, i) in params" class="task__params-item" :key="`taskparams${i}`">
                <div class="task__params-name">
                  {{ $t(`${item.name}`) }}
                </div>
                <div class="task__params-buttons">
                  <div class="task__params-minus" @click="params[i].data -= item.step; params[i].data < 1 ? params[i].data = 1 : null"></div>
                  <div class="task__params-data">
                    {{ item.data }} {{ typeof item.attr == 'object' ? (item.data > 1 ? $t(`${item.attr[1]}`) : $t(`${item.attr[0]}`)) : $t(`${item.attr}`) }}
                  </div>
                  <div class="task__params-plus" @click="params[i].data += item.step"></div>
                </div>
              </div>
            </div>
          </div>
        </app-panel>
        <app-panel theme="light" style="z-index: 4; padding-right: 0;">
          <div class="task__rating">
            <div class="task__rating-upload">
              <div class="task__upload-button">
                <label>
                    <input type="file" accept=".doc,.docx,.odt,.pdf,.txt"/>
                    {{ $t('addtasklogingrid.upload')}}
                </label>
              </div>
              <div class="task__upload-icon">
                <img src="@/assets/img/svg/file-upload.svg" alt="">
              </div>
            </div>
            <div class="task__rating-content">
              <div class="task__rating-items">
                <div v-for="(item, i) in ratings" class="task__rating-item" :key="`rat${i}`">
                  {{ $t(`${item.name}`) }}
                  <span class="task__rating-item--close" @click="ratings.splice(i, 1)"></span>
                </div>
              </div>
              <div class="task__rating-button">
                <button @click="popup.show = true">{{$t('addtasklogingrid.addrating')}}</button>
              </div>
            </div>
          </div>
        </app-panel>
        <div class="task__submit">
          <div class="task__submit-check">
            <a href="#" @click.prevent>
              <img src="@/assets/img/svg/check.svg" alt="">
            </a>
          </div>
          <div class="task__submit-cancel">
            <a href="#" @click.prevent><img src="@/assets/img/svg/cancel_white.svg" alt=""></a>
          </div>
        </div>
      </div>
      <Popup
          :name="$t('addtasklogingrid.addrating')"
          :show="popup.show"
          @close="popup.show = false"
          @ok="popup.show = false"
          :cancelText="$t('cancel')"
          :okText="$t('confirm')"
      >
        <template>
          <!-- примерно, без дизайна -->
          <div v-for="(item, i) in relatedTasks" :key="`popupaddtask${i}`">
            <div style="display: flex; justify-content: space-between;">
              <h3 @click="addRatings(item.name)">{{ $t(`${item.name}`) }}</h3>
              <a :href="item.url">Посмотреть</a>
            </div>
          </div>
          
        </template>
      </Popup>
    </div>
  </div>
</template>

<script>

  import AppTopBar from '@/components/Elements/AppTopBar';
  import AppPanel from '@/components/Elements/AppPanel';
  import Popup from '@/components/Elements/Popup';
  export default {
    name: "AddTaskLoginGrid",
    components: {
      AppTopBar,
      AppPanel,
      Popup
    },
    data() {
      return {
        ratings: [
          {name: 'addtasklogingrid.rating1'},
          {name: 'addtasklogingrid.rating2'},
        ],
        params: [
          {name: 'addtasklogingrid.params1', data: 300, attr: 'addtasklogingrid.thousand', step: 1 },
          {name: 'addtasklogingrid.params2', data: 5, attr: ['addtasklogingrid.day', 'addtasklogingrid.days'] , step: 1 }
        ],
        description: null,
        changeTaskType: false,
        taskTypes: [
          {name: 'featured.design', color: '#D0021B'},
          {name: 'featured.dev', color: 'green'},
          {name: 'featured.translations', color: 'blue'}
        ],
        currentType: 0,
        appTopBarProps: {
          theme: 'light',
          backRoute: {
            name: 'privatePage'
          },
          hasPosts: true
        },
          popup: {
          show: false
        },
        relatedTasks: [
          {name: 'addtasklogingrid.rating3', url: '#'},
          {name: 'addtasklogingrid.rating4', url: '#'},
          {name: 'addtasklogingrid.rating5', url: '#'},
        ]
      }
    },
    methods: {
      editDescription(e) {
        let str = e.target.innerText;
        if (str.length > 1400) {
          str = str.slice(0, 1400);
          this.$refs.taskdescription.innerHTML = str;
          // тут можно вывести сообщение про лимит описания
        }
        this.description = str;
        // window.console.log(e.target.innerText);
      },
      onFocus(e){
        if (e.target.innerText == this.$t('addtasklogingrid.description')) {
          this.$refs.taskdescription.innerHTML = '';
        }
      },
      onBlur(e) {
        if (e.target.innerText == '') {
          this.$refs.taskdescription.innerHTML = this.$t('addtasklogingrid.description');
        }
      },
      addRatings(name) {
        let inArray = false;
        this.ratings.forEach( (item) => {
          item.name == name ? inArray = true : null;
        });
        !inArray ? this.ratings.push({name}) : null;
      }
    }
  }
</script>

<style lang="scss" scoped>
  // .container {
  //   width: 405px;
  // }

  .wrapper {
    padding: 0;
    background-color: #9599B4;
  }
  .app-top-bar {
    padding: 1.22222em 0 0.95em;
    background: #fff;
  }
  .description {
    width: 100%;
    font-family: 'SFProText';

    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__title {
      padding: 0 0 0 24px;
      font-size: 17px;
      font-weight: 600;
    }
    &__category {
      font-size: 12px;
      font-weight: 400;
      color: $colorSectLink;
      img {
        margin: 0 0 0 11px;
      }
    }
  }
  .task {
    font-family: 'SFProText';

    &__head {
      width: 100%;
      padding: 23px 17px 16px;
    }
    &__head-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    &__logo {
      span {
        display: inline-block;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.7px;
        transform: translate3d(1px, -3px, 0);
      }
    }
    &__select {
      padding: 4px 6px 0 0;
    }
    &__select-wrapp {
      position: relative;

      &.is-open {
        .task__select-items {
          display: block;
        }
        .task__select-title::after {
          transform: scale(1,-1);
        }
      }
    }
    &__select-title {
      position: relative;
      padding: 5px 20px;
      font-size: 17px;
      font-weight: 400;
      letter-spacing: 0.9px;

      &::before {
        content: "";
        position: absolute;
        display: block;
        left: 0;
        top: 17px;
        transform: translateY(-50%);
        width: 11px;
        height: 11px;
        border-radius: 50px;
        background-color: var(--color-mark);
        box-shadow: 0px 0px 3px 0 var(--color-mark);
      }

      &::after {
          content: "";
          position: absolute;
          top: 0;
          right: -2px;
          width: 20px;
          height: 100%;
          background: url('../../assets/img/svg/open-arrow.svg') center center no-repeat;
          cursor: pointer;
          transition: transform 0.3s;
      }

    }
    &__select-items {
      position: absolute;
      top: 38px;
      right: 0;
      display: none;
      // min-width: 100%;
      padding: 0;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0px 0px 4px 1px#ddd;
      overflow: hidden;
    }
    &__select-item {
      padding: 7px 20px;
      font-size: 15px;
      font-weight: 300;
      line-height: 1.3;
      color: #000;
      margin: 0;

      &:hover {
        background-color: #eee;
      }
    }

    &__name {
      padding: 17px 5px 0;
      input {
        width: 100%;
        padding: 13px 20px 13px 25px;
        display: inline-block;
        border-radius: 20px;
        border: none;
        outline: none;
        margin: 0 auto;

        &::placeholder {
          font-size: 17px;
          font-weight: 400;
          color: $colorTextDark;
        }
      }
    }
    &__descr {
      width: 100%;
      padding: 25px 22px 3px 23px;
    }
    &__descr-text {
      position: relative;
      border-radius: 20px;
      overflow-x: hidden;

      >div{
        max-width: 100%;
        min-height: 85px;
        max-height: 500px;
        padding: 13px 10px;
        letter-spacing: 0.2px;
        background-color: #fff;
        color: $colorTextDark;
        text-indent: 14px;
        overflow-y: auto;
      }

      &::after {
        content: attr(data-warning);
        position: absolute;
        bottom: 7px;
        right: 17px;
        display: inline-block;
        font-size: 8px;
        font-weight: 400;
        letter-spacing: 0.3px;
        color: $colorTextDark;
      }
    }

    &__params {
      padding: 14px 0 0;
    }

    &__params-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 9px 0;
    }

    &__params-name {
      font-size: 14px;
      font-weight: 400;
    }

    &__params-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 157px;
    }

    &__params-minus,
    &__params-plus {
      position: relative;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #fff;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        top: calc(50% - 1px);
        left: 7px;
        width: 24px;
        height: 2px;
        background-color: #000;
      }
    }

    &__params-data {
      font-size: 17px;
      font-weight: 400;
    }

    &__params-plus {
      &::after {
        content: '';
        position: absolute;
        top: 7px;
        left: calc(50% - 1px);
        width: 2px;
        height: 24px;
        background-color: #000;
      }
    }

    &__rating {
      padding: 27px 0 13px;
    }
    &__rating-upload {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0 43px 0 21px;
    }
    &__upload-button {

      label {
        width: 250px;
        padding: 14px 25px;
        font-size: 17px;
        font-weight: 400;
        background-color: #060606;
        border-radius: 20px;
        color: $colorBorder1;
        cursor: pointer;
      }
      input[type=file] {
        display: none;
      }
    }
    &__upload-icon {
      padding: 12px 0 0;
    }
    &__rating-content {
      padding: 0 0 0 22px;
    }
    &__rating-items {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: 17px 0 14px;
    }
    &__rating-item {
      display: inline-block;
      vertical-align: middle;
      padding: 0 0 0 10px;
      font-size: 14px;
      line-height: 26px;
      font-weight: 400;
      letter-spacing: 0.5px;
      color: #fff;
      border-radius: 20px;
      background: linear-gradient(to top left, #8A4DCA, #7594E3);
      margin: 0 11px 20px 0;
    }
    &__rating-item--close {
      float: right;
      display: block;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi4wMjEiIGhlaWdodD0iMTIuMDIxIiB2aWV3Qm94PSIwIDAgMTIuMDIxIDEyLjAyMSI+ICA8ZyBpZD0iR3JvdXBfNyIgZGF0YS1uYW1lPSJHcm91cCA3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjM2NCAtNS42NTcpIHJvdGF0ZSg0NSkiPiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiB3aWR0aD0iMTYiIGhlaWdodD0iMSIgcng9IjAuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA4KSIgZmlsbD0iIzIxMTgzMiIvPiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIiB3aWR0aD0iMTYiIGhlaWdodD0iMSIgcng9IjAuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC41IDAuNSkgcm90YXRlKDkwKSIgZmlsbD0iIzIxMTgzMiIvPiAgPC9nPjwvc3ZnPg==) center center no-repeat;
      background-size: 60%;
      border: 1px solid $colorBorder1;
      margin: 0 0 0 8px;
      cursor: pointer;
    }
    &__rating-button {
      button {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.5px;
        color: $colorTextDark;
        border-radius: 20px;
        border: 1px solid $colorInvestorPageBG-3;
        outline: none;
        padding: 10px 47px 7px;
      }
    }

    &__submit {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 14px 22px 17px;
    }
    &__submit-check {
      padding: 4px 66px;
      border-right: 1px solid rgba(255,255,255, 0.5);
    }
    &__submit-cancel {
      padding: 4px 66px;
    }
  }
</style>
