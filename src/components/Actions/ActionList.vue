<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title ContentHeader_Title--Grow">User Action List</h2>
        <div class="ContentHeader_ActionTypeField">
          <action-type-picker
            @pick="actionTypePicked"
            @clear="actionTypeCleared" />
        </div>
      </div>
      <item-list :filter="actionTypeFilter" :count="items.length">
        <table class="ModelList">
          <col class="col-datetime"/>
          <col class="col-username"/>
          <col class="col-action"/>
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <action-list-item
              v-for="item in items"
              :key="item._id"
              :action="item"
              />
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
import ActionListItem from './ActionListItem'
import Pagination from '@/components/Common/Pagination'
import ActionTypePicker from '@/components/Picker/ActionTypePicker'
import Api from '@/api'

export default {
  components: {
    ActionListItem,
    ActionTypePicker,
    Pagination
  },
  mixins: [FilteredDataMixin],
  data() {
    return {
      items: [],
      actionTypeFilter: ''
    }
  },
  methods: {
    loadData() {
      let actionTypes =
        this.actionTypeFilter === '' ? [] : [this.actionTypeFilter]
      Api.Actions.List(this.page, actionTypes).then(response => {
        this.items = response.data.data
        this.page = response.data.page
        this.totalPages = response.data.total_pages
      })
    },
    actionTypePicked(aType) {
      this.actionTypeFilter = aType.name
      this.loadData()
    },
    actionTypeCleared(aType) {
      this.actionTypeFilter = ''
      this.loadData()
    }
  }
}
</script>

<style scoped>
.col-datetime {
  width: 155px;
}
.col-username {
  width: 200px;
}
</style>
