/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

 // Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
// import actions from './actions'
// import getters from './getters'
// import mutations from './mutations'
// import state from './state'

import auth from './modules/auth'
import user from './modules/user'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
// Create a new store
const store = new Vuex.Store({
  modules: {
    auth,
    user,
    settings
  },
  strict: debug
  // state,
  // actions,
  // getters,
  // mutations
})

export default store
