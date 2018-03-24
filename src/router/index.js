import Vue from 'vue'
import Router from 'vue-router'
import GroupList from '@/components/Groups/GroupList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/groups',
      name: 'group_list',
      component: GroupList
    },
    {
      path: '*',
      redirect: '/groups'
    }
  ]
})
