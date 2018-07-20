import store from '@/store'

const ErrorHandler = err => {
  if (err.response) {
    if (err.response.status === 403) {
      if (err.response.data && err.response.data.state === 'logged out') {
        store.commit('setAuthState', 'login')
        store.commit('setUser', null)
        store.commit('setExtAuth', err.response.data)
      }
    } else if (err.response.status === 502 || err.response.status === 504) {
      store.dispatch(
        'error',
        `Gateway problems, unable to get data. Status code is ${
          err.response.status
        }`
      )
    } else if (err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach(item => {
        store.dispatch('error', item)
      })
    } else {
      console.log(err)
    }
    return err.response.status
  } else {
    console.log(err)
    return undefined
  }
}

export default ErrorHandler
