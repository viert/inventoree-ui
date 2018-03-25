<template>
  <i :class="checkboxClass" @mousedown="handleMouseDown" @mouseover="handleMouseOver"></i>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checkboxClass () {
      return {
        'fa': true,
        'fa-check-square-o': this.checked,
        'fa-square-o': !this.checked
      }
    },
    ...mapState(['selectMode'])
  },
  methods: {
    handleMouseDown (e) {
      this.$emit('trigger', e)
    },
    handleMouseOver (e) {
      if (this.selectMode) {
        this.$emit('trigger', e)
      }
    }
  }
}
</script>

<style>

</style>
