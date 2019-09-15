import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'

import store from '../store/store'

Vue.use(Router);

const router = new Router({
  // mode: 'hash',
  mode: 'history',
  // заменяет хеш-навигацию (/#/название-путя) на настоящую (/название-путя)
  // https://router.vuejs.org/guide/essentials/history-mode.html
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // страница входа-регистрации
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue'),
      // meta.auth объект описывающий поведение модуля защиты маршрутов
      meta: {
        auth: {
          // successRedirect указывает по какому пути отправить пользователя если он авторизован
          successRedirect: '/user',
        }
      }
    },
    // страница проекта
    {
      path: '/project/:project_id',
      name: 'project',
      component: () => import(/* webpackChunkName: "project" */ '../views/Project.vue'),
      meta: {
        auth: {
          // auth.guard означает что по этому пути могут пройти только авторизованные пользователи
          guard: true
        }
      }
    },
    {
      path: '/listInProgress',
      name: 'listInProgress',
      component: () => import(/* webpackChunkName: "listInProgress" */ '../views/pages/ListInProgress.vue')
    },
    {
      path: '/listOfSolutions',
      name: 'listOfSolutions',
      component: () => import(/* webpackChunkName: "listOfSolutions" */ '../views/pages/ListOfSolutions.vue')
    },
    {
      path: '/mySolutions',
      name: 'mySolutions',
      component: () => import('../views/pages/MySolutions.vue')
    },
    {
      path: '/comments',
      name: 'comments',
      component: () => import('../views/pages/Comments.vue')
    },
    {
      path: '/privatePage',
      name: 'privatePage',
      component: () => import('../views/pages/PrivatePage.vue')
    },
    {
      path: '/myHistory',
      name: 'myHistory',
      component: () => import('../views/pages/MyHistory.vue')
    },
    {
      path: '/votingPage',
      name: 'votingPage',
      component: () => import(/* webpackChunkName: "votingPage" */ '../views/pages/VotingPage.vue')
    },
    {
      path: '/proofreadingPage',
      name: 'proofreadingPage',
      component: () => import('../views/pages/ProofreadingPage.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ '../views/pages/Profile.vue')
    },
    {
      path: '/featured',
      name: 'featured',
      component: () => import('../views/pages/Featured.vue')
    },
    // страница задачи
    {
      path: '/project/:project_id/task_page/:task_id',
      name: 'task_page',
      component: () => import(/* webpackChunkName: "taskPage" */ '../views/pages/TaskPage.vue'),
    },
    // страница подачи решения
    {
      path: '/project/:project_id/submit/:task_id',
      name: 'decision',
      component: () => import(/* webpackChunkName: "SubmitDecision" */ '../views/SubmitSolution.vue'),
      props(route) {
        return {
          task: route.query.task,
          userId: route.query.userId
        }
      },
      meta: {
        auth: {
          // auth.guard означает что по этому пути могут пройти только авторизованные пользователи
          // guard: true
        }
      }
    },
    // кабинет инвестора
    {
      path: '/InvestorPage',
      name: 'InvestorPage',
      component: () => import('../views/pages/InvestorPage.vue'),
      // meta: {
      //   auth: {
      //     // auth.guard означает что по этому пути могут пройти только авторизованные пользователи
      //     guard: true
      //   }
      // }
    },
    // AddTaskLognGrid
    {
      path: '/addtask',
      name: 'addtask',
      component: () => import('../views/pages/AddTaskLoginGrid.vue'),
      // meta: {
      //   auth: {
      //     // auth.guard означает что по этому пути могут пройти только авторизованные пользователи
      //     guard: true
      //   }
      // }
    },
    // страница пользователя
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "login" */ '../views/User.vue'),
      meta: {
        auth: {
          // auth.guard означает что по этому пути могут пройти только авторизованные пользователи
          guard: true
        }
      }
    },
    {
      path: '/idea',
      name: 'idea',
      component: () => import(/* webpackChunkName: "idea" */ '../components/Idea.vue')
    },
    {
      path: '/myProjects',
      name: 'myProjects',
      component: () => import('../views/pages/MyProjects.vue')
    },
    {
      path: '/newProject',
      name: 'newProject',
      component: () => import('../views/pages/NewProject.vue')
    },
    {
      path: '/sections',
      name: 'sections',
      component: () => import('../views/pages/Sections.vue')
    },
    {
      path: '/sectionTasks',
      name: 'sectionTasks',
      component: () => import('../views/pages/SectionTasks.vue')
    },
    {
      path: '/progressProject',
      name: 'progressProject',
      component: () => import('../views/pages/progressProject.vue')
    }
  ]
});

// модуль защиты путей
router.beforeEach((to, from, next) => {
  // настройки авторизации для маршрута не заданы
  if (!to.meta.auth)
    return next();
  // токен может быть передан в query (oauth)
  const token = to.query.token;
  if (token)
    // обновляем токен
    store.dispatch('updateAuthenticationToken', token);

  // если не авторизованы и токена в query нету
  if (!store.getters.authenticationToken && !token) {
    // если маршрут защищен, перенаправить
    if (to.meta.auth.guard)
      // урл перенаправления указан
      if (to.meta.auth.failureRedirect)
        return next(to.meta.auth.failureRedirect);
      // иначе отправить на главную
      else
        return next('/')
  }

  // авторизован
  // если указано перенаправление для авторизованных пользователей
  else if (to.meta.auth.successRedirect)
    return next(to.meta.auth.successRedirect)

  // иначе никак не вмешиваться в процесс
  next()
});

export default router
