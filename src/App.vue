<template>
  <div id="app">
    <div v-if="auth.state === 'authenticating'">Loading</div>
    <login-page v-else-if="auth.state == 'logged out'"></login-page>
    <layout v-else/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoginPage from '@/components/Page/LoginPage'
import Layout from '@/components/Page/Layout'
import Api from '@/api'

export default {
  name: 'App',
  components: {
    LoginPage,
    Layout
  },
  computed: {
    ...mapState(['auth'])
  },
  created () {
    Api.Account.Me()
      .then(response => {
        this.$store.commit('setUser', response.data.data)
        this.$store.commit('setAuthState', 'authenticated')
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.state === 'logged out') {
          this.$store.commit('setAuthState', 'logged out')
        }
      })
    Api.Open.AppInfo()
      .then(response => {
        this.$store.commit('setAppInfo', response.data.conductor_info)
      })
      .catch(err => { console.log(err) })
  }
}
</script>

<style>
@import url(./assets/styles/normalize.css);
@import url(./assets/styles/fonts.css);
@import url(./assets/styles/font-awesome.css);
@import url(./assets/styles/bootstrap-flatly.css);

body {
  font-family: Roboto, Ubuntu, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,h2,h3,h4,h5 {
  font-weight: normal;
}

.btn,h1,h2,h3,h4,h5 {
  text-transform: uppercase;
  font-family: Lato, Arial, Helvetica, sans-serif;
}

a {
  text-decoration: none !important;
  transition: 0.2s ease color;
  color: #1e5dc4;
}

a:hover {
  color: red;
}

.PageContent {
  display: flex;
}

.PageContentContainer {
  width: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}

.PageContentContainer--Half {
  width: 50%;
}

.PageContentContainer, table.ModelList {
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}

.PageMain {
  width: 100%;
  min-height: calc(100vh - 108px);
  background-color: #f0f0f0;
  overflow: auto;
  box-sizing: border-box;
}

.PageMain, .SelectPanel {
  padding: 20px;
}

.SelectPanel {
  width: 33%;
}

.ContentHeader {
  display: flex;
}

.ContentHeader_Title {
  margin: -2px 0 16px;
  font-size: 26px;
}

.ContentHeader_Buttons {
  margin: 0 20px;
  flex-grow: 1;
}

.ContentHeader_Buttons .btn {
  font-weight: bold;
}

table.ModelList {
  font-size: 0.80rem;
  width: 100%;
  border-collapse: collapse;
}

table.ModelList > thead > tr > th,
table.ModelList > tbody > tr > td {
  text-align: left;
  box-sizing: border-box;
  font-weight: normal;
  padding-left: 4px;
  padding-right: 4px;
}

table.ModelList > thead > tr > th {
  background: #444;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-bottom: 4px;
  color: white;
}

table.ModelList > thead > tr > th:first-child { border-top-left-radius: 4px; }
table.ModelList > thead > tr > th:last-child { border-top-right-radius: 4px; }
table.ModelList > tbody > tr > td {
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: hidden;
}

table.ModelList > tbody > tr:nth-child(even) > td { background-color: #f9f9f9; }
table.ModelList > tbody > tr:nth-child(odd) > td { background-color: #ffffff; }
table.ModelList > tbody > tr:hover > td { background-color: #f3f3fc; }

.ModelList_Select {
  width: 32px;
  text-align: center !important;
}

.Project::before, .Group::before, .Host::before {
  font-family: FontAwesome;
  padding-right: 0.2em;
  position: relative;
  top: 0.04em;
}

.Project::before {
  content: "\f0f2";
  top: 0;
}

.Group::before {
  content: "\f114";
}

.Host::before {
  content: "\f109";
}

.Card h3 {
  text-transform: none;
}

.CardHeader {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.Form_FieldLabel, .Card_FieldLabel {
  text-transform: uppercase;
  margin-bottom: 0;
  display: block;
  font-size: 80%;
}

.Form_Field, .Card_Field {
  text-align: left;
  margin-bottom: 16px;
}

.Form_Field--CFE .row {
  margin-bottom: 8px;
}

.Form_Field .btn {
  text-transform: uppercase;
  font-weight: bold;
}

.Card_TagList {
  display: flex;
  align-items: center;
}

.Card_TagList .Tag {
  margin-right: 4px;
}
</style>
