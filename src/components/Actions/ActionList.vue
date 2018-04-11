<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Action List</h2>
      </div>
      <div class="PageContentContainer">
        <table class="ActionList">
          <tbody>
            <action-list-item
              v-for="item in items"
              :key="item._id"
              :action="item"
              />
          </tbody>
        </table>
      </div>
      <pagination
        :current="page"
        :total="totalPages"
        @page="pageChanged" />
    </main>
  </div>
</template>

<script>
import FilteredDataMixin from '@/mixins/FilteredDataMixin'
import ActionListItem from './ActionListItem'
import Pagination from '@/components/Common/Pagination'
import Api from '@/api'

export default {
  components: {
    ActionListItem,
    Pagination
  },
  mixins: [
    FilteredDataMixin
  ],
  data () {
    return {
      items: []
    }
  },
  methods: {
    loadData () {
      Api.Actions.List(this.page)
        .then(response => {
          this.items = response.data.data
          this.page = response.data.page
          this.totalPages = response.data.total_pages
        })
    }
  }

}
</script>

<style>
.ActionList {
  width: 100%;
  table-layout: fixed;
}
</style>
