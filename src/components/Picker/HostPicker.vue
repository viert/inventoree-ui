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
    @add="dataAdded"
    @remove="dataRemoved"
    @pick="dataPicked" />
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
  data () {
    return {
      hosts: [],
      filter: ''
    }
  },
  methods: {
    inputChanged (newVal) {
      this.filter = newVal
      Api.Hosts.List(1, newVal, ['_id', 'fqdn'], 5)
        .then(response => {
          this.hosts = response.data.data
        })
    },
    getValue (s) {
      return s.fqdn
    },
    getIndex (s) {
      return s._id
    },
    dataPicked (data) {
      this.$emit('pick', data)
    },
    dataAdded (data) {
      this.$emit('add', data)
    },
    dataRemoved (data) {
      this.$emit('remove', data)
    }
  }
}
</script>
