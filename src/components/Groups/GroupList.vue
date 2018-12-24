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
        <div class="text-right">
          <button-switch
            class="btn-group-sm"
            @change="handleMineFilterClick"
            :buttons="mineFilterButtons"
            :value="mineFilterValue"
          />
        </div>
        <filter-field :change="filterChanged" :value="filter"/>
      </div>
      <item-list :count="items.length" :filter="filter">
        <table class="ModelList">
          <col class="col-check">
          <col class="col-name">
          <col class="col-workgroup">
          <col class="col-tags">
          <col v-if="itemsSelected.length === 0" class="col-desc">
          <thead>
            <tr>
              <th class="ModelList_Select">
                <fa-checkbox :checked="allSelected" @trigger="toggleAll"/>
              </th>
              <th>Name</th>
              <th>WorkGroup</th>
              <th>Tags</th>
              <th v-if="itemsSelected.length === 0">Description</th>
            </tr>
          </thead>
          <tbody>
            <group-list-item
              v-for="group in items"
              :group="group"
              :key="group._id"
              :hide-desc="itemsSelected.length > 0"
              @toggle-select="toggleItem"
              @start-selection="startSelection"
            />
          </tbody>
        </table>
        <pagination :current="page" :total="totalPages" @page="pageChanged"/>
      </item-list>
    </main>
    <aside v-if="itemsSelected.length > 0" class="SelectPanel">
      <h2 class="ContentHeader_Title">Mass actions</h2>
      <ul class="ListSelected">
        <li
          @click="deselectItem(sgroup)"
          class="ListSelected_Item"
          v-for="sgroup in itemsSelected"
          :key="sgroup._id"
        >{{sgroup.name}}</li>
      </ul>
      <div class="Form">
        <div class="Form_Field">
          <label class="Form_FieldLabel">Move groups to workgroup</label>
          <div class="input-group">
            <work-group-picker @pick="workGroupPicked"/>
            <div class="input-group-append">
              <button @click="massMoveToWorkGroup" class="btn btn-outline-primary">Move</button>
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
import WorkGroupPicker from '@/components/Picker/WorkGroupPicker'
import ButtonSwitch from '@/components/Common/ButtonSwitch'
import FilteredDataMixin from '@/mixins/FilteredDataMixin'
import MassSelect from '@/mixins/MassSelect'
import { mapState } from 'vuex'

export default {
  name: 'GroupList',
  mixins: [MassSelect, FilteredDataMixin],
  components: {
    GroupListItem,
    FaCheckbox,
    WorkGroupPicker,
    ButtonSwitch,
    Pagination
  },
  data() {
    return {
      destWorkGroup: null,
      mineFilter: true
    }
  },
  computed: {
    ...mapState(['selectMode'])
  },
  methods: {
    loadData() {
      return Api.Groups.List(this.page, this.filter, this.mineFilter)
        .then(this.fixPage)
        .then(response => {
          this.items = response.data.data.map(item => {
            item._selected = this.shouldBeSelected(item)
            return item
          })
        })
        .catch(e => {
          if (e && e.message !== 'page_change') {
            return Promise.reject(e)
          }
        })
    },
    startSelection() {
      this.$store.commit('setSelectMode', true)
    },
    workGroupPicked(workGroup) {
      this.destWorkGroup = workGroup
    },
    massMoveToWorkGroup() {
      if (!this.destWorkGroup) {
        this.$store.dispatch(
          'error',
          'Please select a workgroup to move groups to'
        )
        return
      }
      let groupIds = this.itemsSelected.map(item => item._id)
      Api.Groups.MassMove(groupIds, this.destWorkGroup._id).then(() => {
        this.$store.dispatch(
          'info',
          `Groups were moved to workgroup ${this.destWorkGroup.name}`
        )
        this.destWorkGroup = null
        this.clearSelection()
        this.loadData()
      })
    },
    massDelete() {
      let groupIds = this.itemsSelected.map(item => item._id)
      Api.Groups.MassDelete(groupIds).then(() => {
        this.$store.dispatch('info', `Groups were successfully deleted`)
        this.clearSelection()
        this.loadData()
      })
    },
    handleMineFilterClick(value) {
      this.mineFilterChanged(value === 'mine')
    }
  }
}
</script>

<style scoped>
.col-check {
  width: 32px;
}

.col-name {
  width: 12%;
}

.col-workgroup {
  width: 12%;
}
</style>
