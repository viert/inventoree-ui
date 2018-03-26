<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="Project Name"
    :suggestions="projects"
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
      projects: [],
      filter: ''
    }
  },
  methods: {
    inputChanged (newVal) {
      this.filter = newVal
      Api.Projects.List(1, newVal, ['_id', 'name'])
        .then(response => {
          this.projects = response.data.data
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
      this.picked = true
    }
  }
}
</script>

<style>

</style>
