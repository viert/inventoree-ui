<template>
  <i :class="checkboxClass" @click="click"></i>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    click: {
      type: Function,
      required: true
    }
  },
  computed: {
    checkboxClass () {
      return {
        'fa': true,
        'fa-check-square-o': this.checked,
        'fa-square-o': !this.checked
      }
    }
  }
}
</script>

<style>

</style>
