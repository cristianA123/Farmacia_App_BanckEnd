import store from '../../store'
import BackendApi from '@/services/backend.service'

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

      BackendApi.get('/availablecredit').then((response) => {
        
        const { availableCredit } = response.data.data

        store.commit('setAvailableCredits', availableCredit)
        store.commit('setLoading', false)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}