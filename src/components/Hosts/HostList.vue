<template>
  <div class="PageContent" :class="{'NoSelect': selectMode}">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Group List</h2>
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
        <li class="ListSelected_Item" v-for="shost in itemsSelected" :key="shost._id">{{shost.fqdn}}</li>
      </ul>
      <div class="Form">
        <div class="Form_Field">
          <label class="Form_FieldLabel">Move hosts to group</label>
          <div class="input-group">
            <group-picker @pick="groupPicked" />
            <div class="input-group-append">
              <button class="btn btn-outline-primary">Move</button>
            </div>
          </div>
        </div>
        <div class="Form_Field">
          <label class="Form_FieldLabel">Move hosts to datacenter</label>
          <div class="input-group">
            <datacenter-picker @pick="datacenterPicked" />
            <div class="input-group-append">
              <button class="btn btn-outline-primary">Move</button>
            </div>
          </div>
        </div>
        <div class="Form_Field">
          <label class="Form_FieldLabel">Detach From Groups</label>
          <button class="btn btn-danger">Detach</button>
        </div>
        <div class="Form_Field">
          <label class="Form_FieldLabel">Delete Hosts</label>
          <button class="btn btn-danger">Delete</button>
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
import Pagination from '@/components/common/Pagination'
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
    let page = parseInt(this.$route.query._page) || 1
    let totalPages = 0
    return {
      page,
      totalPages,
      destProject: null,
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
    filterChanged (e) {
      this.filter = e.target.value
      this.filterDirty = true
      this.$router.replace({query: {_page: this.page, _filter: this.filter}})
    },
    pageChanged (page) {
      this.page = page
      this.$router.replace({query: {_page: this.page, _filter: this.filter}})
      this.loadData()
    },
    startSelection () {
      this.$store.commit('setSelectMode', true)
    },
    groupPicked (project) {
      this.destGroup = project
    },
    datacenterPicked (dc) {
      this.destDatacenter = dc
    }
  }
}
</script>

<style>

</style>
