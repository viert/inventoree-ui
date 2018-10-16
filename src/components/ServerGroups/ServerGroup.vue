<template>
  <span :class="{ ServerGroup: icon }">
    <router-link v-if="link" :to="serverGroupLink">{{ name }}</router-link>
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
    serverGroupLink() {
      return `/server_groups/${this.name}`
    }
  }
}
</script>

<style>
.ServerGroup::before {
  content: '\f6ff';
  top: 0;
}
</style>
