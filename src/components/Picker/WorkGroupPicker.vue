<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="WorkGroup Name"
    :suggestions="work_groups"
    :value="filter"
    :getValue="getValue"
    :getIndex="getIndex"
    :pickedItem="workGroup"
    @change="inputChanged"
    @clear="$emit('clear')"
    @pick="$emit('pick', $event)" />
</template>

<script>
import Picker from './Picker'
import Api from '@/api'

export default {
  props: {
    workGroup: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Picker
  },
  data() {
    return {
      work_groups: [],
      filter: ''
    }
  },
  methods: {
    inputChanged(newVal) {
      this.filter = newVal
      Api.WorkGroups.List(1, newVal, ['_id', 'name'], 5).then(response => {
        this.work_groups = response.data.data
      })
    },
    getValue(s) {
      return s.name
    },
    getIndex(s) {
      return s._id
    }
  }
}
</script>
