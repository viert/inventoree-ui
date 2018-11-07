// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Group from '@/components/Groups/Group'
import Host from '@/components/Hosts/Host'
import WorkGroup from '@/components/WorkGroups/WorkGroup'
import User from '@/components/Users/User'
import Datacenter from '@/components/Datacenters/Datacenter'
import NetworkGroup from '@/components/NetworkGroups/NetworkGroup'
import FilterField from '@/components/Common/FilterField'
import ConfirmButton from '@/components/Common/ConfirmButton'
import ItemList from '@/components/Common/ItemList'

Vue.component('group', Group)
Vue.component('work-group', WorkGroup)
Vue.component('host', Host)
Vue.component('user', User)
Vue.component('datacenter', Datacenter)
Vue.component('network-group', NetworkGroup)
Vue.component('filter-field', FilterField)
Vue.component('confirm-button', ConfirmButton)
Vue.component('item-list', ItemList)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
