<template>
  <header class="app-top-bar">
    <div class="app-top-bar__row">
      <section class="app-top-bar__section">
        <!-- при необходимости, можно добавить слот -->
        <router-link :to="backRoute || { name: 'user' }" class="app-top-bar__action">
          <span class="app-top-bar__icon app-top-bar__icon--arrow-left">
            <img v-if="theme === 'light'" src="@/assets/img/svg/back.svg" class="app-top-bar__icon-image">
            <img v-else src="@/assets/img/svg/arrow-left.svg" class="app-top-bar__icon-image">
          </span>
        </router-link>

        <span class="app-top-bar__title">
          <slot name="title" v-bind:title="title">{{ title }}</slot>
        </span>
      </section>
      <section class="app-top-bar__section app-top-bar__section--align-end">
        <button class="app-top-bar__action">
          <span class="app-top-bar__icon app-top-bar__icon--more">
            <img src="@/assets/img/svg/BTN.svg" class="app-top-bar__icon-image">
          </span>
        </button>

        <button class="app-top-bar__action" style="margin-right: 0.33333em;">
          <span class="app-top-bar__icon app-top-bar__icon--bell">
            <template v-if="theme === 'light'">
              <img v-if="hasPosts" src="@/assets/img/svg/bell.svg" class="app-top-bar__icon-image">
              <img v-else src="@/assets/img/svg/bell_no_posts.svg" class="app-top-bar__icon-image">
            </template>
            <template v-else>
              <img v-if="hasPosts" src="@/assets/img/svg/bell_white.svg" class="app-top-bar__icon-image">
              <img v-else src="@/assets/img/svg/bell_white_no_posts.svg" class="app-top-bar__icon-image">
            </template>
          </span>
        </button>

        <router-link :to="{ name: 'profile' }" class="app-top-bar__action">
          <span class="app-top-bar__icon">
            <img v-if="theme === 'light'" src="@/assets/img/svg/profile.svg" class="app-top-bar__icon-image">
            <img v-else src="@/assets/img/svg/profile_inv.svg" class="app-top-bar__icon-image">
          </span>
        </router-link>
      </section>
    </div>

    <!-- слот по умолчанию -->
    <div class="app-top-bar__row" v-if="$slots.default">
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppTopBar',
  props: {
    title: String,
    theme: {
      type: String,
      default: 'light',
      validator: theme => ['light', 'dark'].includes(theme)
    },
    backRoute: Object,
    hasPosts: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

$font-size: 18px;
$icon-size: 34px;

.app-top-bar {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: (22px / $font-size) * 1em 0;

  font-size: $font-size;

  border-radius: 0 0 0 $--border-radius;
  background-image: linear-gradient(-51deg, #cbbbdd 0%, #7594e3 100%);

  &__row {
    display: flex;
    padding: (8px / $font-size) * 1em 1em;
    @media screen and (max-width: 575px) {
      max-width: 100%;
    }
  }
  &__section {
    display: flex;
    flex: 1 1 auto;
    min-width: 0;

    &--align-end {
      justify-content: flex-end;
    }
  }
  &__action {
    outline: none;
    cursor: pointer;
    font-size: inherit;
    border: 0;
    background-color: transparent;
  }
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ($icon-size / $font-size) * 1em;
    height: ($icon-size / $font-size) * 1em;

    &-image {
      width: 100%;
      height: auto;
    }

    &--arrow-left &-image {
      width: (17px / $icon-size) * 100%;
    }
    &--more &-image {
      width: (26px / $icon-size) * 100%;
    }
    &--bell &-image {
      width: (17px / $icon-size) * 100%;
    }
  }
  &__title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding:
      (7px / $font-size) * 1em
      (10px / $font-size) * 1em
      (4px / $font-size) * 1em;
    transform: translate3d(0, -5px, 0);
  }
}

.description {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  &__head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: (8px / $--font-size-base) * 1em;
  }
  &__link {
    text-decoration: none;
  }
  &__title {
    color: white;
    padding: 0 .25em;
  }
  &__timer {
    margin-bottom: (11px / $--font-size-base) * 1em;
    text-align: center;
    color: #d21818;
  }
  &__body {
    display: flex;
    flex-wrap: wrap;
  }
  &__button {
    width: calc(50% - 5px);
    margin-bottom: 10px;

    &:nth-child(2n - 1) {
      margin-right: 10px;
    }
    &:nth-child(even):nth-last-child(-n + 1),
    &:nth-child(odd):nth-last-child(-n + 2) {
      margin-bottom: 0;
    }
  }
}

.blue-circle {
  display: block;
  width: (13px / $--font-size-base) * 1em;
  height: (13px / $--font-size-base) * 1em;
  border: 1px solid #707070;
  border-radius: 100%;
  background-color: #0a48f5;
}
</style>
