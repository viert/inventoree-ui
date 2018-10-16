<template>
  <tr>
    <td>
      <server-group :name="server_group.name" :icon="false" />
    </td>
    <td>
      <work-group :name="server_group.work_group_name" :icon="false" />
    </td>
    <td>
      <i class="fa fa-check" v-if="server_group.is_master"></i>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    server_group: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
