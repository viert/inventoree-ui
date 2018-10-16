<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">ServerGroup List</h2>
        <div class="ContentHeader_Buttons">
        </div>
        <filter-field :change="filterChanged" :value="filter" />
      </div>
      <item-list :count="items.length" :filter="filter">
        <table class="ModelList">
          <col class="col-name" />
          <col class="col-workgroup" />
          <col class="col-master" />
          <thead>
            <tr>
              <th>Name</th>
              <th>WorkGroup</th>
              <th>Master</th>
            </tr>
          </thead>
          <tbody>
            <server-group-list-item
              v-for="server_group in items"
              :server_group="server_group"
              :key="server_group._id" />
          </tbody>
        </table>
        <pagination
          :current="page"
          :total="totalPages"
          @page="pageChanged" />
      </item-list>
    </main>
  </div>
</template>

<script>
import FilteredDataMixin from '@/mixins/FilteredDataMixin'
import Pagination from '@/components/Common/Pagination'
import ServerGroupListItem from './ServerGroupListItem'
import Api from '@/api'

export default {
  data() {
    return {
      items: []
    }
  },
  components: {
    ServerGroupListItem,
    Pagination
  },
  mixins: [FilteredDataMixin],
  methods: {
    loadData() {
      return Api.ServerGroups.List(this.page, this.filter).then(response => {
        this.items = response.data.data
        this.page = response.data.page
        this.totalPages = response.data.total_pages
      })
    }
  }
}
</script>

<style scoped>
.col-workgroup {
  width: 13%;
}

.col-master {
  width: 5%;
}
</style>
