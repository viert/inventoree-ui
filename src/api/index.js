import axios from 'axios'
import store from '@/store'
import ErrorHandler from '@/errors/ErrorHandler'

const wrap = axiosRequest => {
  let reqId = new Date() / 1
  store.commit('addLoadRequest', { id: reqId, req: axiosRequest })
  return new Promise((resolve, reject) => {
    axiosRequest
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(ErrorHandler(err))
      })
      .finally(() => {
        store.commit('removeLoadRequest', reqId)
      })
  })
}

export const DefaultFields = {
  Groups: {
    List: [
      '_id',
      'name',
      'work_group_name',
      'custom_fields',
      'tags',
      'all_tags',
      'all_custom_fields',
      'description'
    ],
    Get: [
      '_id',
      'name',
      'work_group_name',
      'custom_fields',
      'tags',
      'all_tags',
      'custom_data',
      'description',
      'children',
      'parents',
      'modification_allowed'
    ]
  },
  Hosts: {
    List: [
      '_id',
      'fqdn',
      'datacenter_name',
      'custom_fields',
      'tags',
      'all_tags',
      'all_custom_fields',
      'description',
      'group_name',
      'network_group_name'
    ],
    ListByGroupId: ['_id', 'fqdn'],
    Get: [
      '_id',
      'fqdn',
      'datacenter_name',
      'custom_fields',
      'tags',
      'all_tags',
      'all_custom_fields',
      'modification_allowed',
      'description',
      'group_name',
      'aliases',
      'network_group_name'
    ]
  },
  WorkGroups: {
    List: ['_id', 'name', 'owner', 'email', 'description'],
    Get: [
      '_id',
      'name',
      'owner',
      'email',
      'description',
      'modification_allowed',
      'groups_count',
      'members'
    ]
  },
  Users: {
    List: [
      '_id',
      'username',
      'first_name',
      'last_name',
      'email',
      'supervisor',
      'system'
    ],
    Get: [
      '_id',
      'username',
      'first_name',
      'last_name',
      'email',
      'supervisor',
      'system',
      'auth_token',
      'modification_allowed',
      'work_groups_owned',
      'work_groups_included_into'
    ]
  },
  Datacenters: {
    List: ['_id', 'name', 'parent_id'],
    Get: ['_id', 'name', 'description', 'parent', 'root', 'children']
  },
  Actions: {
    List: [
      '_id',
      'action_type',
      'computed',
      'params',
      'username',
      'created_at',
      'status'
    ],
    Get: [
      '_id',
      'action_type',
      'computed',
      'params',
      'username',
      'created_at',
      'status',
      'errors'
    ]
  },
  NetworkGroups: {
    List: ['_id', 'name', 'work_group_name', 'is_master'],
    Get: [
      '_id',
      'name',
      'work_group_name',
      'is_master',
      'modification_allowed',
      'assigning_allowed',
      'hosts_count'
    ]
  }
}

const Api = {
  Groups: {
    List: (page, filter, fields = DefaultFields.Groups.List, limit = null) => {
      let url = `/api/v1/groups/?_fields=${fields.join(
        ','
      )}&_page=${page}&_filter=${filter}`
      if (limit) {
        url += `&_limit=${limit}`
      }
      return wrap(axios.get(url))
    },
    Get: (groupName, fields = DefaultFields.Groups.Get) => {
      let url = `/api/v1/groups/${groupName}?_fields=${fields.join(',')}`
      return wrap(axios.get(url))
    },
    Create: (payload, fields = DefaultFields.Groups.Get) => {
      let url = `/api/v1/groups/?_fields=${fields.join(',')}`
      return wrap(axios.post(url, payload))
    },
    Update: (groupName, payload, fields = DefaultFields.Groups.Get) => {
      let url = `/api/v1/groups/${groupName}?_fields=${fields.join(',')}`
      return wrap(axios.put(url, payload))
    },
    SetChildren: (groupName, childIds, fields = DefaultFields.Groups.Get) => {
      let url = `/api/v1/groups/${groupName}/set_children?_fields=${fields.join(
        ','
      )}`
      let payload = { child_ids: childIds }
      return wrap(axios.put(url, payload))
    },
    SetHosts: (groupName, hostIds, fields = DefaultFields.Groups.Get) => {
      let url = `/api/v1/groups/${groupName}/set_hosts?_fields=${fields.join(
        ','
      )}`
      let payload = { host_ids: hostIds }
      return wrap(axios.put(url, payload))
    },
    Delete: groupName => {
      let url = `/api/v1/groups/${groupName}`
      return wrap(axios.delete(url))
    },
    MassMove: (groupIds, workGroupId) => {
      let payload = { group_ids: groupIds, work_group_id: workGroupId }
      let url = '/api/v1/groups/mass_move'
      return wrap(axios.post(url, payload))
    },
    MassDelete: groupIds => {
      let payload = { group_ids: groupIds }
      let url = '/api/v1/groups/mass_delete'
      return wrap(axios.post(url, payload))
    }
  },
  NetworkGroups: {
    List: (
      page,
      filter,
      fields = DefaultFields.NetworkGroups.List,
      limit = null
    ) => {
      let url = `/api/v1/network_groups/?_fields=${fields.join(
        ','
      )}&_page=${page}&_filter=${filter}`
      if (limit) {
        url += `&limit=${limit}`
      }
      return wrap(axios.get(url))
    },
    Get: (groupName, fields = DefaultFields.NetworkGroups.Get) => {
      const url = `/api/v1/network_groups/${groupName}?_fields=${fields.join(
        ','
      )}`
      return wrap(axios.get(url))
    }
  },
  Hosts: {
    List: (page, filter, fields = DefaultFields.Hosts.List, limit = null) => {
      let url = `/api/v1/hosts/?_fields=${fields.join(
        ','
      )}&_page=${page}&_filter=${filter}`
      if (limit) {
        url += `&_limit=${limit}`
      }
      return wrap(axios.get(url))
    },
    ListByGroupId: (
      groupId,
      page,
      fields = DefaultFields.Hosts.List,
      limit = 40
    ) => {
      let url = `/api/v1/hosts/?group_id=${groupId}&_fields=${fields.join(
        ','
      )}&_page=${page}`
      if (limit) {
        url += `&_limit=${limit}`
      }
      return wrap(axios.get(url))
    },
    Get: (hostName, fields = DefaultFields.Hosts.Get) => {
      let url = `/api/v1/hosts/${hostName}?_fields=${fields.join(',')}`
      return wrap(axios.get(url))
    },
    Update: (hostName, payload) => {
      let url = `/api/v1/hosts/${hostName}`
      return wrap(axios.put(url, payload))
    },
    Create: payload => {
      let url = '/api/v1/hosts/'
      return wrap(axios.post(url, payload))
    },
    Delete: hostName => {
      let url = `/api/v1/hosts/${hostName}`
      return wrap(axios.delete(url))
    },
    MassDelete: hostIds => {
      let payload = { host_ids: hostIds }
      let url = '/api/v1/hosts/mass_delete'
      return wrap(axios.post(url, payload))
    },
    MassMove: (hostIds, groupId) => {
      let payload = { host_ids: hostIds, group_id: groupId }
      let url = '/api/v1/hosts/mass_move'
      return wrap(axios.post(url, payload))
    },
    MassSetDatacenter: (hostIds, datacenterId) => {
      let payload = { host_ids: hostIds, datacenter_id: datacenterId }
      let url = '/api/v1/hosts/mass_set_datacenter'
      return wrap(axios.post(url, payload))
    }
  },
  WorkGroups: {
    List: (
      page,
      filter,
      fields = DefaultFields.WorkGroups.List,
      limit = null
    ) => {
      let url = `/api/v1/work_groups/?_fields=${fields.join(
        ','
      )}&_page=${page}&_filter=${filter}`
      if (limit) {
        url += `&_limit=${limit}`
      }
      return wrap(axios.get(url))
    },
    Get: (workGroupName, fields = DefaultFields.WorkGroups.Get) => {
      let url = `/api/v1/work_groups/${workGroupName}?_fields=${fields.join(
        ','
      )}`
      return wrap(axios.get(url))
    },
    Update: (workGroupName, payload, fields = DefaultFields.WorkGroups.Get) => {
      let url = `/api/v1/work_groups/${workGroupName}?_fields=${fields.join(
        ','
      )}`
      return wrap(axios.put(url, payload))
    },
    Create: (payload, fields = DefaultFields.WorkGroups.Get) => {
      let url = `/api/v1/work_groups/?_fields=${fields.join(',')}`
      return wrap(axios.post(url, payload))
    },
    SetMembers: (
      workGroupName,
      memberIds,
      fields = DefaultFields.WorkGroups.Get
    ) => {
      let url = `/api/v1/work_groups/${workGroupName}/set_members?_fields=${fields.join(
        ','
      )}`
      return wrap(axios.post(url, { member_ids: memberIds }))
    },
    Delete: workGroupName => {
      let url = `/api/v1/work_groups/${workGroupName}`
      return wrap(axios.delete(url))
    },
    ChangeOwner: (workGroupName, ownerId) => {
      let url = `/api/v1/work_groups/${workGroupName}/switch_owner`
      return wrap(axios.post(url, { owner_id: ownerId }))
    }
  },
  Users: {
    List: (page, filter, fields = DefaultFields.Users.List, limit = null) => {
      let url = `/api/v1/users/?_fields=${fields.join(
        ','
      )}&_page=${page}&_filter=${filter}`
      if (limit) {
        url += `&_limit=${limit}`
      }
      return wrap(axios.get(url))
    },
    Get: (userName, fields = DefaultFields.Users.Get) => {
      let url = `/api/v1/users/${userName}?_fields=${fields.join(',')}`
      return wrap(axios.get(url))
    },
    Update: (userName, payload, fields = DefaultFields.Users.Get) => {
      let url = `/api/v1/users/${userName}?_fields=${fields.join(',')}`
      return wrap(axios.put(url, payload))
    },
    Create: (payload, fields = DefaultFields.Users.Get) => {
      let url = '/api/v1/users/'
      return wrap(axios.post(url, payload))
    },
    Delete: userName => {
      let url = `/api/v1/users/${userName}`
      return wrap(axios.delete(url))
    },
    ChangePassword: (userName, newPassword, confirmPassword) => {
      let url = `/api/v1/users/${userName}/set_password`
      let payload = {
        password_raw: newPassword,
        password_raw_confirm: confirmPassword
      }
      return wrap(axios.put(url, payload))
    },
    SetSupervisor: (userName, supervisor) => {
      let url = `/api/v1/users/${userName}/set_supervisor`
      let payload = { supervisor }
      return wrap(axios.put(url, payload))
    },
    SetSystem: (userName, system) => {
      let url = `/api/v1/users/${userName}/set_system`
      let payload = { system }
      return wrap(axios.put(url, payload))
    }
  },
  Datacenters: {
    List: (
      page,
      filter,
      fields = DefaultFields.Datacenters.List,
      limit = null
    ) => {
      let url = `/api/v1/datacenters/?_fields=${fields.join(
        ','
      )}&_page=${page}&_filter=${filter}`
      if (limit) {
        url += `&_limit=${limit}`
      }
      return wrap(axios.get(url))
    },
    FullList: () => {
      return wrap(axios.get('/api/v1/datacenters/?_nopaging=true'))
    },
    Get: (dcName, fields = DefaultFields.Datacenters.Get) => {
      let url = `/api/v1/datacenters/${dcName}?_fields=${fields.join(',')}`
      return wrap(axios.get(url))
    },
    Create: (payload, fields = DefaultFields.Datacenters.Get) => {
      let url = `/api/v1/datacenters/?_fields=${fields.join(',')}`
      return wrap(axios.post(url, payload))
    },
    Update: (dcName, payload, fields = DefaultFields.Datacenters.Get) => {
      let url = `/api/v1/datacenters/${dcName}?_fields=${fields.join(',')}`
      return wrap(axios.put(url, payload))
    },
    Delete: dcName => {
      let url = `/api/v1/datacenters/${dcName}`
      return wrap(axios.delete(url))
    }
  },
  Account: {
    Me: () => {
      return wrap(axios.get('/api/v1/account/me'))
    },
    Logout: () => {
      return wrap(axios.post('/api/v1/account/logout'))
    },
    Authenticate: (username, password) => {
      return wrap(
        axios.post('/api/v1/account/authenticate', { username, password })
      )
    }
  },
  Open: {
    AppInfo: () => {
      return wrap(axios.get('/api/v1/open/app'))
    }
  },
  Actions: {
    List: (
      page,
      actionTypes = [],
      fields = DefaultFields.Actions.List,
      limit = null
    ) => {
      let url = `/api/v1/actions/?_page=${page}&_fields=${fields.join(',')}`
      if (actionTypes && actionTypes.length > 0) {
        url += `&_action_types=${actionTypes.join(',')}`
      }
      if (limit) {
        url += `&_limit=${limit}`
      }
      return wrap(axios.get(url))
    },
    Get: (actionId, fields = DefaultFields.Actions.Get) => {
      let url = `/api/v1/actions/${actionId}?_fields=${fields.join(',')}`
      return wrap(axios.get(url))
    },
    ActionTypes: () => {
      return wrap(axios.get('/api/v1/actions/action_types'))
    }
  }
}

export default Api
