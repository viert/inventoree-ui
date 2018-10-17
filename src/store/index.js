import Api from '@/api'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const DEFAULT_ALERT_TTL = 5000

const store = new Vuex.Store({
  state: {
    messages: [],
    loadRequests: [],
    auth: {
      state: 'authenticating',
      user: {},
      authUrl: null,
      authText: null
    },
    appInfo: {},
    appInfoLoaded: false,
    selectMode: false
  },
  getters: {
    authState(state) {
      return state.auth.state
    },
    currentUser(state) {
      return state.auth.user
    },
    isLoading(state) {
      return state.loadRequests.length > 0
    },
    extAuth(state) {
      let { authUrl, authText } = state.auth
      return { authUrl, authText }
    }
  },
  mutations: {
    addLoadRequest(state, rq) {
      state.loadRequests.push(rq)
    },
    removeLoadRequest(state, rqId) {
      state.loadRequests = state.loadRequests.filter(item => item.id !== rqId)
    },
    setAuthState(state, payload) {
      state.auth.state = payload
    },
    setUser(state, payload) {
      state.auth.user = payload
    },
    setExtAuth(state, payload) {
      state.auth.authUrl = payload.auth_url
      state.auth.authText = payload.auth_text
    },
    setAppInfo(state, info) {
      state.appInfo = info
      state.appInfoLoaded = true
    },
    setSelectMode(state, mode) {
      state.selectMode = mode
    },
    pushMessage(state, msg) {
      state.messages.push(msg)
    },
    popMessage(state, msgId) {
      state.messages = state.messages.filter(item => item.id !== msgId)
    }
  },
  actions: {
    message(context, msg) {
      if (!msg.id) {
        msg.id = new Date() / 1
      }
      if (!msg.timeout) {
        msg.timeout = DEFAULT_ALERT_TTL
      }
      if (!msg.type) {
        msg.type = 'alert'
      }
      msg.tm = setTimeout(() => {
        context.commit('popMessage', msg.id)
      }, msg.timeout)
      context.commit('pushMessage', msg)
    },
    removeMessage(context, msgId) {
      let msg = context.state.messages.find(item => item.id === msgId)
      if (!msg) {
        return
      }
      clearTimeout(msg.tm)
      context.commit('popMessage', msgId)
    },
    alert(context, text) {
      context.dispatch('message', { type: 'alert', text })
    },
    error(context, text) {
      context.dispatch('message', { type: 'alert', prefix: 'Error:', text })
    },
    info(context, text) {
      context.dispatch('message', { type: 'info', text })
    },
    warning(context, text) {
      context.dispatch('message', { type: 'warning', text })
    },
    success(context, text) {
      context.dispatch('message', { type: 'success', text })
    },
    loadAuthData(context) {
      Api.Account.Me().then(response => {
        if (response) {
          context.commit('setUser', response.data.data)
          context.commit('setAuthState', 'authenticated')
        }
      })
    }
  }
})
window.store = store
export default store
