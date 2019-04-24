<template>
  <tr>
    <td class="ModelList_Select">
      <fa-checkbox :checked="host._selected" @trigger="toggleSelected"/>
    </td>
    <td class="ModelList_Item--MayBeLong">
      <host :fqdn="host.fqdn" :icon="false"/>
    </td>
    <td>{{ host.ext_id }}</td>
    <td>
      <datacenter v-if="host.datacenter_name" :name="host.datacenter_name" :icon="false"/>
    </td>
    <td>
      <span v-if="host.group_name">{{host.group_name}}</span>
    </td>
    <td class="ModelList_Item--MayBeLong">
      <tag
        v-for="tag in allTagsSorted"
        :name="tag"
        :key="tag"
        :derived="!(host.tags.includes(tag))"
      />
    </td>
    <td v-if="!hideDesc">{{ host.description }}</td>
  </tr>
</template>

<script>
import Tag from '@/components/Common/Tag'
import FaCheckbox from '@/components/Common/FaCheckbox'
export default {
  props: {
    host: {
      type: Object,
      required: true
    },
    hideDesc: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Tag,
    FaCheckbox
  },
  computed: {
    allTagsSorted() {
      return this.host.all_tags.slice().sort()
    }
  },
  methods: {
    toggleSelected() {
      this.$emit('toggle-select', this.host)
      this.$emit('start-selection')
    }
  }
}
</script>

<style>
</style>
