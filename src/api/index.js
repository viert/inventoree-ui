import axios from 'axios'
import store from '@/store'
import ErrorHandler from '@/errors/ErrorHandler'

const wrap = (axiosRequest) => {
  let reqId = new Date() / 1
  store.commit('addLoadRequest', { id: reqId, req: axiosRequest })
  return axiosRequest.catch(ErrorHandler).finally(() => { store.commit('removeLoadRequest', reqId) })
}

export const DefaultFields = {
  Groups: {
    List: [
      '_id',
      'name',
      'project_name',
      'custom_fields',
      'tags',
      'all_tags',
      'all_custom_fields',
      'description'
    ],
    Get: [
      '_id',
      'name',
      'project_name',
      'custom_fields',
      'tags',
      'all_tags',
      'all_custom_fields',
      'description',
      'children',
      'modification_allowed',
      'hosts'
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
      'group_name'
    ],
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
      'group_name'
    ]
  },
  Projects: {
    List: [
      '_id',
      'name',
      'owner',
      'email',
      'root_email',
      'description'
    ],
    Get: [
      '_id',
      'name',
      'owner',
      'email',
      'root_email',
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
      'supervisor'
    ],
    Get: [
      '_id',
      'username',
      'first_name',
      'last_name',
      'email',
      'supervisor',
      'modification_allowed',
      'projects_owned',
      'projects_included_into'
    ]
  },
  Datacenters: {
    List: [
      '_id',
      'name'
    ]
  }
}

const Api = {
  Groups: {
    List: (page, filter, fields = DefaultFields.Groups.List, limit = null) => {
      let url = `/api/v1/groups/?_fields=${fields.join(',')}&_page=${page}&_filter=${filter}`
      if (limit) { url += `&_limit=${limit}` }
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
      let url = `/api/v1/groups/${groupName}/set_children?_fields=${fields.join(',')}`
      let payload = { child_ids: childIds }
      return wrap(axios.put(url, payload))
    },
    SetHosts: (groupName, hostIds, fields = DefaultFields.Groups.Get) => {
      let url = `/api/v1/groups/${groupName}/set_hosts?_fields=${fields.join(',')}`
      let payload = { host_ids: hostIds }
      return wrap(axios.put(url, payload))
    },
    Delete: (groupName) => {
      let url = `/api/v1/groups/${groupName}`
      return wrap(axios.delete(url))
    }
  },
  Hosts: {
    List: (page, filter, fields = DefaultFields.Hosts.List, limit = null) => {
      let url = `/api/v1/hosts/?_fields=${fields.join(',')}&_page=${page}&_filter=${filter}`
      if (limit) { url += `&_limit=${limit}` }
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
    Create: (payload) => {
      let url = '/api/v1/hosts/'
      return wrap(axios.post(url, payload))
    },
    Delete: (hostName) => {
      let url = `/api/v1/hosts/${hostName}`
      return wrap(axios.delete(url))
    },
    MassDelete: (hostIds) => {
      let payload = { host_ids: hostIds }
      let url = '/api/v1/hosts/mass_delete'
      return wrap(axios.post(url, payload))
    },
    MassMove: (hostIds, groupId) => {
      let payload = { host_ids: hostIds, group_id: groupId }
      let url = '/api/v1/hosts/mass_move'
      return wrap(axios.post(url, payload))
    }
  },
  Projects: {
    List: (page, filter, fields = DefaultFields.Projects.List, limit = null) => {
      let url = `/api/v1/projects/?_fields=${fields.join(',')}&_page=${page}&_filter=${filter}`
      if (limit) { url += `&_limit=${limit}` }
      return wrap(axios.get(url))
    },
    Get: (projectName, fields = DefaultFields.Projects.Get) => {
      let url = `/api/v1/projects/${projectName}?_fields=${fields.join(',')}`
      return wrap(axios.get(url))
    },
    Update: (projectName, payload, fields = DefaultFields.Projects.Get) => {
      let url = `/api/v1/projects/${projectName}?_fields=${fields.join(',')}`
      return wrap(axios.put(url, payload))
    },
    Create: (payload, fields = DefaultFields.Projects.Get) => {
      let url = `/api/v1/projects/?_fields=${fields.join(',')}`
      return wrap(axios.post(url, payload))
    },
    SetMembers: (projectName, memberIds, fields = DefaultFields.Projects.Get) => {
      let url = `/api/v1/projects/${projectName}/set_members?_fields=${fields.join(',')}`
      return wrap(axios.post(url, { member_ids: memberIds }))
    },
    Delete: (projectName) => {
      let url = `/api/v1/projects/${projectName}`
      return wrap(axios.delete(url))
    },
    ChangeOwner: (projectName, ownerId) => {
      let url = `/api/v1/projects/${projectName}/switch_owner`
      return wrap(axios.post(url, { owner_id: ownerId }))
    }
  },
  Users: {
    List: (page, filter, fields = DefaultFields.Users.List, limit = null) => {
      let url = `/api/v1/users/?_fields=${fields.join(',')}&_page=${page}&_filter=${filter}`
      if (limit) { url += `&_limit=${limit}` }
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
    Delete: (userName) => {
      let url = `/api/v1/users/${userName}`
      return wrap(axios.delete(url))
    },
    ChangePassword: (userName, newPassword, confirmPassword) => {
      let url = `/api/v1/users/${userName}/set_password`
      let payload = { password: newPassword, confirm_password: confirmPassword }
      return wrap(axios.put(url, payload))
    },
    SetSupervisor: (userName, supervisor) => {
      let url = `/api/v1/users/${userName}/set_supervisor`
      let payload = { supervisor }
      return wrap(axios.put(url, payload))
    }
  },
  Datacenters: {
    List: (page, filter, fields = DefaultFields.Datacenters.List, limit = null) => {
      let url = `/api/v1/datacenters/?_fields=${fields.join(',')}&_page=${page}&_filter=${filter}`
      if (limit) { url += `&_limit=${limit}` }
      return wrap(axios.get(url))
    }
  },
  Account: {
    Me: () => {
      return wrap(axios.get('/api/v1/account/me'))
    }
  },
  Open: {
    AppInfo: () => {
      return wrap(axios.get('/api/v1/open/app'))
    }
  }
}

export default Api
