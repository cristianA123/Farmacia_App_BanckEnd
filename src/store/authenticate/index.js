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
          $cookies.set('user', response.data.data.user)
          $cookies.set('token', response.data.data.access_token)
          $cookies.set('services', response.data.data.services)
          store.commit('setErrorMessages', null)
          router.push({ path:'/' })
        } else {
          commit('setLoadingAuth', false)
          store.commit('setUser', null)
          store.commit('setErrorMessages', response.data.message)
        }
      }).catch((error) => {
        store.commit('setErrorMessages', error.response.data.message)
        commit('setLoadingAuth', false)
      })
    },
    logout() {
      $cookies.remove('user')
      $cookies.remove('token')
      $cookies.remove('services')
      router.push({ name: 'auth-signin' })
    }
  }
}