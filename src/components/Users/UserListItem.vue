<template>
  <tr>
    <td>
      <user :username="user.username" :icon="false" />
    </td>
    <td>
      {{fullName}}
    </td>
    <td>
      {{ user.email }}
    </td>
    <td>
      <i class="fa fa-check" v-if="user.supervisor"></i>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    fullName () {
      return `${this.user.first_name} ${this.user.last_name}`
    }
  }
}
</script>

<style>

</style>
