<template>
  <div class="investments">
    <div class="investments__wrapper">
      <CabinetMenu :params="cabinetMenuParams" />
      <div class="investments__content">

        <div class="investments__header">
          <h1 class="investments__title">
            {{ {
                ru: 'Кабинет инвестора',
                en: 'Investor\'s office',
                ch: '投资者办公室'
              }[$store.getters.lang] }}
          </h1>
          <div class="investments__header-link">
            <a href="#" @click.prevent>
              <img src="@/assets/img/svg/loreland_icon_no_text.svg" alt="">
            </a>
            <span>Loreland</span>
          </div>
        </div>

        <div class="investments__balans">
          <div class="investments__balans-title">Balance</div>
          <div class="investments__balans-data">
            <div class="investments__balans-data--count">
              <img src="@/assets/img/svg/Money.svg" alt="">
              <span>{{ params.money | separatorNum }}т.</span>
            </div>
            <button class="investments__balans-data--currency">
              <span>{{ currentCurrency }}</span>
              <span>{{ {
                ru: 'Сменить валюту',
                en: 'Change currency',
                ch: '改变货币'
              }[$store.getters.lang] }}</span>
            </button>
          </div>
        </div>

        <div class="investments__score">
          <div class="investments__buy">
            <div class="investments__buy-title">
              {{ {
                ru: 'Доступно для приобретения',
                en: 'Available for purchase',
                ch: '可以购买'
              }[$store.getters.lang] }}:
            </div>
            <div class="investments__buy-count">
              <img src="@/assets/img/svg/Money.svg" alt="">
              <span>{{ params.forBuy[currentCurrency].money | separatorNum }}т.</span>
              <span>{{ {
                  ru: 'по цене',
                  en: 'by price',
                  ch: '为了价格'
                }[$store.getters.lang] }} 
                <template v-if="currentCurrency == '$'">{{currentCurrency}}{{params.forBuy[currentCurrency].price}}</template>
                <template v-else>{{params.forBuy[currentCurrency].price}}{{currentCurrency}}</template> 
              </span>
            </div>
            <div class="investments__buy-button">
              <button>
                {{ {
                  ru: 'Купить',
                  en: 'Buy',
                  ch: '要买'
                }[$store.getters.lang] }}
              </button>
            </div>
          </div>

          <div class="investments__score-separator"></div>

          <div class="investments__sell">
            <div class="investments__sell-title">
              {{ {
                ru: 'Доступно для продажи',
                en: 'Available for sale',
                ch: '可供出售'
              }[$store.getters.lang] }}:
            </div>
            <div class="investments__sell-count">
              <img src="@/assets/img/svg/Money.svg" alt="">
              <span>{{ params.forSell[currentCurrency].money | separatorNum }}т.</span>
              <span>{{ {
                  ru: 'по цене',
                  en: 'by price',
                  ch: '为了价格'
                }[$store.getters.lang] }} 
                <template v-if="currentCurrency == '$'">{{currentCurrency}}{{params.forBuy[currentCurrency].price}}</template>
                <template v-else>{{params.forBuy[currentCurrency].price}}{{currentCurrency}}</template> 
              </span>
            </div>
            <div class="investments__sell-button">
              <button>
                {{ {
                  ru: 'Выставить',
                  en: 'To expose',
                  ch: '暴露'
                }[$store.getters.lang] }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="investments__footer">
        <div class="investments__footer-tasks" :class="{'active' : activeButton == 'tasks'}">
          <button>
            <img src="@/assets/img/svg/tasks.svg" alt="">
            <span @click="activeButton = 'tasks'">
              {{ {
                  ru: 'Задания',
                  en: 'Tasks',
                  ch: '任务'
                }[$store.getters.lang] }}({{params.tasks}})
            </span>
          </button>
        </div>
        <div class="investments__footer-performed" :class="{'active' : activeButton == 'performed'}">
          <button @click="activeButton = 'performed'">
            <img src="@/assets/img/svg/inProgr.svg" alt="">
            <span>
              {{ {
                  ru: 'Выполняется',
                  en: 'Performed',
                  ch: '正在进行中'
                }[$store.getters.lang] }}({{params.performed}})
            </span>
          </button>
        </div>
        <div class="investments__footer-history" :class="{'active' : activeButton == 'history'}">
          <button @click="activeButton = 'history'">
            <img src="@/assets/img/svg/comments.svg" alt="">
            <span>
              {{ {
                  ru: 'История',
                  en: 'Story',
                  ch: '故事'
                }[$store.getters.lang] }}
            </span>
          </button>
        </div>
        <div class="investments__footer-reward" :class="{'active' : activeButton == 'reward'}">
          <button @click="activeButton = 'reward'">
            <img src="@/assets/img/svg/sendHeartWhite.svg" alt="">
            <span>
              {{ {
                  ru: 'Установить награду',
                  en: 'Set reward',
                  ch: '设定奖励'
                }[$store.getters.lang] }}
            </span>
          </button>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
  import CabinetMenu from "../../components/Elements/CabinetMenu";
  export default {
    name: "Investments",
    components: {CabinetMenu},
    data() {
      return {
        currentCurrency: '$',
        activeButton: null,
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
          tasks: 3,
          performed: 3
        },
        cabinetMenuParams: {
          back: '/',
          posts: 0,
          postsLink: '#',
          profile: '#'
        },
      }
    }
  }
</script>

<style lang="scss">
  .investments {
    font-family: 'SFProText';
    background: url('./../../assets/img/investments_bg.svg') 5% 196px repeat-x,
                url('./../../assets/img/investments_bg.svg') 25% 81% repeat-x,
                linear-gradient(to top left, $colorInvestmentsBG-2, $colorInvestmentsBG-1);

    div {
      box-sizing: border-box;
    }

    &__wrapper {
      position: relative;
      max-width: 768px;
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

    &__header-link {
      float: right;
      font-size: 14px;
      transform: translate3d(0, -2px, 0);

      img {
        margin: 0 5px 0 0;
        transform: translate3d(0, 2px, 0);
      }
    }

    &__balans {
      display: inline-block;
      vertical-align: top;
      width: 100%;
      padding: 26px 0 0;
      font-size: 0;
      font-weight: 700;
      color: $colorTextDark;
      margin: 0 0 22px;
    }

    &__balans-title,
    &__balans-data {
      display: inline-block;
      vertical-align: top;
      width: 50%;
    }

    &__balans-title {
      padding: 14px 0 0 19px;
      font-size: 20px;
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

    &__balans-data--currency {
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

    &__score {
      padding: 20px 10px 16px;
      background-color: #fff;
      border-top-right-radius: 100px;
      border-bottom-left-radius: 100px;
      margin: 0 0 13px;
    }

    &__score-separator {
      height: 1px;
      background-color: $colorInvestmentsSeparator;
      margin: 0 10px;
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
    &__sell-button {
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
      background-color: $colorInvestmentsBG-3;
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
          background-color: $colorInvestmentsBG-3;
        }
      }
    }
  }
</style>