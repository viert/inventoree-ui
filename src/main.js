// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Group from '@/components/Groups/Group'
import Host from '@/components/Hosts/Host'
import Project from '@/components/Projects/Project'

Vue.component('group', Group)
Vue.component('project', Project)
Vue.component('host', Host)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
