import Vue from 'vue'
import Router from 'vue-router'
import GroupList from '@/components/Groups/GroupList'
import GroupView from '@/components/Groups/GroupView'
import ProjectList from '@/components/Projects/ProjectList'
import HostList from '@/components/Hosts/HostList'
import HostView from '@/components/Hosts/HostView'
import HostEdit from '@/components/Hosts/HostEdit'

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
      path: '/hosts',
      name: 'host_list',
      component: HostList
    },
    {
      path: '/hosts/:hostName',
      name: 'host_view',
      component: HostView
    },
    {
      path: '/hosts/++/edit',
      name: 'host_create',
      component: HostEdit,
      props: {
        clone: false,
        create: true
      }
    },
    {
      path: '/hosts/:hostName/edit',
      name: 'host_edit',
      component: HostEdit,
      props: {
        clone: false,
        create: false
      }
    },
    {
      path: '/hosts/:hostName/clone',
      name: 'host_clone',
      component: HostEdit,
      props: {
        clone: true,
        create: false
      }
    },
    {
      path: '*',
      redirect: '/groups'
    }
  ]
})
