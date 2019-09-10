<template>
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
                {{ $t('voting.task')}} №__
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
              <app-top-bar-button class="description__button">
                <template slot="icon">
                  <span class="blue-circle"></span>
                </template>
                <template slot="caption">
                  {{ $t('voting.category') }}
                </template>
                {{ $t('featured.dev') }}
              </app-top-bar-button>
            </div>
          </div>
        </app-top-bar>

        <app-panel theme="light" style="z-index: 8; padding-right: 0;">
          <div class="solutions__content">
            <table>
              <tr>
                <th>№</th>
                <th>{{ $t('solutions.date') }}</th>
                <th>{{ $t('solutions.member') }}</th>
                <th>
                  <img src="@/assets/img/svg/vision.svg" alt="">
                </th>
                <th>{{ $t('solutions.actions') }}</th>
              </tr>
              <tr v-for="(item, i) in taskMembers" :key="`taskMembers${i}`">
                <td>{{ i+1 }}</td>
                <td>{{ item.date }}</td>
                <td>
                  <a href="#" class="solutions__content-profile" @click.prevent="current = i; popup.type = 'profile'; popup.show = true">
                    {{ item.profile.login }}
                  </a>
                </td>
                <td>
                  <a href="#" class="solutions__content-preview" @click.prevent="current = i; popup.type = 'solution'; popup.show = true">
                    <img :src="item.preview" alt="">
                  </a>
                </td>
                <td>
                  <router-link to="/votingPage" class="solutions__content-status" >
                    <div v-if="item.status == 'decision'">
                      <img src="@/assets/img/solutions/decision.png" alt="">
                      <span>{{ $t('solutions.vote') }}</span>
                    </div>
                    <div v-if="item.status == 'verified'">
                      <img src="@/assets/img/solutions/verified.png" alt="">
                      <span>{{ $t('solutions.check') }}</span>
                    </div>
                    <div v-if="item.status == 'progress'">
                      <template v-if="item.progress">
                        <p>({{ item.progress.percent }}%)</p>
                        <p>{{ item.progress.total | separatorNum }}</p>
                      </template>
                    </div>
                  </router-link>
                </td>
              </tr>
              
            </table>
          </div>
        </app-panel>
      </div>
      <Popup
        :name="popup.type == 'profile' ? $t('tabProfile') : $t('voting.solution')"
        :show="popup.show"
        @close="popup.show = false"
        @ok="popup.show = false"
        :okText="$t('close')"
      >
        <template>
          <div v-if="popup.type == 'profile'">
            <div>
              <img :src="taskMembers[current].profile.icon" alt="">
              <span>{{ taskMembers[current].profile.login }}</span>
            </div>
            <a :href="`mailto:${taskMembers[current].profile.email}`">{{ taskMembers[current].profile.email }}</a>
          </div>

          <div v-if="popup.type == 'solution'">
            <div>Решение</div>
            <img :src="taskMembers[current].solution" alt="">
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
    name: "ListOfDecisions",
    components: {AppTopBar, AppTopBarButton, AppPanel, Popup},
    data() {
      return {
        current: 0,
        taskMembers: [
          {
            date: '14.03.19',
            preview: '/img/pages/solutions/InvestorPage_60х107.png',
            solution: '/img/pages/solutions/InvestorPage.png',
            status: 'decision',
            link: "/votingPage",
            profile: {
              login: '@feodoro', 
              icon: '/img/profile.jpg',
              email: 'feodoro@mail.ru'
            }
          },
          {
            date: '15.03.19',
            preview: '/img/pages/solutions/InvestorPageTasks_60x107.png',
            solution: '/img/pages/solutions/InvestorPageTasks.png',
            status: 'verified',
            link: "/votingPage",
            profile: {
              login: '@mihal', 
              icon: '/img/profile.jpg',
              email: 'mihal@gmail.com'
            }
          },
          {
            date: '16.03.19',
            preview: '/img/pages/solutions/FounderPage_60x107.png',
            solution: '/img/pages/solutions/FounderPage.png',
            status: 'progress',
            link: "/votingPage",
            profile: {
              login: '@luka', 
              icon: '/img/profile.jpg',
              email: 'luka@tut.by'
            },
            progress: {
              total: 1550000,
              percent: 42
            }
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
    max-width: 100%;
    padding: 0 0 14px;
    background-color: #000;
  }
  .description__body {
    justify-content: center;
  }
  .description__head {
    justify-content: center;
  }
  .solutions__content {
    padding: 16px 0 67px;
    font-family: 'SFProText';
    font-size: 14px;
    line-height: 27px;
    font-weight: 400;
    color: $colorTextBlueviolet;

    table {
      width: 100%;
      max-width: 100%;
      text-align: center;

      th {
        font-weight: 400;
      }

      td, 
      th {
        padding: 5px;
        border-right: 1px solid $colorBorder1;

        &:last-child {
          border-right: none;
        }
      }

      td {
        border-top: 1px solid $colorBorder1;
      }
    }

    &-profile {
      font-size: 20px;
      color: $colorTextBlueviolet;

      &:hover {
        text-decoration: none;
      }
    }

    &-preview img {
      max-width: 45px;
      max-height: 56px;
    }

    &-status {
      color: $colorTextBlueviolet;

      &:hover {
        text-decoration: none;
      }

      >div {
        position: relative;

        span {
          position: absolute;
          bottom: 6px;
          left: 0;
          display: block;
          width: 100%;
          font-family: "Roboto";
          font-size: 8px;
          line-height: 1;
          color: #ffffff;
          text-align: center;
        }
      }

      p {
        font-family: "Roboto";
        font-size: 14px;
        line-height: 1.3;
        text-align: center;
        margin: 0;
      }
    }
  }
  @media screen and (max-width: 425px) {
  .panel {
    padding-left: 5px;
    padding-right: 5px !important;
  }
  .solutions__content {
    font-size: 12px;
    line-height: 20px;
    &-profile {
      font-size: 16px;
    }
  }
}
</style>
