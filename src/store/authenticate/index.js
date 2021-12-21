import axios from 'axios'
import store from '../../store'
import router from '../../router'

export default {
  state: {
    loadingAuth: false,
    errorMessages: null
  },
  getters: {
    loading: (state) => state.loadingAuth,
    errorMessages: (state) => state.errorMessages
  },
  mutations: {
    setLoadingAuth(state, payload) {
      state.loadingAuth = payload
    },
    setErrorMessages(state, payload) {
      state.errorMessages = payload
    }
  },
  actions: {
    login ({ commit }, user) {
      commit('setLoadingAuth', true)
      axios.post('/login', {
        email: user.email,
        password: user.password
      }).then((response) => {
        if (response.data.success) {
          localStorage.setItem('token', response.data.data.token)
          store.commit('setErrorMessages', null)
          router.push({ path:'/' })
        } else {
          commit('setLoadingAuth', false)
          localStorage.removeItem('token')
          store.commit('setUser', null)
          store.commit('setErrorMessages', response.data.message)
        }
      }).catch((error) => {
        store.commit('setErrorMessages', 'Error, no podemos conectarnos al servidor.')
        commit('setLoadingAuth', false)
        console.log(error)
      })
    },
    logout() {
      localStorage.removeItem('token')
      router.push({ name: 'auth-signin' })
    }
  }
}