<template>
  <div class="panel" :class="classNames">
    <span class="panel__title" v-if="$slots.title">
      <slot name="title" v-bind:title="title">
        {{ title }}
      </slot>
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppPanel',
  props: {
    theme: {
      type: String,
      default: 'light',
      validator: theme => ['dark', 'light', 'blue'].includes(theme)
    },
    title: String
  },
  computed: {
    classNames() {
      const classNames = []

      if (this.theme !== 'light') {
        classNames.push(`panel--${ this.theme }`)
      }

      return classNames
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

$font-size: 18px;

.panel {
  position: relative;
  z-index: -1;
  margin-top: -($--border-radius);
  padding: $--border-radius (20px / $font-size) * 1em (20px / $font-size) * 1em;

  display: flex;
  flex-direction: column;

    color: #47102a;
    background-color: white;
  border-radius: 0 0 0 $--border-radius;

  font-size: $font-size;

  // elements
  &__title {
    padding: (11px / $font-size) * 1em 0;
  }

  // theme modificators
  &--dark {
    color: white;
    background-color: #060606;
  }

  &--blue {
    color: white;
    background: linear-gradient(to top left, #CBBBDD, #7594E3);
  }
}
</style>
