<template>
  <div class="container">
    <div :class="'layout-'+$store.getters.layout">
      <div class="task clearfix">
        <h3 class="task-name">{{task.subject}}</h3>
        <!--<p v-html="task.description.html | ''"></p>-->
        <p>Цена: <strong>{{task.laborCosts}}</strong></p>
        <small>
          <strong>Дата создания:</strong> {{task.createdAt | date_time}},
          <strong>Дата завершения:</strong> {{task.dueDate | date_time}}
        </small>
        <router-link :to="getSubmitLink" >
          <div class="btn btn-primary btn-right">
            Подать решение
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'

  export default {
    data: () => {
      return {
      }
    },
    computed: {
      getSubmitLink () {
        return {
          path: '/submit/' + this.task.id,
          query: {
            task: _.get(this, 'task', {}),
            userId: _.get(this, 'userId', {})
          }
        }
      }
    },
    filters: {
      date_time: (date) => {
        return moment(date).locale('ru').format('MMMM Do YYYY, h:mm')
      }
    },
    props: {
      task: {
        type: Object,
        default: () => {
          return {}
        }
      },
      userId: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .info-red {
    color: red;
    padding-left: 10px;
  }
  .task-name {
    display: block;
    width: 100%;
    text-align: left;
    float: left;
  }
  .decision {
    display: block;
    padding: 10px;
    width: 100%;
    /*height: 250px;*/
    content: " ";
    clear: both;
    margin-top: -5px;
    border-left: 2px solid #0f0f0f;
    border-right: 2px solid #0f0f0f;
    border-bottom: 2px solid #0f0f0f;
  }
  .task {
    display: block;
    width: 100%;
    padding: 10px;
    border: 2px solid #0f0f0f;
    border-radius: 4px;
    padding-bottom: 25px;
  }
  .btn {
    display: block;
    margin-bottom: 2px;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
  }
  .btn-left {
    float: left;
  }
  .btn-right {
    float: right;
  }
  .btn-primary {
    border: 2px solid #db4813;
  }
  .btn-success {
    border: 2px solid #28bf1a;
  }
  a {
    color:inherit;
    text-decoration: none;
  }
</style>
