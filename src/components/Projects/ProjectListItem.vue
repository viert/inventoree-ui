<template>
  <tr>
    <td>
      <project :name="project.name" :icon="false" />
    </td>
    <td>
      <user :username="project.owner.username" :icon="false" />
    </td>
    <td>
      {{ project.email }}
    </td>
    <td>
      {{ project.root_email }}
    </td>
    <td>{{ project.description }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
