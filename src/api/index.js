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
    }
  },
  Projects: {
    List: (page, filter, fields = DefaultFields.Projects.List, limit = null) => {
      let url = `/api/v1/projects/?_fields=${fields.join(',')}&_page=${page}&_filter=${filter}`
      if (limit) { url += `&_limit=${limit}` }
      return wrap(axios.get(url))
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
