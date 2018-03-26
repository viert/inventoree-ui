import store from '@/store'

const ErrorHandler = err => {
  if (err.response) {
    if (err.response.status === 403) {
      if (err.response.data && err.response.data.state === 'logged out') {
        store.commit('setAuthState', 'login')
        store.commit('setUser', null)
        store.commit('setExtAuth', err.response.data)
      }
    } else if (err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach(item => {
        store.dispatch('error', item)
      })
    } else {
      console.log(err)
    }
  } else {
    console.log(err)
  }
}

export default ErrorHandler
