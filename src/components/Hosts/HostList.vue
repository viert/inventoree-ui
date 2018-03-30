<template>
  <div class="PageContent" :class="{'NoSelect': selectMode}">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Host List</h2>
        <div class="ContentHeader_Buttons">
          <router-link to="/hosts/++/edit" class="btn btn-success btn-sm text-uppercase">
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
            <th>FQDN</th>
            <th>Datacenter</th>
            <th>Group</th>
            <th>Tags</th>
            <th>Custom Fields</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <host-list-item
            v-for="host in items"
            :host="host"
            :key="host._id"
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
        <li @click="deselectItem(shost)" class="ListSelected_Item" v-for="shost in itemsSelected" :key="shost._id">{{shost.fqdn}}</li>
      </ul>
      <div class="Form">
        <div class="Form_Field">
          <label class="Form_FieldLabel">Move hosts to group</label>
          <div class="input-group">
            <group-picker @pick="destGroup = $event" @clear="destGroup = null" />
            <div class="input-group-append">
              <button @click="massMoveToGroup" class="btn btn-outline-primary">Move</button>
            </div>
          </div>
        </div>
        <div class="Form_Field">
          <label class="Form_FieldLabel">Move hosts to datacenter</label>
          <div class="input-group">
            <datacenter-picker @pick="destDatacenter = $event" @clear="destDatacenter = null" />
            <div class="input-group-append">
              <button class="btn btn-outline-primary">Move</button>
            </div>
          </div>
        </div>
        <div class="Form_Field">
          <label class="Form_FieldLabel">Detach From Groups</label>
          <confirm-button @confirm="massDetach" class="btn btn-danger">Detach</confirm-button>
        </div>
        <div class="Form_Field">
          <label class="Form_FieldLabel">Delete Hosts</label>
          <confirm-button @confirm="massDelete" class="btn btn-danger">Delete</confirm-button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import Api from '@/api'
import FaCheckbox from '@/components/Common/FaCheckbox'
import HostListItem from './HostListItem'
import GroupPicker from '@/components/Picker/GroupPicker'
import Pagination from '@/components/Common/Pagination'
import DatacenterPicker from '@/components/Picker/DatacenterPicker'
import FilteredDataMixin from '@/mixins/FilteredDataMixin'
import MassSelect from '@/mixins/MassSelect'
import { mapState } from 'vuex'
export default {
  name: 'HostList',
  mixins: [
    MassSelect,
    FilteredDataMixin
  ],
  components: {
    HostListItem,
    FaCheckbox,
    GroupPicker,
    DatacenterPicker,
    Pagination
  },
  data () {
    return {
      destGroup: null,
      destDatacenter: null
    }
  },
  computed: {
    ...mapState(['selectMode'])
  },
  methods: {
    loadData () {
      return Api.Hosts.List(this.page, this.filter)
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
    massDelete () {
      let hostIds = this.itemsSelected.map(item => item._id)
      Api.Hosts.MassDelete(hostIds)
        .then(() => {
          this.$store.dispatch('info', 'Hosts were deleted successfully')
          this.clearSelection()
          this.loadData()
        })
    },
    massDetach () {
      let hostIds = this.itemsSelected.map(item => item._id)
      Api.Hosts.MassDetach(hostIds)
        .then(() => {
          this.$store.dispatch('info', 'Hosts were detached from their groups successfully')
          this.clearSelection()
          this.loadData()
        })
    },
    massMoveToGroup () {
      if (!this.destGroup) {
        this.$store.dispatch('error', 'Please select a group to move hosts to')
        return
      }
      let hostIds = this.itemsSelected.map(item => item._id)
      Api.Hosts.MassMove(hostIds, this.destGroup._id)
        .then(() => {
          this.$store.dispatch('info', `Hosts were moved to group ${this.destGroup.name}`)
          this.destGroup = null
          this.clearSelection()
          this.loadData()
        })
    }
  }
}
</script>

<style>

</style>
