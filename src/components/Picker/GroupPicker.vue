<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="Group Name"
    :suggestions="groups"
    :value="filter"
    :getValue="getValue"
    :getIndex="getIndex"
    @change="inputChanged"
    @pick="dataPicked" />
</template>

<script>
import Picker from './Picker'
import Api from '@/api'

export default {
  components: {
    Picker
  },
  data () {
    return {
      groups: [],
      filter: ''
    }
  },
  methods: {
    inputChanged (newVal) {
      this.filter = newVal
      Api.Groups.List(1, newVal, ['_id', 'name'], 5)
        .then(response => {
          this.groups = response.data.data
        })
    },
    getValue (s) {
      return s.name
    },
    getIndex (s) {
      return s._id
    },
    dataPicked (data) {
      this.$emit('pick', data)
    }
  }
}
</script>
