<template>
  <div class="container">
    <div :class="'layout-'+$store.getters.layout">
      <div class="wrapper page">
        <app-top-bar v-bind="appTopBarProps" style="z-index: 10">
          <span slot="title" style="color: white">
            {{$t('voting.title')}}
          </span>

          <div class="description">
            <div class="description__head">
              <router-link :to="{ name: 'listOfSolutions' }" class="description__title description__link">
                {{$t('voting.solution')}}
                №1
              </router-link>
              <router-link to="/project/3/task_page/42?userId=5c802dd4a5e259192aa6dad2/project/3" class="description__title description__link">
                {{$t('voting.task')}}
                №42
              </router-link>
            </div>
            <div class="description__timer">
              {{$t('voting.endIn')}}
              01 : 12 : 45
            </div>
            <div class="description__body">
              <app-top-bar-button class="description__button" @click="$router.push({ name: 'project', params: { project_id: 3 } })">
                <template slot="icon">
                  <img src="@/assets/img/svg/loreland_icon.svg" alt="Project icon">
                </template>
                <template slot="caption">
                  {{$t('voting.project')}}
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
                {{
                  {
                    ru: 'Идея',
                    en: 'Idea',
                    ch: '这个想法'
                  }[$store.getters.lang]
                }}
              </app-top-bar-button>
              <app-top-bar-button class="description__button">
                <template slot="icon">
                  <span class="blue-circle"></span>
                </template>
                <template slot="caption">
                  {{$t('voting.category')}}
                </template>
                {{
                  {
                    ru: 'Разработка',
                    en: 'Development',
                    ch: '设计'
                  }[$store.getters.lang]
                }}
              </app-top-bar-button>
              <app-top-bar-button class="description__button" theme="gray" direction="vertical" size="small">
                <template slot="icon">
                  <img src="@/assets/img/svg/eye.svg" alt="View icon">
                </template>
                {{$t('voting.viewSolution')}}
              </app-top-bar-button>
            </div>
          </div>
        </app-top-bar>

        <app-panel style="z-index: 8; align-items: center">
          <template slot="title">
            {{$t('voting.vote')}}
          </template>

          <div class="voting">
            <router-link :to="{ name: 'project', params: { project_id: 3 } }" class="voting__action">
              <img src="@/assets/img/svg/ok_circle.svg" alt="Like" class="voting__action-image">
            </router-link>
            <router-link :to="{ name: 'project', params: { project_id: 3 } }" class="voting__action">
              <img src="@/assets/img/svg/cross_square.svg" alt="Dislike" class="voting__action-image">
            </router-link>
          </div>
        </app-panel>

        <app-panel theme="dark" style="z-index: 6; align-items: center">
          <template slot="title">
            {{$t('voting.results')}}
          </template>

          <div class="results">
            <div class="results__row">
              <div class="results__group">
                <div class="results__preview">
                  <img src="@/assets/img/svg/ok_circle.svg" alt="Like" class="results__preview-image">
                </div>
                <div class="results__limiter">-</div>
                <div class="results__value">600 000</div>
              </div>
              <div class="results__percent">60%</div>
            </div>

            <div class="results__row">
              <div class="results__group">
                <div class="results__preview">
                  <img src="@/assets/img/svg/cross_square.svg" alt="Dislike" class="results__preview-image">
                </div>
                <div class="results__limiter">-</div>
                <div class="results__value">400 000</div>
              </div>
              <div class="results__percent">40%</div>
            </div>
          </div>
        </app-panel>
        <app-panel style="z-index: 4; align-items: center">
          <template slot="title">
            {{$t('profile.fullName')}}
          </template>

          <div class="voting">
            <router-link :to="{ name: 'profile'}" class="voting__action">
              <img src="@/assets/img/svg/profile.svg" alt="Like" class="voting__action-image">
            </router-link>
            
          </div>
        </app-panel>
      </div>
    </div>
  </div>
</template>

<script>
import AppTopBar from '@/components/Elements/AppTopBar'
import AppPanel from '@/components/Elements/AppPanel'
import AppTopBarButton from '@/components/Elements/AppTopBarButton'

export default {
  name: 'VotingPage',
  components: {
    AppTopBar,
    AppTopBarButton,
    AppPanel
  },
  data() {
    return {
      appTopBarProps: {
        theme: 'light',
        backRoute: {
          name: 'privatePage'
        },
        hasPosts: true
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

.page {
  font-family: Roboto, sans-serif;
  font-size: $--font-size-base;
  margin: 0 auto;
  padding: 0;
}

.voting {
  align-self: stretch;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: (2px / $--font-size-base) * 1em (20px / $--font-size-base) * 1em (20px / $--font-size-base) * 1em;

  &__action {
    cursor: pointer;
    display: flex;
    width: 96px;
    height: 96px;

    &-image {
      width: 100%;
      height: auto;
    }
  }
}

.results {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  font-size: $--font-size-base;

  padding: 0 (6px / $--font-size-base) * 1em (6px / $--font-size-base) * 1em;

  &__row {
    display: flex;
    justify-content: space-between;
    font-size: (32px / $--font-size-base) * 1em;

    &:not(:last-child) {
      margin-bottom: (18px / 32px) * 1em;
    }
  }
  &__group {
    display: flex;
    padding-right: 10px;
  }
  &__preview {
    display: flex;
    width: 40px;
    height: 40px;

    &-image {
      width: 100%;
      height: auto;
    }
  }
  &__limiter {
    margin: 0 (8px / $--font-size-base) * 1em;
  }
}
</style>
