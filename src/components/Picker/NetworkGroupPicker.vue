<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="NetworkGroup Name"
    :suggestions="network_groups"
    :value="filter"
    :getValue="getValue"
    :getIndex="getIndex"
    :pickedItem="networkGroup"
    @change="inputChanged"
    @clear="$emit('clear')"
    @pick="$emit('pick', $event)"
  />
</template>

<script>
import Picker from './Picker'
import Api from '@/api'

export default {
  props: {
    networkGroup: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Picker
  },
  data() {
    return {
      network_groups: [],
      filter: ''
    }
  },
  methods: {
    inputChanged(newVal) {
      this.filter = newVal
      Api.NetworkGroups.List(1, newVal, ['_id', 'name'], 5).then(response => {
        this.network_groups = response.data.data
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
