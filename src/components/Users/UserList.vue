<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">User List</h2>
        <div class="ContentHeader_Buttons">
          <router-link to="/users/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> Create
          </router-link>
        </div>
        <filter-field :change="filterChanged" :value="filter"/>
      </div>
      <item-list :count="items.length" :filter="filter">
        <table class="ModelList">
          <col class="col-username">
          <col class="col-fullname">
          <col class="col-email">
          <col class="col-supervisor">
          <col class="col-system">
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Supervisor</th>
              <th>System</th>
            </tr>
          </thead>
          <tbody>
            <user-list-item v-for="user in items" :user="user" :key="user._id"/>
          </tbody>
        </table>
        <pagination :current="page" :total="totalPages" @page="pageChanged"/>
      </item-list>
    </main>
  </div>
</template>

<script>
import FilteredDataMixin from '@/mixins/FilteredDataMixin'
import Pagination from '@/components/Common/Pagination'
import UserListItem from './UserListItem'
import Api from '@/api'

export default {
  data() {
    return {
      items: []
    }
  },
  components: {
    UserListItem,
    Pagination
  },
  mixins: [FilteredDataMixin],
  methods: {
    loadData() {
      return Api.Users.List(this.page, this.filter)
        .then(this.fixPage)
        .then(response => {
          this.items = response.data.data
        })
        .catch(e => {
          if (e && e.message !== 'page_change') {
            return Promise.reject(e)
          }
        })
    }
  }
}
</script>

<style scoped>
.col-supervisor,
.col-system {
  width: 5%;
}
.col-username {
  width: 13%;
}
</style>
