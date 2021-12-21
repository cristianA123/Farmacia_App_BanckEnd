import axios from 'axios'
import store from '../../store'

export default {
  state: {
    availableCredits: 0,
    isLoading: false
  },
  getters: {
  },
  mutations: {
    setAvailableCredits(state, payload) {
      state.availableCredits = payload
    },
    setLoading(state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    availableCredits ({ commit }) {

      store.commit('setLoading', true)

      axios.get('/creditAvailable', { headers: { Authorization: 'Bearer ' + window.localStorage.token } }).then((response) => {
        
        const { creditAvailable } = response.data.data

        store.commit('setAvailableCredits', creditAvailable)
        store.commit('setLoading', false)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}