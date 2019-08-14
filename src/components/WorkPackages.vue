<template>
  <div>
    <div class="tasks" v-for="(el, key) in data" :key="key">
      <SubmitPreview
          :task="el"
          :userId="'507f1f77bcf86cd799439011'"
      ></SubmitPreview>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash';

  import SubmitPreview from '@/components/SubmitPreview'

  // if this page on your server
  // const URL = 'http://5.200.53.83/api/v3/work_packages'
  // or use proxytable
  const URL = '/api/v3/work_packages'

  const username = 'apikey'
  const password = '06ac71bad3feebb1d29d73f0821cc9d020c8075dd128f917e81dad78ef34fb69'

  export default {
    name: 'WorkPackages',
    data: () => {
      return {
        data: []
      }
    },
    async mounted () {
      try {
        let result = await axios({
          method: 'get',
          url: URL,
          auth: {
            username: username,
            password: password
          }
        })
        if (result) {
          let data = _.map(
            _.get(result, 'data._embedded.elements'),
            el => {
              return _.pick(
                el, ['id', 'subject', 'description', 'dueDate', 'createdAt', 'laborCosts']
              )
            }
          )
          this.$set(this, 'data', data)
        } else {
          this.$store.commit('setAlert', 'Не удалось загрузить данные!')
        }
      } catch (e) {
        this.$store.commit('setAlert', 'Ошибка загрузки. Повторите попытку позже!')
      }
    },
    components: {
      SubmitPreview
    }
  }
</script>

<style>
  .tasks {
    margin-bottom: 10px;
  }
</style>
