<template>
  <button class="top-bar-button" :class="classNames" v-on="$listeners">
    <span class="top-bar-button__icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="top-bar-button__content">
      <span class="top-bar-button__caption" v-if="$slots.caption && direction !== 'vertical'">
        <slot name="caption"></slot>
      </span>
      <div class="top-bar-button__text">
        <slot></slot>
      </div>
    </span>
  </button>
</template>

<script>
export default {
  name: 'AppButtonCaption',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator: direction => ['horizontal', 'vertical'].includes(direction)
    },
    theme: {
      type: String,
      default: '',
      validator: theme => ['', 'gray'].includes(theme)
    },
    size: {
      type: String,
      default: '',
      validator: size => ['', 'small'].includes(size)
    }
  },
  computed: {
    classNames() {
      const classNames = []

      if (this.direction === 'vertical') {
        classNames.push('top-bar-button--vertical')
      }
      if (this.theme) {
        classNames.push(`top-bar-button--theme_${ this.theme }`)
      }
      if (this.size) {
        classNames.push(`top-bar-button--size_${ this.size }`)
      }

      return classNames
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

$button-font-size: (56px / $--font-size-base) * 1em;

.top-bar-button {
  display: flex;
  align-items: center;
  height: (60px / $--font-size-base) * 1em;
  padding: (1px / $--font-size-base) * 1em;

  color: white;
  font-size: $--font-size-base;

  background-color: transparent;

  border: 1px solid #d1d5f1;
  border-radius: (10px / $--font-size-base) * 1em;
  overflow: hidden;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $button-font-size;
    height: $button-font-size;
    margin-right: (5px / $--font-size-base) * 1em;

    &-image {
      width: 100%;
      height: auto;
    }
  }
  &__content {
    flex-grow: 1;
    min-width: 0;
  }
  &__caption {
    color: #878585;
    font-size: .5em;
  }
  &__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // direction modifications
  &--vertical {
    flex-direction: column;
  }
  &--vertical &__icon {
    margin: -(10px / $--font-size-base) * 1em 0;
  }

  // theme modifications
  &--theme_gray {
    color: #65545c;
    border-color: #707070;
  }

  // size modifications
  &--size_small &__text {
    font-size: (10px / $--font-size-base) * 1em;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
}
</style>
