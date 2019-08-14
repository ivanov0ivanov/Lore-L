import axios from 'axios'

const Api = {}
const api = ''

const username = 'apikey'
const password = '06ac71bad3feebb1d29d73f0821cc9d020c8075dd128f917e81dad78ef34fb69'

Api.install = (Vue) => {
  Vue.prototype.$api = {
    send: async (type, path, data, params) => {
      let headers = {
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      }
      let result = {}
      try {
        if (data) {
          result = await axios[type](api + path, data, { headers })
        } else {
          result = await axios[type](api + path, {headers, params})
        }
        if (result.status !== 200) {
          result = {'error': true}
        }
      } catch (err) {
        result = {
          'error': true,
          'message': err
        }
      }
      return result
    }
  }
}

export default Api
