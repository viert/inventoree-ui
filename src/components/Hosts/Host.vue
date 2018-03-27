<template>
  <span class="Host">
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
    fqdn: {
      type: String,
      required: true
    }
  },
  computed: {
    hostLink () {
      return `/hosts/${this.fqdn}`
    }
  }
}
</script>

<style>
.Host::before {
  font-family: FontAwesome;
  padding-right: 0.2em;
  position: relative;
  top: 0.04em;
  content: "\f109";
}
</style>
