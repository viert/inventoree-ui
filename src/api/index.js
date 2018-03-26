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
  }
}

const Api = {
  Groups: {
    List: (page, filter, fields) => {
      if (!fields) { fields = DefaultFields.Groups.List }
      let url = `/api/v1/groups/?_fields=${fields.join(',')}&_page=${page}&_filter=${filter}`
      return wrap(axios.get(url))
    },
    Get: (groupName, fields) => {
      if (!fields) { fields = DefaultFields.Groups.Get }
      let url = `/api/v1/groups/${groupName}?_fields=${fields.join(',')}`
      return wrap(axios.get(url))
    }
  },
  Hosts: {
    List: (page, filter, fields) => {
      if (!fields) { fields = DefaultFields.Hosts.List }
      let url = `/api/v1/hosts/?_fields=${fields.join(',')}&_page=${page}&_filter=${filter}`
      return wrap(axios.get(url))
    }
  },
  Projects: {
    List: (page, filter, fields) => {
      if (!fields) { fields = DefaultFields.Projects.List }
      let url = `/api/v1/projects/?_fields=${fields.join(',')}&_page=${page}&_filter=${filter}`
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
