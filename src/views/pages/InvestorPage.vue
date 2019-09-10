<template>
  <div class="container">
    <div class="investorpage">
      <div class="investorpage__wrapper">
        <app-top-bar2 v-bind="appTopBarProps" style="z-index: 10; background: none;" >
          <span slot="title" style="color: white">
            {{$t('investorpage.office')}}
          </span>
          <!-- <div class="investorpage__header">
            <h1 class="investorpage__title" v-html="$t('investorpage.office')"></h1>
            <div class="investorpage__header-link">
              <a href="/">
                <img src="@/assets/img/svg/loreland_icon_no_text.svg" alt="">
                <span>Loreland</span>
              </a>
            </div>
          </div> -->
          <div class="investorpage__balans">
            <div class="investorpage__balans-title">Balance</div>
            <div class="investorpage__balans-data">
              <div class="investorpage__balans-data--count">
                <img src="@/assets/img/svg/Money.svg" alt="">
                <span>{{ params.money | separatorNum }}т.</span>
              </div>
            </div>
            <div v-if="activePoint == 'reward'" class="investorpage__replenish-button">
              <button @click="popup.show = true; popup.type = 'replenish'">
                <span>{{ 'Пополнить' }}</span>
              </button>
            </div>
            <div class="investorpage__balans-currency">
              <button class="investorpage__currency">
                <span>{{ currentCurrency }}</span>
                <span v-html="$t('investorpage.currency')"></span>
              </button>
            </div>
          </div>
        </app-top-bar2>
        <div class="investorpage__content">
          <div v-if="activePoint == 'tasks'" class="investorpage__module">
            <div class="investorpage__title">{{$t('investorpage.awardsSet')}}: {{allTasks}}</div>
            <template v-for="(item, i) in params.projects">
              <div v-if="i < limitTasks" class="investorpage__tasks" 
                :class="{'w-button' : i == limitTasks - 1 && limitTasks < params.projects.length}" 
                :style="[{ backgroundImage: 'url(' + item.icon + ')'},  i == 0 ? {paddingLeft: '0'} : null ]" 
                :key="i"
              >
                <template v-for="(task, j) in item.tasks" >
                  <div class="investorpage__item" :key="`ipagetask${j}`">
                    <router-link :to="task.link">
                      <span>{{ $t('voting.task')}}№ {{task.id}}</span>
                    </router-link>
                  </div>
                </template>
                <div v-if="i == limitTasks - 1 && limitTasks < params.projects.length" class="investorpage__plus-button" :key="`ipagecont${i}`">
                  <button @click="limitTasks += 2; limitTasks > params.projects.length ? limitTasks-- : null" >Далее...</button>
                </div>
              </div>
              <div v-if="i < limitTasks - 1"  class="investorpage__score-separator" :key="`ipagecont${i}`"></div>

            </template>
          </div>

          <div v-else-if="activePoint == 'performed'" class="investorpage__module">
            <div class="investorpage__title">{{$t('investorpage.performedTasks')}}: {{allPerformed}}</div>
            <template v-for="(item, i) in params.projects">
              <div v-if="i < limitTasks" class="investorpage__tasks" 
                :class="{'w-button' : i == limitTasks - 1 && limitTasks < params.projects.length}" 
                :style="[{ backgroundImage: 'url(' + item.icon + ')'},  i == 0 ? {paddingLeft: '0'} : null ]"
                :key="i"
              >
                <template v-for="(task, j) in item.tasks" >
                  <div v-if="task.performed" class="investorpage__item" :key="`ipagetask${j}`">
                    <router-link :to="task.link">
                      <span>{{ $t('voting.task')}}№ {{task.id}}</span>
                    </router-link>
                  </div>
                </template>
                <div v-if="i == limitTasks - 1 && limitTasks < params.projects.length" class="investorpage__plus-button" :key="`ipagecont${i}`">
                  <button @click="limitTasks += 2; limitTasks > params.projects.length ? limitTasks-- : null" >Далее...</button>
                </div>
              </div>
              <div v-if="i < limitTasks - 1"  class="investorpage__score-separator" :key="`ipagecont${i}`"></div>

            </template>
          </div>

          <div v-else-if="activePoint == 'history'" class="investorpage__module">
            <div class="investorpage__title">{{$t('investorpage.historyTasks')}}: {{allHistoryTasks}}</div>
            <div class="investorpage__subtitle">{{$t('investorpage.awardsClaimed')}}: {{allHistoryTasksClaimed}}</div>
            <template v-for="(item, i) in params.awards">
              <div v-if="i < limitTasks" class="investorpage__tasks is-right" 
                :class="{'w-button' : i == limitTasks - 1 && limitTasks < params.projects.length}" 
                :style="{ backgroundImage: 'url(' + item.icon + ')'}"
                :key="i"
              >
                <div class="investorpage__item">
                  <p>{{$t('investorpage.ofTasks')}}: {{item.claimedTasks}}</p>
                  <p>{{$t('investorpage.amount')}}: <img src="@/assets/img/svg/Money.svg" alt=""> {{item.summ}}{{$t('addtasklogingrid.thousand')}}</p>
                </div>
                <div v-if="i == limitTasks - 1 && limitTasks < params.awards.length" class="investorpage__plus-button" :key="`ipagecont${i}`">
                  <button @click="limitTasks += 2; limitTasks > params.awards.length ? limitTasks-- : null " >Далее...</button>
                </div>
              </div>
              <div v-if="i < limitTasks - 1"  class="investorpage__score-separator" :key="`ipagecont${i}`"></div>

            </template>
          </div>

          <div v-else-if="activePoint == 'reward'" class="investorpage__module" style="background: #E86FEC">
            <div class="investorpage__reward-head">
              <div class="investorpage__reward-project">
                <img src="@/assets/img/svg/loreland_icon_no_text.svg" alt="">
                <span>Loreland</span>
              </div>
              <div class="investorpage__reward-task">Задание 42</div>
            </div>
            <div class="investorpage__reward-description">
              Описание задания: разработать дизайн личного кабинета в стиле "game"
            </div>
            <div class="investorpage__score-separator"></div>
            <div class="investorpage__reward-cost">
              <img src="@/assets/img/svg/Money.svg" alt="">
              <span>350 000</span>
            </div>
            <div class="investorpage__reward-description text-center">
              Рекомендуемая Награда инвестора:
            </div>
            <div class="investorpage__reward-change">
              <span>Изменить: </span>
              <button>$ 2800</button>
            </div>
          </div>

          <div v-else class="investorpage__score">
            
            <div class="investorpage__buy">
              <div class="investorpage__buy-title" v-html="$t('investorpage.purchase')"></div>
              <div class="investorpage__buy-count">
                <img src="@/assets/img/svg/Money.svg" alt="">
                <span>{{ params.forBuy[currentCurrency].money | separatorNum }}т.</span>
                <span>
                  {{$t('investorpage.byprice')}}
                  <template v-if="currentCurrency == '$'">{{currentCurrency}}{{params.forBuy[currentCurrency].price}}</template>
                  <template v-else>{{params.forBuy[currentCurrency].price}}{{currentCurrency}}</template> 
                </span>
              </div>
              <div class="investorpage__buy-button">
                <button v-html="$t('investorpage.buy')"></button>
              </div>
            </div>

            <div class="investorpage__score-separator"></div>

            <div class="investorpage__sell">
              <div class="investorpage__sell-title">
                {{$t('investorpage.forsale')}}:
              </div>
              <div class="investorpage__sell-count">
                <img src="@/assets/img/svg/Money.svg" alt="">
                <span>{{ params.forSell[currentCurrency].money | separatorNum }}т.</span>
                <span> 
                  {{$t('investorpage.byprice')}}
                  <template v-if="currentCurrency == '$'">{{currentCurrency}}{{params.forBuy[currentCurrency].price}}</template>
                  <template v-else>{{params.forBuy[currentCurrency].price}}{{currentCurrency}}</template> 
                </span>
              </div>
              <div class="investorpage__sell-button">
                <button v-html="$t('investorpage.toexpose')"></button>
              </div>
            </div>


          </div>
        </div>

        <div class="investorpage__footer">
          <div class="investorpage__footer-tasks" :class="{'active' : activePoint == 'tasks'}">
            <button @click="activePoint = 'tasks'; limitTasks = 2">
              <img src="@/assets/img/svg/tasks.svg" alt="">
              <span>{{$t('investorpage.tasks')}}({{allTasks}})</span>
            </button>
          </div>
          <div class="investorpage__footer-performed" :class="{'active' : activePoint == 'performed'}">
            <button @click="activePoint = 'performed'; limitTasks = 2">
              <img src="@/assets/img/svg/inProgr.svg" alt="">
              <span>{{$t('investorpage.performed')}}({{allPerformed}})</span>
            </button>
          </div>
          <div class="investorpage__footer-history" :class="{'active' : activePoint == 'history'}">
            <button @click="activePoint = 'history'; limitTasks = 2">
              <img src="@/assets/img/svg/comments.svg" alt="">
              <span v-html="$t('investorpage.story')"></span>
            </button>
          </div>
          <div class="investorpage__footer-reward" :class="{'active' : activePoint == 'reward'}">
            <button @click="activePoint = 'reward'; popup.show = true; popup.type = 'setReward'">
              <img src="@/assets/img/svg/sendHeartWhite.svg" alt="">
              <span v-html="$t('investorpage.reward')"></span>
            </button>
          </div>
        </div>
      </div>
      <Popup
        :name="popup.type == 'replenish' ? $t('investorpage.replenish') : $t('investorpage.setReward')"
        :show="popup.show"
        @close="popup.show = false"
        @ok="popup.show = false"
        :okText="$t('close')"
      >
        <template>
          <div v-if="popup.type == 'profile'">
            {{ $t('investorpage.replenish') }}
          </div>

          <div v-if="popup.type == 'setReward'">
            {{ $t('investorpage.setReward') }}
            
          </div>
        </template>
      </Popup>  
    </div>
  </div>
</template>

<script>
  import AppTopBar2 from '@/components/Elements/AppTopBar2';
  import Popup from '@/components/Elements/Popup';
  export default {
    name: "InvestorPage",
    components: { AppTopBar2, Popup },
    data() {
      return {
        limitTasks: 2,
        currentCurrency: '$',
        activePoint: null,
        allTasks: 0,
        allPerformed: 0,
        allHistoryTasks: 0,
        allHistoryTasksClaimed: 0,
        params: {
          money: 500000,
          currency: ['$', '₽', '¥'],
          forBuy: {
            '$': { money: 50000, price: 0.1},
            '₽': { money: 50000, price: 0.1},
            '¥': { money: 50000, price: 0.1}
          },
          forSell: {
            '$': { money: 500000, price: 0.1},
            '₽': { money: 500000, price: 0.1},
            '¥': { money: 500000, price: 0.1}
          },
          projects: [
            {
              name: 'loreland',
              icon: './img/pages/investor/loreland.svg',
              tasks: [
                {id: '40', link: '#', performed: true},
                {id: '10', link: '#', performed: true},
                {id: '12', link: '#', performed: false},
              ]
            },
            {
              name: 'loreland2',
              icon: './img/pages/investor/loreland2.svg',
              tasks: [
                {id: '2', link: '#', performed: false},
                {id: '11', link: '#', performed: true}
              ]
            },
            {
              name: 'loreland',
              icon: './img/pages/investor/loreland.svg',
              tasks: [
                {id: '20', link: '#', performed: true},
                {id: '13', link: '#', performed: true},
                {id: '15', link: '#', performed: false},
              ]
            },
            {
              name: 'loreland2',
              icon: './img/pages/investor/loreland2.svg',
              tasks: [
                {id: '22', link: '#', performed: false},
                {id: '44', link: '#', performed: true}
              ]
            }
          ],
          awards: [
            {
              name: 'Loreland',
              icon: './img/pages/investor/loreland.svg',
              tasks: 10,
              claimedTasks: 3,
              summ: 300
            },
            {
              name: 'Loreland2',
              icon: './img/pages/investor/loreland2.svg',
              tasks: 10,
              claimedTasks: 2,
              summ: 100
            },
            {
              name: 'Loreland3',
              icon: './img/pages/investor/loreland.svg',
              tasks: 5,
              claimedTasks: 1,
              summ: 120
            }
          ]
        },
        appTopBarProps: {
          theme: 'dark',
          backRoute: {
            name: 'privatePage'
          },
          hasPosts: true
        },
        popup: {
          show: false
        }
      }
    },
    mounted() {
      this.setAllTasks();
    },
    methods: {
      setAllTasks() {
        this.allTasks = 0;
        this.allPerformed = 0;
        this.allHistoryTasks = 0;
        this.allHistoryTasksClaimed = 0;
        this.params.projects.forEach(element => {
          this.allTasks += element.tasks.length
          element.tasks.forEach(elem => {
            elem.performed ? this.allPerformed++ : null
          });
        });
        this.params.awards.forEach(element => {
          this.allHistoryTasks += element.tasks;
          this.allHistoryTasksClaimed += element.claimedTasks;
        });
      }
    }
  }
</script>

<style lang="scss">
  .container {
    max-width: 405px;
  }
  .investorpage {
    font-family: 'SFProText';
    background: url('./../../assets/img/investments_bg.svg') 5% 196px repeat-x,
                url('./../../assets/img/investments_bg.svg') 25% 81% repeat-x,
                linear-gradient(to top left, $colorInvestorPageBG-2, $colorInvestorPageBG-1);
    overflow: hidden;

    div {
      box-sizing: border-box;
    }

    &__wrapper {
      position: relative;
      max-width: 750px;
      padding: 0 0 77px;
      min-height: 100vh;
      margin: 0 auto;
    }

    &__content {
      max-width: 500px;
      padding: 0 43px 30px;
      margin: 0 auto;

      @media (max-width: 374px) {
        padding: 0 20px 30px;
      }
    }

    &__header {
      padding: 2px 24px 0 3px;
    }

    &__title,
    &__header-link {
      display: inline-block;
      vertical-align: top;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }

    &__title {
      font-weight: 600;
      color: #090909;
    }

    &__subtitle {
      font-size: 18px;
      font-weight: 400;
    }

    &__header-link {
      float: right;
      font-size: 14px;
      transform: translate3d(0, -2px, 0);

      span {
        display: inline-block;
        color: #ffffff;
        transform: translate3d(0, 3px, 0);
      }

      img {
        margin: 0 5px 0 0;
        transform: translate3d(0, 2px, 0);
      }
    }

    &__balans {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;
      padding: 26px 0 0;
      font-weight: 700;
      color: $colorTextDark;
      margin: 0 0 22px;

      > div {
        width: 50%;

        &:nth-child(2n) {
          text-align: right;;
        }
      }
    }

    &__balans-title {
      padding: 0 0 0 19px;
      font-size: 16px;
      line-height: 24px;
      color: $colorTextDark2;
    }

    &__balans-data {
      text-align: right;
    }

    &__balans-data--count {
      padding: 0 16px 18px 0;
      font-size: 17px;

      img {
        margin: 0 7px 0 0;
        transform: translate3d(0, 2px, 0);
      }
    }

    &__currency {
      padding: 1px 9px 5px;
      line-height: 1;
      font-weight: 700;
      border-radius: 14px;
      border: 1px solid $colorBorder1;
      background: none;
      margin: 0 23px 0 0;

      span {
        display: block;
        text-align: center;
        font-size: 16px;
        margin: 0;

        &:last-child {
          font-size: 9px;
          line-height: 1;
          text-transform: lowercase;
        }
      }
    }

    &__replenish {

    }

    &__score,
    &__module {
      padding: 20px 10px 16px;
      background-color: #fff;
      border-top-right-radius: 100px;
      border-bottom-left-radius: 100px;
      margin: 0 0 13px;
    }

    &__score-separator {
      height: 1px;
      background-color: $colorInvestorPageSeparator;
      margin: 0 10px;
    }

    &__module {
      padding: 12px 10px 16px;
    }

    &__tasks {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 132px;
      padding: 0 0 0 10px;
      background: 92% center no-repeat;
      background-size: 75px auto;

      &.w-button {
        position: relative;
        margin-bottom: 19px;
      }

      &.is-right {
        padding: 0 0 0 105px;
        background-position-x: 10%;
        text-align: left;
      }
    }

    &__item {
      margin: 6px 0;

      a {
        font-size: 20px;
        font-weight: 500;
        color: #0A0A0A;
        text-decoration: none;

        &:hover {
          text-decoration: none;
        }
      }
    }

    &__buy {
      color: $colorTextDark2;
    }

    &__buy-title,
    &__sell-title {
      padding: 8px 0 28px;
      font-size: 16px;
      font-weight: 700;
      line-height: 19px;
    }

    &__buy-count,
    &__sell-count {
      padding: 0 30px 21px 16px;
      font-weight: 700;

      img {
        margin: 2px 7px -2px 0;
      }

      span:last-child {
        float: right;
      }
    }

    &__buy-button,
    &__sell-button,
    &__replenish-button,
    &__plus-button {
      padding: 0 8px 16px 0;
      text-align: right;

      button {
        width: 127px;
        padding: 8px 16px;
        font-size: 16px;
        border-radius: 16px;
        border: 1px solid $colorBorder1;
        background-color: $colorBtnBG1;
      }
    }

    &__plus-button {
      position: absolute;
      bottom: -23px;
      left: 0;
      width: 100%;
      padding: 0 0 0 34%;
      text-align: left;

      button {
        width: auto;
        padding: 5px 29px 4px 38px;
        font-size: 18px;
        line-height: 1;
        border-radius: 14px;
        background-color: #9E9B9B;
        color: #0a0a0a;
      }
    }

    &__replenish-button {
      padding: 0 0 0 18px;
      text-align-last: left;

      button {
        background-color: #4DD44D;
      }
    }

    &__reward-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 9px 43px 8px 0;
      color: #ffffff;
    }
    &__reward-project {
      font-size: 13px;
      font-weight: 500;

      img {
        width: 13px;
        margin: 0 16px 0 0;
      }
    }
    &__reward-task {
      font-family: "SegoeUI, Segoe UI";
      font-size: 14px;
      font-weight: 400;
    }

    &__reward-description {
      padding: 7px 10px 5px 17px;
      font-size: 20px;
      line-height: 1.2;
      font-weight: 700;
      color: $colorTextDark2;
      border: 1px solid $colorBorder1;
      background-color: #fff;
      margin: 0 19px 8px 13px;

      &.text-center {
        padding: 7px 10px 13px;
      }
    }

    &__reward-cost {
      padding: 0 35px 10px 0;
      font-size: 20px;
      font-weight: 700;
      color: $colorTextDark2;
      text-align: right;

      span {
        display: inline-block;
        margin: 0 0 0 13px;
        transform: translate3d(0, 3px, 0);
      }

    }

    &__reward-change {
      padding: 7px 19px 0 0;
      text-align: right;

      button {
        padding: 6px 19px 8px;
        font-size: 20px;
        font-weight: 700;
        line-height: 1;
        border-radius: 18px;
        border: 1px solid $colorBorder1;
        background-color: #F3763E;
        color: #0a0a0a;
      }
    }

    &__sell-title {
      padding: 16px 0 20px 26px;
    }

    &__sell-count {
      padding-bottom: 24px;
    }

    &__sell-button {
      button {
        background-color: $colorBtnBG2;
      }
    }

    &__footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 77px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 4px 0 25px;
      background-color: $colorInvestorPageBG-3;
      border-top-left-radius: 77px;

      > div {
        display: inline-block;
        vertical-align: top;

        &.active button {
          border: 2px solid $colorBorder2;
          background-image: radial-gradient($colorBtnBG3, $colorBtnBG4);
        }
      }

      button {
        min-width: 80px;
        padding: 11px 2px;;
        border: none;
        outline: none;
        background: none;
        color: #fff;
        text-align: center;
        border-radius: 22px;
        transition: background-image 0.3s, border 0.3s;

        span {
          display: block;
          font-size: 10px;
          font-weight: 500;
        }

        @media (max-width: 374px) {
          min-width: 70px;
        }
      }

      @media (min-width: 768px) {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: calc(384px - 50vw);
          width: calc(50vw - 384px);
          height: 100%;
          background-color: $colorInvestorPageBG-3;
        }
      }
    }
  }
</style>