import Vue from 'vue'
import Router from 'vue-router'
import GroupList from '@/components/Groups/GroupList'
import GroupView from '@/components/Groups/GroupView'
import GroupEdit from '@/components/Groups/GroupEdit'
import DatacenterList from '@/components/Datacenters/DatacenterList'
import DatacenterView from '@/components/Datacenters/DatacenterView'
import DatacenterEdit from '@/components/Datacenters/DatacenterEdit'
import UserList from '@/components/Users/UserList'
import UserView from '@/components/Users/UserView'
import UserEdit from '@/components/Users/UserEdit'
import HostList from '@/components/Hosts/HostList'
import HostView from '@/components/Hosts/HostView'
import HostEdit from '@/components/Hosts/HostEdit'
import WorkGroupList from '@/components/WorkGroups/WorkGroupList'
import WorkGroupView from '@/components/WorkGroups/WorkGroupView'
import WorkGroupEdit from '@/components/WorkGroups/WorkGroupEdit'
import NetworkGroupList from '@/components/NetworkGroups/NetworkGroupList'
import NetworkGroupView from '@/components/NetworkGroups/NetworkGroupView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/network_groups',
      name: 'network_group_list',
      component: NetworkGroupList
    },
    {
      path: '/network_groups/:networkGroupName',
      name: 'network_group_view',
      component: NetworkGroupView
    },
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
      path: '/datacenters',
      name: 'datacenter_list',
      component: DatacenterList
    },
    {
      path: '/datacenters/:datacenterName',
      name: 'datacenter_view',
      component: DatacenterView
    },
    {
      path: '/datacenters/++/edit',
      name: 'datacenter_create',
      component: DatacenterEdit,
      props: {
        create: true,
        clone: false
      }
    },
    {
      path: '/datacenters/:datacenterName/edit',
      name: 'datacenter_edit',
      component: DatacenterEdit,
      props: {
        create: false,
        clone: false
      }
    },
    {
      path: '/datacenters/:datacenterName/clone',
      name: 'datacenter_clone',
      component: DatacenterEdit,
      props: {
        create: false,
        clone: true
      }
    },
    {
      path: '/work_groups',
      name: 'work_group_list',
      component: WorkGroupList
    },
    {
      path: '/work_groups/:workGroupName',
      name: 'work_group_view',
      component: WorkGroupView
    },
    {
      path: '/work_groups/++/edit',
      name: 'work_group_create',
      component: WorkGroupEdit,
      props: {
        create: true
      }
    },
    {
      path: '/work_groups/:workGroupName/edit',
      name: 'work_group_edit',
      component: WorkGroupEdit,
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
      path: '/users/++/edit',
      name: 'user_create',
      component: UserEdit,
      props: {
        create: true
      }
    },
    {
      path: '/users/:userName/edit',
      name: 'user_edit',
      component: UserEdit,
      props: {
        create: false
      }
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
