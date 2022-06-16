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
    fileData ({ commit }) {

      console.log(commit)
    }
  }
}