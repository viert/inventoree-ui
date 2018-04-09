<template>
  <transition-group name="scaley">
    <custom-field-row
      v-for="(field, i) in cFields"
      :field="field"
      :key="i"
      @change="handleChange(i, $event)" />
  </transition-group>
</template>

<script>
import CustomFieldRow from './CustomFieldRow'
const fieldIsEmpty = field => field.key === '' && field.value === ''
export default {
  props: {
    fields: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CustomFieldRow
  },
  computed: {
    cFields () {
      let fields = [...this.fields]
      if (fields.length === 0 || !(fieldIsEmpty(fields[fields.length - 1]))) {
        fields.push({ key: '', value: '' })
      }
      return fields
    }
  },
  methods: {
    handleChange (i, field) {
      let fields = [...this.cFields]
      fields[i].key = field.key
      fields[i].value = field.value
      fields = fields.filter(i => !fieldIsEmpty(i))
      this.$emit('change', fields)
    }
  }
}
</script>

<style>
.Form_Field--CFE .row {
  margin-bottom: 8px;
}
.scaley-enter-active {
  overflow-y: hidden;
  animation: scaleDown 0.15s ease;
}
.scaley-leave-active {
  overflow-y:hidden;
  animation: scaleDown 0.15s ease reverse;
}

@keyframes scaleDown {
  0% {
    height: 0;
  }
  100% {
    height: 2.25rem;
  }
}
</style>
