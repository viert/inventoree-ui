<template>
  <div class="Login">
    <h2 class="Login_Brand">Conductor</h2>
    <form @submit.prevent="authenticate" class="LoginForm">
      <div class="LoginForm_Field">
        <label for="login">Login</label>
        <input v-model="username" class="form-control" type="text" placeholder="Login" />
      </div>
      <div class="LoginForm_Field">
        <label for="login">Password</label>
        <input v-model="password" class="form-control" type="password" placeholder="Password" />
      </div>
      <div class="LoginForm_Buttons">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
    <div class="LoginForm LoginForm-Alternative">
      <div class="LoginForm_Buttons">
        <button class="btn btn-secondary">Login via Sys.Mail.Ru</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    authenticate () {
      let { username, password } = this
      axios.post('/api/v1/account/authenticate', { username, password })
        .then(response => {
          this.$store.commit('setAuthState', 'authenticated')
        })
        .catch(err => { console.log(err) })
    }
  }

}
</script>

<style>
.Login {
  margin: calc(50vh - 160px) auto 0;
  width: 400px;
  text-align: center;
}

.Login_Brand {
  font-family: Lato, Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  font-size: 32px;
  font-weight: bold;
  color: #1e5d94;
}

.LoginForm {
  margin: 0 auto;
  width: 300px;
}

.LoginForm label {
  text-transform: uppercase;
  margin-bottom: 0;
}

.LoginForm_Buttons,
.LoginForm_Field {
  margin-bottom: 20px;
}

.LoginForm_Field {
  text-align: left;
  margin-bottom: 10px;
}

.LoginForm_Field:nth-child(2) {
  margin-bottom: 20px;
}

.LoginForm_Buttons .btn {
  text-transform: uppercase;
  font-weight: bold;
}

.LoginForm-Alternative {
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #ddd;
}
</style>
