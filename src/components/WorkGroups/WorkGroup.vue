<template>
  <span :class="{ WorkGroup: icon }">
    <router-link v-if="link" :to="workGroupLink">{{ name }}</router-link>
    <span v-else>{{ name }}</span>
  </span>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      default: true
    },
    icon: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    workGroupLink() {
      return `/work_groups/${this.name}`
    }
  }
}
</script>

<style>
.WorkGroup::before {
  font-family: FontAwesome;
  padding-right: 0.2em;
  position: relative;
  content: '\f0c0';
  top: 0;
}
</style>
