<template>
  <tr>
    <td class="ModelList_Select">
      <i class="fa fa-folder-o"></i>
    </td>
    <td>
      <router-link to="viewLink">{{ group.name }}</router-link>
    </td>
    <td>
      {{group.project_name}}
    </td>
    <td>
      <tag v-for="tag in allTagsSorted" :name="tag" :key="tag" :derived="!(group.tags.includes(tag))"/>
    </td>
    <td>
      <custom-field v-for="cf in group.all_custom_fields" :cf-key="cf.key" :cf-value="cf.value" :key="cf.key" />
    </td>
    <td>{{ group.description }}</td>
  </tr>
</template>

<script>
import Tag from '@/components/Common/Tag'
import CustomField from '@/components/Common/CustomField'
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  components: {
    Tag,
    CustomField
  },
  computed: {
    viewLink () {
      return `/groups/${this.group.name}`
    },
    allTagsSorted () {
      return this.group.all_tags.slice().sort()
    }
  }
}
</script>

<style>

</style>
