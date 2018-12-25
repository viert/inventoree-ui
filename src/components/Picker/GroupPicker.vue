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
      groups: [],
      filter: ''
    }
  },
  methods: {
    inputChanged(newVal) {
      this.filter = newVal
      Api.Groups.List(
        1,
        newVal,
        false,
        ['_id', 'name', 'work_group_id'],
        5
      ).then(response => {
        this.groups = response.data.data
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
