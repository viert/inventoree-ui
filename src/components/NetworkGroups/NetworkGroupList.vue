<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Network Group List</h2>
        <div class="ContentHeader_Buttons"></div>
        <filter-field :change="filterChanged" :value="filter"/>
      </div>
      <item-list :count="items.length" :filter="filter">
        <table class="ModelList">
          <col class="col-name">
          <col class="col-workgroup">
          <col class="col-master">
          <thead>
            <tr>
              <th>Name</th>
              <th>WorkGroup</th>
              <th>Master</th>
            </tr>
          </thead>
          <tbody>
            <network-group-list-item
              v-for="network_group in items"
              :network_group="network_group"
              :key="network_group._id"
            />
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
import NetworkGroupListItem from './NetworkGroupListItem'
import Api from '@/api'

export default {
  data() {
    return {
      items: []
    }
  },
  components: {
    NetworkGroupListItem,
    Pagination
  },
  mixins: [FilteredDataMixin],
  methods: {
    loadData() {
      return Api.NetworkGroups.List(this.page, this.filter)
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
.col-workgroup {
  width: 13%;
}

.col-master {
  width: 5%;
}
</style>
