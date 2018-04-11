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
            :key="group._id"
            @toggle-select="toggleItem"
            @start-selection="startSelection" />
        </tbody>
      </table>
      <pagination
        :current="page"
        :total="totalPages"
        @page="pageChanged" />
    </main>
    <aside v-if="itemsSelected.length > 0" class="SelectPanel">
      <h2 class="ContentHeader_Title">Mass actions</h2>
      <ul class="ListSelected">
        <li @click="deselectItem(sgroup)" class="ListSelected_Item" v-for="sgroup in itemsSelected" :key="sgroup._id">{{sgroup.name}}</li>
      </ul>
      <div class="Form">
        <div class="Form_Field">
          <label class="Form_FieldLabel">Move groups to project</label>
          <div class="input-group">
            <project-picker @pick="projectPicked" />
            <div class="input-group-append">
              <button @click="massMoveToProject" class="btn btn-outline-primary">Move</button>
            </div>
          </div>
        </div>
        <div class="Form_Field">
          <label class="Form_FieldLabel">Delete Groups</label>
          <confirm-button @confirm="massDelete" class="btn btn-danger">Delete</confirm-button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import Api from '@/api'
import GroupListItem from './GroupListItem'
import FaCheckbox from '@/components/Common/FaCheckbox'
import Pagination from '@/components/Common/Pagination'
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
    FaCheckbox,
    ProjectPicker,
    Pagination
  },
  data () {
    return {
      destProject: null
    }
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
    startSelection () {
      this.$store.commit('setSelectMode', true)
    },
    projectPicked (project) {
      this.destProject = project
    },
    massMoveToProject () {
      if (!this.destProject) {
        this.$store.dispatch('error', 'Please select a project to move groups to')
        return
      }
      let groupIds = this.itemsSelected.map(item => item._id)
      Api.Groups.MassMove(groupIds, this.destProject._id)
        .then(() => {
          this.$store.dispatch('info', `Groups were moved to project ${this.destProject.name}`)
          this.destProject = null
          this.clearSelection()
          this.loadData()
        })
    },
    massDelete () {
      let groupIds = this.itemsSelected.map(item => item._id)
      Api.Groups.MassDelete(groupIds)
        .then(() => {
          this.$store.dispatch('info', `Groups were successfully deleted`)
          this.clearSelection()
          this.loadData()
        })
    }
  }
}
</script>

<style>

</style>
