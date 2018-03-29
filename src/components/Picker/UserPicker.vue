<template>
  <picker
    inputClass="form-control"
    inputPickedClass="is-valid"
    placeholder="Username"
    :suggestions="users"
    :value="filter"
    :pickedItem="user"
    :getValue="getValue"
    :getIndex="getIndex"
    :isSelected="isSelected"
    :multi="multi"
    :inline="inline"
    @change="inputChanged"
    @add="$emit('add', $event)"
    @remove="$emit('remove', $event)"
    @clear="$emit('clear', $event)"
    @pick="$emit('pick', $event)" />
</template>

<script>
import Picker from './Picker'
import Api from '@/api'

export default {
  props: {
    user: {
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
      users: [],
      filter: ''
    }
  },
  methods: {
    inputChanged (newVal) {
      this.filter = newVal
      Api.Users.List(1, newVal, ['_id', 'username'], 5)
        .then(response => {
          this.users = response.data.data
        })
    },
    getValue (s) {
      return s.username
    },
    getIndex (s) {
      return s._id
    }
  }
}
</script>
