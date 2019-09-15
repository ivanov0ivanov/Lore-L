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
            <div class="investorpage__balans-title" @click="activePoint = null">
              <button>
                <span>{{$t('investorpage.balance')}}</span>
              </button>
            </div>
            <div class="investorpage__balans-data">
              <div class="investorpage__balans-data--count">
                <img src="@/assets/img/svg/Money.svg" alt="">
                <span>{{ params.money | separatorNum }}т.</span>
              </div>
            </div>

            <div class="investorpage__balans-currency button__wrap">
              <button class="investorpage__currency" @click="currencyButtonOpen = !currencyButtonOpen">
                <span>{{ currentCurrency }}</span>
                <span v-html="$t('investorpage.currency')"></span>
              </button>
              <div class="button__dropdown" :class="{ 'is-open' : currencyButtonOpen == true }">
                <span v-for="(item, i) in params.currency" :key="`currency${i}`" @click="currentCurrency = item; currencyButtonOpen = false" v-html="item"></span>
              </div>
            </div>
            <div v-if="activePoint == 'reward'" class="investorpage__replenish-button">
              <button @click="popup.show = true; popup.type = 'replenish'; popup.title=`${$t('investorpage.replenish')}`">
                <span>{{ $t('investorpage.replenish') }}</span>
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
                   :style="i == 0 ? {paddingLeft: '0'} : null"
                   :key="i"
              >
                <div class="investorpage__tasks-items" >
                  <template v-for="(task, j) in item.tasks">
                    <div class="investorpage__item" :key="`ipagetask${j}`">
                      <router-link :to="task.link">
                        <span>{{ $t('voting.task')}}№ {{task.id}}</span>
                      </router-link>
                    </div>
                  </template>
                </div>
                <div class="investorpage__tasks-button"
                     :style="{backgroundImage: 'url(' + item.icon + ')'}"
                     @click="popup.show = true; popup.type = 'project'; popup.title=`${$t('investorpage.about')}`; popup.currentProject=`${i}`"
                ></div>
                <div v-if="i == limitTasks - 1 && limitTasks < params.projects.length" class="investorpage__plus-button" :key="`ipagecont${i}`">
                  <button @click="limitTasks += 2; limitTasks > params.projects.length ? limitTasks-- : null" >{{ $t('investorpage.further') }}</button>
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
                   :style="i == 0 ? {paddingLeft: '0'} : null"
                   :key="i"
              >
                <div class="investorpage__tasks-items" >
                  <template v-for="(task, j) in item.tasks" >
                    <div v-if="task.performed" class="investorpage__item" :key="`ipagetask${j}`">
                      <router-link :to="task.link">
                        <span>{{ $t('voting.task')}}№ {{task.id}}</span>
                      </router-link>
                    </div>
                  </template>
                </div>
                <div class="investorpage__tasks-button"
                     :style="{backgroundImage: 'url(' + item.icon + ')'}"
                     @click="popup.show = true; popup.type = 'project'; popup.title=`${$t('investorpage.about')}`; popup.currentProject=`${i}`"
                ></div>

                <div v-if="i == limitTasks - 1 && limitTasks < params.projects.length" class="investorpage__plus-button" :key="`ipagecont${i}`">
                  <button @click="limitTasks += 2; limitTasks > params.projects.length ? limitTasks-- : null" >{{ $t('investorpage.further') }}</button>
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
                   :key="i"
              >
                <div class="investorpage__tasks-button"
                     :style="{backgroundImage: 'url(' + item.icon + ')'}"
                     @click="popup.show = true; popup.type = 'project'; popup.title=`${$t('investorpage.about')}`; popup.currentProject=`${i}`"
                ></div>
                <div class="investorpage__tasks-items" >
                  <div class="investorpage__item">
                    <p>{{$t('investorpage.ofTasks')}}: {{item.claimedTasks}}</p>
                    <p>{{$t('investorpage.amount')}}: <img src="@/assets/img/svg/Money.svg" alt=""> {{item.summ}}{{$t('addtasklogingrid.thousand')}}</p>
                  </div>
                </div>

                <div v-if="i == limitTasks - 1 && limitTasks < params.awards.length" class="investorpage__plus-button" :key="`ipagecont${i}`">
                  <button @click="limitTasks += 2; limitTasks > params.awards.length ? limitTasks-- : null " >{{ $t('investorpage.further') }}</button>
                </div>
              </div>
              <div v-if="i < limitTasks - 1"  class="investorpage__score-separator" :key="`ipagecont${i}`"></div>
            </template>
          </div>

          <div v-else-if="activePoint == 'reward'" class="investorpage__module" style="background: #E86FEC">
            <template v-if="!isTaskChange">
              <div class="investorpage__reward-head" style="padding: 0 0 60px;">
                <div class="investorpage__reward-head--title">{{ $t('investorpage.setRewardTitle') }}</div>
                <DropdownButton class="custom" :config="config1" @setSelectedOption="setRewardSections($event.value, $event.id)" ></DropdownButton>
                <template v-if="rewardProject != null">
                  <br>
                  <div class="investorpage__reward-head--title">{{ $t('voting.section') }}</div>
                  <DropdownButton class="custom" :config="config2" @setSelectedOption="setRewardTasks($event.value, $event.id)" ></DropdownButton>
                  <template v-if="rewardSection != null">
                    <br>
                    <div class="investorpage__reward-head--title">{{ $t('featured.task') }}</div>
                    <DropdownButton class="custom" :config="config3" @setSelectedOption="rewardTask = $event.value; currentRewardTask = $event.id" ></DropdownButton>
                    <div v-if="rewardTask != null" class="investorpage__reward-button">
                      <button @click="isTaskChange = true">{{ $t('confirm') }}</button>
                    </div>
                  </template>
                </template>
              </div>
            </template>

            <template v-if="isTaskChange">
              <div class="investorpage__reward-head">
                <div class="investorpage__reward-project">
                  <img src="@/assets/img/svg/loreland_icon_no_text.svg" alt="">
                  <span>{{ rewardProject }}</span>
                </div>
                <div class="investorpage__reward-task">{{ $t('investorpage.task') }} {{ params.projectsForReward[currentRewardProject].sections[currentRewardSection].tasks[currentRewardTask].id }}</div>
              </div>
              <div class="investorpage__reward-description">
                {{ $t('investorpage.taskDescriptionHead') }}:
                <br>
                {{ params.projectsForReward[currentRewardProject].sections[currentRewardSection].tasks[currentRewardTask].description }}
              </div>
              <div class="investorpage__score-separator"></div>
              <div class="investorpage__reward-cost">
                <img src="@/assets/img/svg/Money.svg" alt="">
                <span>{{ params.projectsForReward[currentRewardProject].rewardAllProject | separatorNum }}</span>
              </div>
              <div class="investorpage__reward-description text-center">
                {{ $t('investorpage.rir') }}:
              </div>
              <div class="investorpage__reward-change">
                <span>{{ $t('investorpage.edit') }}: </span>
                <div class="button__wrap">
                  <button @click="rewardButtonOpen = !rewardButtonOpen">
                    {{currentCurrency == '$' ? currentCurrency + ' ' + params.projectsForReward[currentRewardProject].sections[currentRewardSection].tasks[currentRewardTask].rewardCost
                    : params.projectsForReward[currentRewardProject].sections[currentRewardSection].tasks[currentRewardTask].rewardCost + ' ' + currentCurrency}}
                  </button>
                  <div class="button__dropdown" :class="{ 'is-open' : rewardButtonOpen == true }">
                    <input type="text" v-model.trim="params.projectsForReward[currentRewardProject].sections[currentRewardSection].tasks[currentRewardTask].rewardCost" @keyup="setReward($event)" >
                    <div class="button__dropdown-ok" @click="rewardButtonOpen = false"></div>
                  </div>
                </div>
              </div>
            </template>
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

        <div v-if="activePoint == 'reward' && isTaskChange" class="investorpage__confirm">
          <div class="investorpage__confirm-ok" @click="popup.show = true; popup.type = 'setReward'; popup.title=`${$t('investorpage.setReward')}`"></div>
          <div class="investorpage__confirm-cancel" @click="setNull"></div>
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
            <button @click="activePoint = 'reward'">
              <img src="@/assets/img/svg/sendHeartWhite.svg" alt="">
              <span v-html="$t('investorpage.setReward')"></span>
            </button>
          </div>
        </div>
      </div>
      <Popup
              :name="popup.title"
              :show="popup.show"
              @close="popup.show = false"
              @ok="popup.show = false; popup.type == 'setReward' ? setNull('The reward has been set!') : null"
              :okText="popup.type=='project' ? 'ok' : $t('confirm')"
              :cancelText="popup.type=='project' ? null : $t('cancel')"
      >
        <template>
          <div v-if="popup.type=='project'">
            <h4>{{$t('investorpage.popupProjectName')}} {{ params.projects[popup.currentProject].name }}</h4>
            <div>
              <h6>{{$t('investorpage.popupProjectTasks')}} </h6>
              <div v-for="(item, i) in params.projects[popup.currentProject].tasks" :key="`popup-proj-${i}`">
                {{$t('terms.task')}}:  {{item.id}}
              </div>
            </div>
            <hr>
            <div>
              {{$t('investorpage.popupProjectLink')}}
              <router-link :to="params.projects[popup.currentProject].link">
                {{ params.projects[popup.currentProject].name }}
              </router-link>
            </div>

          </div>
          <div v-if="popup.type == 'replenish'">
            Тут пополнить баланс
          </div>

          <div v-if="popup.type == 'setReward'" class="popup__wrap">
            <div class="popup__warning text-center mb-2" style="color: red;">
              {{$t('investorpage.popupAttention')}}
            </div>
            <div class="popup__content">
              {{$t('terms.project')}}: {{ params.projectsForReward[currentRewardProject].name }} <br>
              {{$t('terms.section')}}:  {{ params.projectsForReward[currentRewardProject].sections[currentRewardSection].name }} <br>
              {{$t('terms.task')}}: {{ params.projectsForReward[currentRewardProject].sections[currentRewardSection].tasks[currentRewardTask].id }} <br>
              {{$t('terms.reward')}}: {{ params.projectsForReward[currentRewardProject].rewardAllProject | separatorNum }} <br>
              {{$t('terms.setReward')}}: {{ params.projectsForReward[currentRewardProject].sections[currentRewardSection].tasks[currentRewardTask].rewardCost | separatorNum  }}{{ currentCurrency }}<br>
            </div>

          </div>
        </template>
      </Popup>
    </div>
  </div>
</template>

<script>
  import AppTopBar2 from '@/components/Elements/AppTopBar2';
  import Popup from '@/components/Elements/Popup';
  import DropdownButton from '@/components/Elements/DropdownButton';
  export default {
    name: "InvestorPage",
    components: { AppTopBar2, Popup, DropdownButton },
    data() {
      return {
        config1: {
          options: [],
          placeholder: this.$t('investorpage.chooseProject'),
          backgroundColor: "#79e2a3",
          textColor: "black",
          borderRadius: "7px",
          border: "1px solid darkgray",
          width: 280,
          optionHeight: 25,
          setTitle: true
        },
        config2: {
          options: [],
          placeholder: this.$t('investorpage.chooseSection'),
          backgroundColor: "#79e2a3",
          textColor: "black",
          borderRadius: "7px",
          border: "1px solid darkgray",
          width: 280,
          optionHeight: 25,
          setTitle: true
        },
        config3: {
          options: [],
          placeholder: this.$t('investorpage.chooseTask'),
          backgroundColor: "#79e2a3",
          textColor: "black",
          borderRadius: "7px",
          border: "1px solid darkgray",
          width: 280,
          optionHeight: 25,
          setTitle: true
        },
        isTaskChange: false,
        rewardProject: null,
        currentRewardProject: 0,
        rewardSection: null,
        currentRewardSection: 0,
        rewardTask: null,
        currentRewardTask: 0,
        rewardButtonOpen: false,
        limitTasks: 2,
        currentCurrency: '$',
        currencyButtonOpen: false,
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
          projectsForReward: [
            {
              name: 'loreland',
              icon: './img/pages/investor/loreland.svg',
              rewardAllProject: 350000,
              sections: [
                {
                  name: 'stage 1',
                  tasks: [
                    {id: '40', link: '#', description: this.$t('investorpage.taskDescription1'), rewardCost: 2800},
                    {id: '10', link: '#', description: this.$t('investorpage.taskDescription2'), rewardCost: 300},
                    {id: '12', link: '#', description: this.$t('investorpage.taskDescription3'), rewardCost: 1500},
                  ]
                },
                {
                  name: 'stage 2',
                  tasks: [
                    {id: '40', link: '#', description: this.$t('investorpage.taskDescription4'), rewardCost: 2900},
                    {id: '10', link: '#', description: this.$t('investorpage.taskDescription2'), rewardCost: 800},
                    {id: '12', link: '#', description: this.$t('investorpage.taskDescription3'), rewardCost: 200},
                  ]
                }
              ]
            },
            {
              name: 'Design agency',
              icon: './img/pages/investor/loreland2.svg',
              rewardAllProject: 150000,
              sections: [
                {
                  name: 'prototype',
                  tasks: [
                    {id: '40', link: '#', description: this.$t('investorpage.taskDescription2'), rewardCost: 250},
                    {id: '10', link: '#', description: this.$t('investorpage.taskDescription3'), rewardCost: 5800},
                    {id: '12', link: '#', description: this.$t('investorpage.taskDescription1'), rewardCost: 750},
                  ]
                },
                {
                  name: 'frontend',
                  tasks: [
                    {id: '40', link: '#', description: this.$t('investorpage.taskDescription4'), rewardCost: 200},
                    {id: '10', link: '#', description: this.$t('investorpage.taskDescription1'), rewardCost: 450},
                    {id: '12', link: '#', description: this.$t('investorpage.taskDescription3'), rewardCost: 1100},
                  ]
                }
              ]
            }
          ],
          projects: [
            {
              name: 'loreland',
              link: '#',
              icon: './img/pages/investor/loreland.svg',
              tasks: [
                {id: '40', link: '#', performed: true},
                {id: '10', link: '#', performed: true},
                {id: '12', link: '#', performed: false},
              ]
            },
            {
              name: 'loreland2',
              link: '#',
              icon: './img/pages/investor/loreland2.svg',
              tasks: [
                {id: '2', link: '#', performed: false},
                {id: '11', link: '#', performed: true}
              ]
            },
            {
              name: 'loreland3',
              link: '#',
              icon: './img/pages/investor/loreland.svg',
              tasks: [
                {id: '20', link: '#', performed: true},
                {id: '13', link: '#', performed: true},
                {id: '15', link: '#', performed: false},
              ]
            },
            {
              name: 'loreland4',
              link: '#',
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
            name: 'user'
          },
          hasPosts: true
        },
        popup: {
          show: false,
          title: '',
          currentProject: 0
        }
      }
    },
    mounted() {
      this.setAllTasks();
      this.setRewardProjects();
    },
    methods: {
      setNull(message) {
        // пока так, х.з. как сделать
        message == 'The reward has been set!' ? window.alert(message) : null;
        this.rewardProject = null;
        this.config1.placeholder = this.$t('investorpage.chooseProject');
        this.rewardSection = null;
        this.rewardTask = null;
        this.isTaskChange = false;
      },
      setRewardTasks(value, id){
        this.rewardTask = null;
        this.config3.placeholder = this.$t('investorpage.chooseTask');
        setTimeout(() => {
          this.rewardSection = value;
          this.currentRewardSection = id;
          this.config3.options = [];

          this.params.projectsForReward[this.currentRewardProject].sections[this.currentRewardSection].tasks.forEach( (el, i) => {
            this.config3.options.push({value: 'Task ' + el.id, id: i});
          });
        }, 300);
      },
      setRewardSections(value, id){
        this.rewardProject = null;
        this.rewardSection = null;
        this.config2.placeholder = this.$t('investorpage.chooseSection');
        this.rewardTask = null;
        this.config3.placeholder = this.$t('investorpage.chooseTask');
        setTimeout(() => {
          this.rewardProject = value;
          this.currentRewardProject = id;
          this.config2.options = [];
          this.params.projectsForReward[id].sections.forEach( (el, i) => {
            this.config2.options.push({value: el.name, id: i});
          });
        }, 300);
      },
      setRewardProjects() {
        this.rewardProject = null;
        this.rewardSection = null;
        this.config2.placeholder = this.$t('investorpage.chooseProject');
        this.rewardTask = null;
        this.config3.placeholder = this.$t('investorpage.chooseTask');

        this.config1.options = [];
        this.params.projectsForReward.forEach( (el, i) => {
          this.config1.options.push({value: el.name, id: i});
        });
      },
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
      },
      setReward(event) {
        let key = event.keyCode
        if (key == 8 || key == 9 || key == 46 || (key >= 37 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
          return true
        }else if (key == 13){
          this.rewardButtonOpen = false;
        }else{
          this.rewardCost = this.rewardCost.slice(0, -1);
        }
      }
    }
  }
</script>

<style lang="scss">
  // .container {
  //   max-width: 768px;
  // }
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
      letter-spacing: -0.7px;
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
      padding: 14px 18px 0 14px;
      font-weight: 700;
      color: $colorTextDark;
      margin: 0;

      > div {
        width: 50%;

        &:nth-child(2n) {
          text-align: right;;
        }
      }
    }

    &__balans-title {
      padding: 0;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 98px;
        height: 41px;
        font-size: 16px;
        line-height: 1;
        font-weight: 700;
        color: $colorTextDark2;
        border-radius: 14px;
        border: 1px solid $colorBorder1;
        background: none;
        transform: translate3d(0, -7px, 0);
      }
    }

    &__balans-data {
      text-align: right;
    }

    &__balans-data--count {
      padding: 0 16px 18px 0;
      font-size: 17px;

      img {
        margin: 0 7px 0 0;
      }
    }

    &__balans-currency.button__wrap {
      position: relative;
      display: inline;

      .button__dropdown {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100px;
        height: 100%;
        padding: 7px 0 0;
        background-color: rgba(255,255,255, .85);
        color: #000;
        text-align: center;
        border-radius: 5px;
        overflow: hidden;

        &.is-open {
          display: block;
        }

        span {
          margin: 0 10px;
          cursor: pointer;
        }
      }
    }

    &__currency {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 98px;
      height: 41px;
      padding: 6px 3px;
      line-height: 1;
      font-weight: 700;
      border-radius: 14px;
      border: 1px solid $colorBorder1;
      background: none;
      margin: 1px 23px 0 0;

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
      justify-content: space-between;
      flex-wrap: wrap;
      min-height: 132px;
      padding: 0 0 0 10px;


      &.w-button {
        position: relative;
        margin-bottom: 19px;
      }

      &.is-right {
        justify-content: flex-start;
        text-align: left;
      }
    }

    &__tasks-items {
      display: flex;
      max-width: calc(100% - 150px);
      flex-direction: column;
      justify-content: center;
    }

    &__tasks-button {
      width: 100px;
      height: 100px;
      background: 60% center no-repeat;
      background-size: 75px auto;
      border-radius: 30px;
      border: 1px solid $colorBorder1;
      box-shadow:0px 0px 3px 1px rgba(0,0,0,0.25);
      margin: 25px;
      cursor: pointer;
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
      padding: 0 10px 0 0;

      button {
        background-color: #4DD44D;
      }
    }

    &__reward-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 9px 43px 8px 0;
      color: #ffffff;

      .dropdown {
        width: 260px;
        max-width: 90%;
        margin: 0 auto;
      }
    }

    &__reward-head--title {
      width: 100%;
      padding: 10px 20px;
      text-align: center;
    }

    &__reward-button {
      width: 100%;
      padding: 20px 10px 20px;
      text-align: center;

      button {
        width: 160px;
        padding: 6px 0 8px;
        font-size: 20px;
        font-weight: 700;
        line-height: 1;
        border-radius: 18px;
        border: 1px solid $colorBorder1;
        background-color: #F3763E;
        color: #0a0a0a;
        transform: translate3d(0, 30px, 0);
      }
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
        width: 120px;
        padding: 6px 0 8px;
        font-size: 20px;
        font-weight: 700;
        line-height: 1;
        border-radius: 18px;
        border: 1px solid $colorBorder1;
        background-color: #F3763E;
        color: #0a0a0a;
      }

      .button {
        &__wrap {
          position: relative;
          display: inline;
        }

        &__dropdown {
          position: absolute;
          top: -9px;
          right: 0;
          display: none;
          width: 120px;
          height: calc(100% + 16px);
          padding: 8px 20px 9px 0;
          background-color: rgba(255,255,255, .85);
          color: #000;
          text-align: center;
          border-radius: 5px;
          overflow: hidden;

          &.is-open {
            display: block;
          }

          input {
            width: calc(100% - 35px);
            height: 100%;
            font-size: 20px;
            background-color: rgba(0,0,0, 0);
            border: none;
            outline: none;
          }
        }
        &__dropdown-ok {
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 100%;
          background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiM3NTk0RTMiIGQ9Ik0xMiAyQzYuNSAyIDIgNi41IDIgMTJTNi41IDIyIDEyIDIyIDIyIDE3LjUgMjIgMTIgMTcuNSAyIDEyIDJNMTAgMTdMNSAxMkw2LjQxIDEwLjU5TDEwIDE0LjE3TDE3LjU5IDYuNThMMTkgOEwxMCAxN1oiIC8+PC9zdmc+) center center no-repeat;
          background-size: cover;
          cursor: pointer;
        }
      }
    }

    &__confirm {
      display: flex;
      justify-content: center;
      align-self: center;
      margin: 0 0 50px;
    }

    &__confirm-ok,
    &__confirm-cancel {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid $colorBorder1;
      background: #F3763E url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yMSw3TDksMTlMMy41LDEzLjVMNC45MSwxMi4wOUw5LDE2LjE3TDE5LjU5LDUuNTlMMjEsN1oiIC8+PC9zdmc+) center center no-repeat;
      background-size: contain;
      margin: 0 20px 0 0;
    }

    &__confirm-cancel {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xOSw2LjQxTDE3LjU5LDVMMTIsMTAuNTlMNi40MSw1TDUsNi40MUwxMC41OSwxMkw1LDE3LjU5TDYuNDEsMTlMMTIsMTMuNDFMMTcuNTksMTlMMTksMTcuNTlMMTMuNDEsMTJMMTksNi40MVoiIC8+PC9zdmc+);
      margin: 0 0 0 20px;
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

        &:last-child.active button {
          padding: 3px 2px;
          border-width: 8px;
        }
      }

      button {
        min-width: 80px;
        padding: 11px 2px;
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
