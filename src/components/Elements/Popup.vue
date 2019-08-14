<template>
<div>
  <div ref="layer" class="layer" v-show="show" @click="layerClick">
    <div class="popup">
      <div class="popup-wrapper">
        <h2 class="name">{{name}}</h2>
        <div class="popup-content">
          <slot></slot>
        </div>
        <div class="button-group-popup">
          <div class="btn btn-cancel" @click="close" v-show="!checkZero(cancelText)">
            {{cancelText}}
          </div>
          <div class="btn btn-submit" @click="ok" v-show="!checkZero(okText)">
            {{okText}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Popup',
  data: () => {
    return {
    }
  },
  methods: {
    layerClick (e) {
      if (e.target === this.$refs.layer) {
        this.$emit('close')
      }
    },
    checkZero (val) {
      return _.isEmpty(val)
    },
    ok: function () {
      this.$emit('ok')
    },
    close: function () {
      this.$emit('close')
    },
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .layer
    font-family: 'SFProText';
    position: fixed;
    z-index 999
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .6)
    left 0
    top 0
    right 0
    bottom 0

    .popup
      overflow hidden
      width 75%
      background white
      height 80%
      position fixed
      z-index 1200
      left calc(25% / 2)
      top calc(20% / 2)
      box-shadow 2px 2px 2px rgba(0, 0, 0, .77)
      -webkit-border-radius 15px
      -moz-border-radius 15px
      border-radius 15px
      padding 20px
      box-sizing border-box

      .popup-wrapper
        display block
        width 100%
        height 100%
        position: relative

        .name
          text-align center
          width 100%
          line-height 50px
          font-size 1.7em

        .popup-content
          width 100%

        .button-group-popup
          display block
          height 50px
          padding-left 20px
          width 100%
          position absolute
          bottom 0

          .btn
            font-size 1.1em
            font-weight 700
            height: 40px;
            line-height: 40px;
            padding-left: 40px;
            padding-right: 40px;
            border-radius 24px
            cursor pointer
            margin-bottom 10px
            text-align center
            color white

          .btn-cancel
            position absolute
            left: 30px
            background-color #201930

          .btn-submit
            background: #8a9cdc;
            position absolute
            right 30px

  @media (max-width: 730px)
    .button-group-popup
      height auto !important
      padding-left 0 !important

      .btn
        position relative !important
        left initial !important
        right initial !important

</style>
