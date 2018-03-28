<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="Group Name"
    :suggestions="groups"
    :value="filter"
    :pickedItem="group"
    :getValue="getValue"
    :getIndex="getIndex"
    :isSelected="isSelected"
    :multi="multi"
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
    group: {
      type: Object,
      default: null
    },
    multi: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Function
    }
  },
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
