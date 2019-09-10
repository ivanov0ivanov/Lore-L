<template>
  <!-- <div>
    List in Progress
    <router-link to="/project/3/task_page/42?userId=5c802dd4a5e259192aa6dad2/project/3">Назад</router-link>
    <br>
    <router-link to="/project/3/task_page/42?userId=5c802dd4a5e259192aa6dad2/project/3">Задача №42</router-link>
    <br>
    <router-link to="/profile">Bell</router-link>
  </div> -->
  <div class="container">
    <div :class="'layout-' + $store.getters.layout">
      <div class="wrapper page">
        <app-top-bar v-bind="appTopBarProps" style="z-index: 10; background: linear-gradient(to top left, #778BDF, #8950CB);">
          <span slot="title" style="color: white">
            {{$t('solutions.title')}}
          </span>

          <div class="description">
            <div class="description__head">
              <router-link :to="{ name: 'listOfSolutions' }" class="description__title description__link">
                <!-- {{$t('voting.solution')}} -->
                {{ $t('voting.task')}} №45
              </router-link>
            </div>
            <div class="description__body">
              <app-top-bar-button class="description__button" @click="$router.push({ name: 'project', params: { project_id: 3 } })">
                <template slot="icon">
                  <img src="@/assets/img/svg/loreland_icon.svg" alt="Project icon">
                </template>
                <template slot="caption">
                  {{ $t('voting.project') }}
                </template>
                Loreland
              </app-top-bar-button>
              <app-top-bar-button class="description__button" @click="$router.push({ name: 'project', params: { project_id: 3 } })">
                <template slot="icon">
                  <img src="@/assets/img/svg/idea_icon_blue.svg" alt="Category icon">
                </template>
                <template slot="caption">
                  {{$t('voting.section')}}
                </template>
                {{ $t('idea') }}
              </app-top-bar-button>
            </div>
          </div>
        </app-top-bar>

        <app-panel theme="light" style="z-index: 8; padding-right: 0;">
          <div class="progress__content">
            <table width="100%">
              <tr>
                <th><div>{{ $t('solutions.members') }}</div></th>
                <th><div>{{ $t('solutions.date') }}</div></th>
                <th><div>{{ $t('note') }}</div></th>
              </tr>
              <tr v-for="(item, i) in proposal" :key="`progress-${i}`">
                <td>
                  <div>
                    <a href="#" class="progress__content-profile" @click.prevent="current = i; popup.show = true">
                      <span v-for="(user, j) in item.members" :key="`members-${j}`">
                        {{ user.login }}{{ j+1 != item.members.length ? ', ' : null }}
                      </span>
                    </a>
                  </div>
                </td>
                <td><div>{{ item.date }}</div></td>
                <td><div v-html="item.note"></div></td>
              </tr>
            </table>
          </div>
        </app-panel>
      </div>
      <Popup
        :name="$t('solutions.members')"
        :show="popup.show"
        @close="popup.show = false"
        @ok="popup.show = false"
        :okText="$t('close')"
      >
        <template>
          <div v-for="item in proposal[current].members" :key="item.login">
            <div>
              <img :src="item.icon" alt="">
              <span>{{ item.login }}</span>
            </div>
            <a :href="`mailto:${item.email}`">{{ item.email }}</a>
          </div>
        </template>
      </Popup>
    </div>
  </div>
</template>

<script>
  import AppTopBar from '@/components/Elements/AppTopBar';
  import AppTopBarButton from '@/components/Elements/AppTopBarButton';
  import AppPanel from '@/components/Elements/AppPanel';
  import Popup from '@/components/Elements/Popup';

  export default {
    name: "ListInProgress",
    components: {AppTopBar, AppTopBarButton, AppPanel, Popup},
    data() {
      return {
        current: 0,
        proposal: [
          {
            date: '14.03',
            members: [
              {
                login: '@vova', 
                icon: '/img/profile.jpg',
                email: 'vova@mail.ru'
              },
              {
                login: '@katia', 
                icon: '/img/profile.jpg',
                email: 'katia@mail.ru'
              }
            ],
            note: '7 дней, +100&nbsp;000 токенов'
          },
          {
            date: '14.03',
            members: [
              {
                login: '@shura', 
                icon: '/img/profile.jpg',
                email: 'shura@mail.ru'
              }
            ],
            note: '5 дней'
          },
          {
            date: '14.03',
            members: [
              {
                login: '@grud', 
                icon: '/img/profile.jpg',
                email: 'grud@mail.ru'
              }
            ],
            note: '2 дня'
          }
        ],
        appTopBarProps: {
          theme: 'light',
          backRoute: {
            name: 'privatePage'
          },
          hasPosts: true
        },
        popup: {
          show: false,
          type: 'profile'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  // .container {
  //   width: 405px;
  // }
  .wrapper {
    padding: 0 0 14px;
    background-color: #fff;
  }
  .description__head {
    justify-content: center;
  }
  .progress__content {
    padding: 5px 10px 67px 0;
    font-family: 'SFProText';
    font-size: 20px;
    line-height: 1.25;
    font-weight: 400;
    color: $colorTextBlueviolet;

    table {
      text-align: center;

      td, 
      th {
        padding: 0 5px;

        &:first-child {
          padding: 0 5px 0 0;
        }

        &:last-child {
          padding: 0 0 0 5px;
        }

        > div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
      }

      th {
        height: inherit;
        font-family: "SegoeUI, Segoe UI";
        font-size: 16px;
        font-weight: 400;
        color: $colorBorder1;

        >div {
          padding: 20px 10px;
          border-left: 1px solid $colorBorder1;
          border-top: 1px solid $colorBorder1;
          border-right: 1px solid $colorBorder1;
        }

        &:last-child {
          font-size: 13px;
        }
      }

      td {
        height: inherit;
        border-top: 1px solid $colorBorder1;

        >div {
          padding: 22px 10px;
          border-left: 1px solid $colorBorder1;
          border-right: 1px solid $colorBorder1;
        }
      }

      tr {
        height: 1px;
      }

      tr:last-child td > div {
        padding: 22px 10px 77px;
        border-bottom: 1px solid $colorBorder1;
      }
    }

    &-profile {
      color: $colorTextBlueviolet;

      &:hover {
        text-decoration: none;
      }
    }
  }
  @media screen and (max-width: 425px) {
      .panel {
        padding-left: 5px;
        padding-right: 5px !important;
      }
      .progress__content {
        padding: 15px 0 67px;
        font-size: 16px;

        table td > div {
          padding: 32px 8px;
        }
      }
    }
</style>
