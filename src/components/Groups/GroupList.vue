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
              <i class="fa fa-check-square-o"></i>
            </th>
            <th>Name</th>
            <th>Project</th>
            <th>Tags</th>
            <th>Custom Fields</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <group-list-item
            :group="group"
            v-for="group in groups"
            :key="group.id"
            @toggle-select="groupToggleSelected" />
        </tbody>
      </table>
    </main>
    <aside v-if="selectedGroups.length > 0" class="SelectPanel">
      <h2 class="ContentHeader_Title">Mass actions</h2>
      <ul class="ListSelected">
        <li class="ListSelected_Item" v-for="sgroup in selectedGroups" :key="sgroup._id">{{sgroup.name}}</li>
      </ul>
      <div class="Form">
        <div class="Form_Field">
          <label class="Form_FieldLabel">Move groups to project</label>
          <div class="input-group">
            <input class="form-control" placeholder="Project Name" type="text">
            <div class="input-group-append">
              <button class="btn btn-outline-primary">Move</button>
            </div>
          </div>
        </div>
        <div class="Form_Field">
          <label class="Form_FieldLabel">Delete Groups</label>
          <button class="btn btn-danger">Delete</button>
        </div>
      </div>
    </aside>
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
      groups: [],
      selectedGroups: [],
      selectedGroupsMap: {}
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
          this.groups = response.data.data.map(item => {
            item.selected = false
            return item
          })
        })
        .catch(err => { console.log(err) })
    },

    groupToggleSelected (group) {
      group.selected = !group.selected
      if (group.selected) {
        this.$set(this.selectedGroupsMap, group._id, group)
        this.selectedGroups.push(group)
      } else {
        this.$delete(this.selectedGroupsMap, group._id)
        this.selectedGroups = this.selectedGroups.filter(item => item._id !== group._id)
      }
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
