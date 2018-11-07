<template>
  <span :class="{ Group: icon }">
    <router-link v-if="link" :to="groupLink">{{ name }}</router-link>
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
    groupLink() {
      return `/groups/${this.name}`
    }
  }
}
</script>

<style>
.Group::before {
  top: 0.04em;
  font-weight: 400;
  content: '\f07b';
}
</style>
