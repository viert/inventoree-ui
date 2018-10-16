<template>
  <span :class="{ Host: icon }">
    <router-link v-if="link" :to="hostLink">{{ fqdn }}</router-link>
    <span v-else>{{ fqdn }}</span>
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
    fqdn: {
      type: String,
      required: true
    }
  },
  computed: {
    hostLink() {
      return `/hosts/${this.fqdn}`
    }
  }
}
</script>

<style>
.Host::before {
  padding-right: 0.2em;
  position: relative;
  top: 0.04em;
  content: '\f109';
}
</style>
