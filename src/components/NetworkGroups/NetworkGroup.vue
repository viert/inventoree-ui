<template>
  <span :class="{ NetworkGroup: icon }">
    <router-link v-if="link" :to="networkGroupLink">{{ name }}</router-link>
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
    networkGroupLink() {
      return `/network_groups/${this.name}`
    }
  }
}
</script>

<style>
.NetworkGroup::before {
  content: '\f6ff';
  top: 0;
}
</style>
