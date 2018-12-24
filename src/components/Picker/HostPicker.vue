<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="Host FQDN"
    :suggestions="hosts"
    :value="filter"
    :pickedItem="host"
    :getValue="getValue"
    :getIndex="getIndex"
    :isSelected="isSelected"
    :multi="multi"
    :inline="inline"
    @change="inputChanged"
    @add="$emit('add', $event)"
    @remove="$emit('remove', $event)"
    @clear="$emit('clear', $event)"
    @pick="$emit('pick', $event)"
  />
</template>

<script>
import Picker from './Picker'
import Api from '@/api'

export default {
  props: {
    host: {
      type: Object,
      default: null
    },
    multi: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Function
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Picker
  },
  data() {
    return {
      hosts: [],
      filter: ''
    }
  },
  methods: {
    inputChanged(newVal) {
      this.filter = newVal
      Api.Hosts.List(1, newVal, false, ['_id', 'fqdn'], 5).then(response => {
        this.hosts = response.data.data
      })
    },
    getValue(s) {
      return s.fqdn
    },
    getIndex(s) {
      return s._id
    }
  }
}
</script>
