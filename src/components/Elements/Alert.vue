<template>
  <div class="alert" v-show="getAlert.show">
    <span class="message">{{getAlert.message}}</span>
    <span class="close-btn">Закрыть</span>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    data: () => {
      return {
      }
    },
    computed: {
      getAlert () {
        return this.$store.getters['alert/getAlert']
      }
    }
  }
</script>

<style scoped>
  .alert {
    z-index: 2000;
    display: block;
    height: 40px;
    overflow: hidden;
    border: 2px solid #367733;
    border-radius: 3px;
    position: fixed;
    top: 10px;
    right: 20px;
    padding: 10px;
    background: #ffff;
  }
  .close-btn {
    float: right;
    padding-left: 15px;
    cursor: pointer;
  }
</style>
