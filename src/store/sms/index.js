import store from '../../store'

export default {
  state: {
    file: null,
    name: null
  },
  getters: {
  },
  mutations: {
    setFile(state, payload) {
      state.file = payload
    },
    setName(state, payload) {
      state.name = payload
    }
  },
  actions: {
    fileData ({ commit }, data) {
      commit('setFile', data)
    },
    name ({ commit }, data) {
      commit('setName', data)
    }
  }
}