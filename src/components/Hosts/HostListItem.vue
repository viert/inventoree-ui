<template>
  <tr>
    <td class="ModelList_Select">
      <fa-checkbox :checked="host._selected" @trigger="toggleSelected" />
    </td>
    <td>
      <host :fqdn="host.fqdn" :icon="false" />
    </td>
    <td>
      <datacenter v-if="host.datacenter_name" :name="host.datacenter_name" :icon="false" />
    </td>
    <td>
      <span v-if="host.group_name">{{host.group_name}}</span>
    </td>
    <td>
      <tag v-for="tag in allTagsSorted" :name="tag" :key="tag" :derived="!(host.tags.includes(tag))"/>
    </td>
    <td>
      <custom-field v-for="cf in host.all_custom_fields" :cf-key="cf.key" :cf-value="cf.value" :key="cf.key" />
    </td>
    <td>{{ host.description }}</td>
  </tr>
</template>

<script>
import Tag from '@/components/Common/Tag'
import CustomField from '@/components/Common/CustomField'
import FaCheckbox from '@/components/Common/FaCheckbox'
export default {
  props: {
    host: {
      type: Object,
      required: true
    }
  },
  components: {
    Tag,
    CustomField,
    FaCheckbox
  },
  computed: {
    allTagsSorted () {
      return this.host.all_tags.slice().sort()
    }
  },
  methods: {
    toggleSelected () {
      this.$emit('toggle-select', this.host)
      this.$emit('start-selection')
    }
  }
}
</script>

<style>

</style>
