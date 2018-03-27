import Vue from 'vue'
import Router from 'vue-router'
import GroupList from '@/components/Groups/GroupList'
import GroupView from '@/components/Groups/GroupView'
import ProjectList from '@/components/Projects/ProjectList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/groups',
      name: 'group_list',
      component: GroupList
    },
    {
      path: '/groups/:groupName',
      name: 'group_view',
      component: GroupView
    },
    {
      path: '/projects',
      name: 'project_list',
      component: ProjectList
    },
    {
      path: '*',
      redirect: '/groups'
    }
  ]
})
