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
        <item-list :count="items.length" :filter="filter">
          <table class="ModelList">
            <col class="col-name" />
            <col class="col-owner" />
            <col class="col-email" />
            <col class="col-rootemail" />
            <col class="col-desc" />
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
import ProjectListItem from './ProjectListItem'
import Api from '@/api'

export default {
  data() {
    return {
      items: []
    }
  },
  components: {
    ProjectListItem,
    Pagination
  },
  mixins: [FilteredDataMixin],
  methods: {
    loadData() {
      return Api.Projects.List(this.page, this.filter).then(response => {
        this.items = response.data.data
        this.page = response.data.page
        this.totalPages = response.data.total_pages
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
