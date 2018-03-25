import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    alerts: [],
    auth: {
      state: 'authenticating',
      user: null,
      authUrl: null
    },
    appInfo: { },
    appInfoLoaded: false,
    selectMode: false
  },
  getters: {
    authState (state) {
      return state.auth.state
    },
    currentUser (state) {
      return state.auth.user
    }
  },
  mutations: {
    setAuthState (state, payload) {
      state.auth.state = payload
    },
    setUser (state, payload) {
      state.auth.user = payload
    },
    setAppInfo (state, info) {
      state.appInfo = info
      state.appInfoLoaded = true
    },
    setSelectMode (state, mode) {
      state.selectMode = mode
    }
  }
})
export default store
