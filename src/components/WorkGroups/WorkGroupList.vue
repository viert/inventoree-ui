<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">WorkGroup List</h2>
        <div class="ContentHeader_Buttons">
          <router-link to="/work_groups/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> Create
          </router-link>
        </div>
        <div class="text-right">
          <button-switch
            class="btn-group-sm"
            @change="handleMineFilterClick"
            :buttons="mineFilterButtons"
            :value="mineFilterValue"
          />
        </div>
        <filter-field :change="filterChanged" :value="filter"/>
      </div>
      <item-list :count="items.length" :filter="filter">
        <table class="ModelList">
          <col class="col-name">
          <col class="col-owner">
          <col class="col-email">
          <col class="col-desc">
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <work-group-list-item
              v-for="work_group in items"
              :work_group="work_group"
              :key="work_group._id"
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
import ButtonSwitch from '@/components/Common/ButtonSwitch'
import WorkGroupListItem from './WorkGroupListItem'
import Api from '@/api'

export default {
  data() {
    return {
      items: [],
      mineFilter: true
    }
  },
  components: {
    WorkGroupListItem,
    Pagination,
    ButtonSwitch
  },
  mixins: [FilteredDataMixin],
  methods: {
    loadData() {
      return Api.WorkGroups.List(this.page, this.filter, this.mineFilter)
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
.col-name,
.col-owner {
  width: 13%;
}
.col-email,
.col-rootemail {
  width: 20%;
}
</style>
