export default {
  namespaced: true,
  state: {
    show: false,
    message: ''
  },
  getters: {
    getAlert(state) {
      return state
    }
  },
  mutations: {
    setAlert (state, message, time = 3000) {
      if (state.show) {
        state.show = false
      }
      state.message = message
      state.show = true
      setTimeout(() => {
        state.show = false
      }, time)
    }
  },
  actions: {},
}
