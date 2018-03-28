<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="Project Name"
    :suggestions="projects"
    :value="filter"
    :getValue="getValue"
    :getIndex="getIndex"
    :pickedItem="project"
    @change="inputChanged"
    @pick="dataPicked" />
</template>

<script>
import Picker from './Picker'
import Api from '@/api'

export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  },
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
      Api.Projects.List(1, newVal, ['_id', 'name'], 5)
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
    }
  }
}
</script>

<style>

</style>
