<template>
  <header class="app-top-bar" :class="theme">
    <div class="app-top-bar__row">
      <section class="app-top-bar__section">
        <!-- при необходимости, можно добавить слот -->
        <router-link :to="backRoute || { name: 'user' }" class="app-top-bar__action">
          <span class="app-top-bar__icon app-top-bar__icon--arrow-left">
            <svg class="svg-back-dims">
							<use xlink:href="#back"></use>
						</svg>
          </span>
        </router-link>

        <span class="app-top-bar__title">
          <slot name="title" v-bind:title="title">{{ title }}</slot>
        </span>
      </section>
      <section class="app-top-bar__section app-top-bar__section--align-end">
        <button class="app-top-bar__action">
          <span class="app-top-bar__icon app-top-bar__icon--more">
            <svg class="svg-BTN-dims">
							<use xlink:href="#BTN"></use>
						</svg>
          </span>
        </button>

        <button class="app-top-bar__action" style="margin-right: 0.33333em;">
          <span class="app-top-bar__icon app-top-bar__icon--bell">
            <svg class="svg-bell-dims" :style="{ '--circle-display': !hasPosts ? 'none' : 'block' }">
							<use xlink:href="#bell"></use>
						</svg>
          </span>
        </button>

        <router-link :to="{ name: 'profile' }" class="app-top-bar__action">
          <span class="app-top-bar__icon">
            <svg class="svg-profile-dims">
              <use xlink:href="#profile"></use>
            </svg>
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
  name: 'AppTopBar2',
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
  &.dark {
    .svg-back-dims {
      fill: #fff;
    }
    .svg-bell-dims {
      fill: #fff;
    }
    .svg-profile-dims {
      fill: #000;
      color: #fff;
    }
  }
  &.light {
    .svg-back-dims {
      fill: #000;
    }
    .svg-bell-dims {
      fill: #000;
    }
    .svg-profile-dims {
      fill: #fff;
      color: #000;
    }
  }
}
</style>
