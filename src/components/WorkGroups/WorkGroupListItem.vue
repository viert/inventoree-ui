<template>
  <tr>
    <td>
      <work-group :name="work_group.name" :icon="false" />
    </td>
    <td>
      <user :username="work_group.owner.username" :icon="false" />
    </td>
    <td>
      {{ work_group.email }}
    </td>
    <td>{{ work_group.description }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    work_group: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
