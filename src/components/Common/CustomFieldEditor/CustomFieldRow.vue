<template>
  <div class="row">
    <div class="col-sm-5">
      <input
        class="form-control"
        placeholder="Key"
        :value="field.key"
        name="cfkey"
        @input="handleChange"
        type="text"
      >
    </div>
    <div class="col-sm-7">
      <input
        class="form-control"
        placeholder="Value"
        :value="field.value"
        name="cfvalue"
        @input="handleChange"
        type="text"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: () => {
        return { key: '', value: '' }
      }
    }
  },
  methods: {
    handleChange(e) {
      let field = { ...this.field }
      switch (e.target.name) {
        case 'cfkey':
          field.key = e.target.value
          break
        case 'cfvalue':
          field.value = e.target.value
          break
      }
      this.$emit('change', field)
    }
  }
}
</script>

<style>
</style>
