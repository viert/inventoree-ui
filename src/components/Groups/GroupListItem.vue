<template>
  <tr>
    <td class="ModelList_Select">
      <fa-checkbox :checked="group._selected" @trigger="toggleSelected"/>
    </td>
    <td>
      <group :name="group.name" :icon="false"/>
    </td>
    <td>{{group.work_group_name}}</td>
    <td class="ModelList_Item--MayBeLong">
      <tag
        v-for="tag in allTagsSorted"
        :name="tag"
        :key="tag"
        :derived="!(group.tags.includes(tag))"
      />
    </td>
    <td v-if="!hideDesc">{{ group.description }}</td>
  </tr>
</template>

<script>
import Tag from '@/components/Common/Tag'
import FaCheckbox from '@/components/Common/FaCheckbox'
export default {
  props: {
    group: {
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
    viewLink() {
      return `/groups/${this.group.name}`
    },
    allTagsSorted() {
      return this.group.all_tags.slice().sort()
    }
  },
  methods: {
    toggleSelected() {
      this.$emit('toggle-select', this.group)
      this.$emit('start-selection')
    }
  }
}
</script>

<style>
</style>
