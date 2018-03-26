<template>
  <div class="PageContent" :class="{'NoSelect': selectMode}">
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
              <fa-checkbox :checked="allSelected" @trigger="toggleAll" />
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
            v-for="group in items"
            :group="group"
            :key="group.id"
            @toggle-select="toggleItem"
            @start-selection="startSelection" />
        </tbody>
      </table>
    </main>
    <aside v-if="itemsSelected.length > 0" class="SelectPanel">
      <h2 class="ContentHeader_Title">Mass actions</h2>
      <ul class="ListSelected">
        <li class="ListSelected_Item" v-for="sgroup in itemsSelected" :key="sgroup._id">{{sgroup.name}}</li>
      </ul>
      <div class="Form">
        <div class="Form_Field">
          <label class="Form_FieldLabel">Move groups to project</label>
          <div class="input-group">
            <project-picker @pick="projectPicked" />
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
import FaCheckbox from '@/components/Common/FaCheckbox'
import ProjectPicker from '@/components/Picker/ProjectPicker'
import FilteredDataMixin from '@/mixins/FilteredDataMixin'
import MassSelect from '@/mixins/MassSelect'
import { mapState } from 'vuex'

export default {
  name: 'GroupList',
  mixins: [
    MassSelect,
    FilteredDataMixin
  ],
  components: {
    GroupListItem,
    FilterField,
    FaCheckbox,
    ProjectPicker
  },
  data () {
    let page = this.$route.query._page || 1
    let totalPages = 0
    return {
      page,
      totalPages
    }
  },
  created () {
    this.loadData()
  },
  computed: {
    ...mapState(['selectMode'])
  },
  methods: {
    loadData () {
      return Api.Groups.List(this.page, this.filter)
        .then(response => {
          this.page = response.data.page
          this.totalPages = response.data.total_pages
          this.items = response.data.data.map(item => {
            item._selected = this.shouldBeSelected(item)
            return item
          })
        })
    },
    filterChanged (e) {
      this.filter = e.target.value
      this.filterDirty = true
      this.$router.replace({query: {_page: this.page, _filter: this.filter}})
    },
    startSelection () {
      this.$store.commit('setSelectMode', true)
    },
    projectPicked (project) {
      console.log('picked project', project)
    }
  }
}
</script>

<style>

</style>
