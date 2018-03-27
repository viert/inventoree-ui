<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Project List</h2>
        <div class="ContentHeader_Buttons">
          <router-link to="/projects/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> Create
          </router-link>
        </div>
        <filter-field :change="filterChanged" :value="filter" />
      </div>
      <table class="ModelList">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Root Email</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <project-list-item
            v-for="project in items"
            :project="project"
            :key="project._id" />
        </tbody>
      </table>

    </main>
  </div>
</template>

<script>
import FilteredDataMixin from '@/mixins/FilteredDataMixin'
import ProjectListItem from './ProjectListItem'
import Api from '@/api'

export default {
  data () {
    let page = this.$route.query._page || 1
    let totalPages = 0
    return {
      page,
      totalPages,
      items: []
    }
  },
  components: {
    ProjectListItem
  },
  mixins: [
    FilteredDataMixin
  ],
  methods: {
    loadData () {
      return Api.Projects.List(this.page, this.filter)
        .then(response => {
          this.items = response.data.data
          this.page = response.data.page
          this.totalPages = response.data.total_pages
        })
    },
    filterChanged (e) {
      this.filter = e.target.value
      this.filterDirty = true
      this.$router.replace({query: {_page: this.page, _filter: this.filter}})
    }
  }
}
</script>

<style>

</style>
