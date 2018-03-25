<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Group List</h2>
        <div class="ContentHeader_Buttons">
          <router-link to="/groups/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> Create
          </router-link>
        </div>
        <filter-field :change="filterChanged" :value="filter" />
      </div>
      <table class="ModelList">
        <thead>
          <tr>
            <th class="ModelList_Select">
              <i class="fa fa-folder-o"></i>
            </th>
            <th>Name</th>
            <th>Project</th>
            <th>Tags</th>
            <th>Custom Fields</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <group-list-item :group="group" v-for="group in groups" :key="group.id"></group-list-item>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import Api from '@/api'
import GroupListItem from './GroupListItem'
import FilterField from '@/components/Common/FilterField'
import FilteredDataMixin from '@/mixins/FilteredDataMixin'

export default {
  name: 'GroupList',
  mixins: [FilteredDataMixin],
  components: {
    GroupListItem,
    FilterField
  },
  data () {
    let page = this.$route.query._page || 1
    let totalPages = 0
    return {
      page,
      totalPages,
      groups: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      return Api.Groups.List(this.page, this.filter)
        .then(response => {
          this.page = response.data.page
          this.totalPages = response.data.total_pages
          this.groups = response.data.data
        })
        .catch(err => { console.log(err) })
    },

    filterChanged (e) {
      this.filter = e.target.value
      this.filterDirty = true
    }
  }
}
</script>

<style>

</style>
