<template>
  <tr>
    <td>
      <network-group :name="network_group.name" :icon="true" />
    </td>
    <td>
      <work-group :name="network_group.work_group_name" :icon="false" />
    </td>
    <td>
      <i class="fa fa-check" v-if="network_group.is_master"></i>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    network_group: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
