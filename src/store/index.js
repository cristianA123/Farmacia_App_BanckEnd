import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'

//Authenticate
import Authenticate from './authenticate/'
import Users from './users/'
import Credits from './credits/'
import Campaings from './campaings/'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    authenticate: Authenticate,
    users: Users,
    campaings: Campaings,
    credits: Credits
  }
})

export default store
