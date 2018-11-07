<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="ServerGroup Name"
    :suggestions="server_groups"
    :value="filter"
    :getValue="getValue"
    :getIndex="getIndex"
    :pickedItem="serverGroup"
    @change="inputChanged"
    @clear="$emit('clear')"
    @pick="$emit('pick', $event)" />
</template>

<script>
import Picker from './Picker'
import Api from '@/api'

export default {
  props: {
    serverGroup: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Picker
  },
  data() {
    return {
      server_groups: [],
      filter: ''
    }
  },
  methods: {
    inputChanged(newVal) {
      this.filter = newVal
      Api.ServerGroups.List(1, newVal, ['_id', 'name'], 5).then(response => {
        this.server_groups = response.data.data
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
