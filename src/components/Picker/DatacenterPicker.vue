<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="Datacenter Name"
    :suggestions="datacenters"
    :value="filter"
    :getValue="getValue"
    :getIndex="getIndex"
    :pickedItem="datacenter"
    @change="inputChanged"
    @pick="$emit('pick', $event)"
    @clear="$emit('clear', $event)" />
</template>

<script>
import Picker from './Picker'
import Api from '@/api'

export default {
  props: {
    datacenter: {
      type: Object,
      default: null
    }
  },
  components: {
    Picker
  },
  data () {
    return {
      datacenters: [],
      filter: ''
    }
  },
  methods: {
    inputChanged (newVal) {
      this.filter = newVal
      Api.Datacenters.List(1, newVal, ['_id', 'name'], 5)
        .then(response => {
          this.datacenters = response.data.data
        })
    },
    getValue (s) {
      return s.name
    },
    getIndex (s) {
      return s._id
    }
  }
}
</script>
