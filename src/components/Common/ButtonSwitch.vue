<template>
  <div class="btn-group">
    <button
      v-for="buttonName in buttons"
      :key="buttonName"
      class="btn"
      :class="{'btn-primary': value === buttonName,'btn-outline-primary': value !== buttonName}"
      @click="handleClick(buttonName)"
    >{{ buttonName }}</button>
  </div>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick(buttonName) {
      if (buttonName !== this.value) {
        this.$emit('change', buttonName)
      }
    }
  }
}
</script>

<style>
</style>
