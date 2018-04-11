<template>
  <div>
    <div class="Card_Field">
      <label class="Card_FieldLabel">Status</label>
      <span :class="{ 'text-danger': isFailure, 'text-success': isSuccess }">{{STATUS}}</span>
    </div>
    <div class="Card_Field" v-if="isFailure">
      <label class="Card_FieldLabel">Errors</label>
      <ul class="ErrorList">
        <li v-for="(error, i) in errors" :key="i">
          {{error}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isFailure () {
      return this.status !== 'success'
    },
    isSuccess () {
      return this.status === 'success'
    },
    STATUS () {
      return this.status.toUpperCase()
    }
  }
}
</script>

<style>

</style>
