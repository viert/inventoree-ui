import Vue from 'vue'
import Router from 'vue-router'
import GroupList from '@/components/Groups/GroupList'
import GroupView from '@/components/Groups/GroupView'
import ProjectList from '@/components/Projects/ProjectList'
import ProjectView from '@/components/Projects/ProjectView'
import ProjectEdit from '@/components/Projects/ProjectEdit'
import UserList from '@/components/Users/UserList'
import UserView from '@/components/Users/UserView'
import HostList from '@/components/Hosts/HostList'
import HostView from '@/components/Hosts/HostView'
import HostEdit from '@/components/Hosts/HostEdit'
import GroupEdit from '@/components/Groups/GroupEdit'

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
      path: '/groups/++/edit',
      name: 'group_create',
      component: GroupEdit,
      props: {
        clone: false,
        create: true
      }
    },
    {
      path: '/groups/:groupName/edit',
      name: 'group_edit',
      component: GroupEdit,
      props: {
        clone: false,
        create: false
      }
    },
    {
      path: '/groups/:groupName/clone',
      name: 'group_clone',
      component: GroupEdit,
      props: {
        clone: true,
        create: false
      }
    },
    {
      path: '/projects',
      name: 'project_list',
      component: ProjectList
    },
    {
      path: '/projects/:projectName',
      name: 'project_view',
      component: ProjectView
    },
    {
      path: '/projects/++/edit',
      name: 'project_create',
      component: ProjectEdit,
      props: {
        create: true
      }
    },
    {
      path: '/projects/:projectName/edit',
      name: 'project_edit',
      component: ProjectEdit,
      props: {
        create: false
      }
    },
    {
      path: '/users',
      name: 'user_list',
      component: UserList
    },
    {
      path: '/users/:userName',
      name: 'user_view',
      component: UserView
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
