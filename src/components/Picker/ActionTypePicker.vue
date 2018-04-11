<template>
  <picker
    inputClass="form-control form-control-sm"
    inputPickedClass="is-valid"
    placeholder="ACTION TYPE FILTER"
    :suggestions="actionTypesFiltered"
    :value="filter"
    :getValue="getValue"
    :getIndex="getIndex"
    :pickedItem="action_type"
    @change="inputChanged"
    @pick="$emit('pick', $event)"
    @clear="$emit('clear', $event)" />
</template>

<script>
import Picker from './Picker'
import Api from '@/api'

export default {
  props: {
    action_type: {
      default: null
    }
  },
  components: {
    Picker
  },
  data () {
    return {
      action_types: [],
      filter: ''
    }
  },
  created () {
    Api.Actions.ActionTypes()
      .then(({data}) => {
        let types = []
        for (var t in data.action_types) {
          types.push(t)
        }
        types.sort()
        this.action_types = types.map((e, i) => ({ id: i, name: e }))
      })
  },
  computed: {
    actionTypesFiltered () {
      if (this.filter === '') {
        return []
      }
      return this.action_types.filter(i => i.name.toLowerCase().startsWith(this.filter.toLowerCase())).slice(0, 5)
    }
  },
  methods: {
    inputChanged (newVal) {
      this.filter = newVal
    },
    getValue (s) {
      return s.name
    },
    getIndex (s) {
      return s.id
    }
  }
}
</script>
