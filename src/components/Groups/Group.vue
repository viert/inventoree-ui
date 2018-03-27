<template>
  <span class="Group">
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
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    groupLink () {
      return `/groups/${this.name}`
    }
  }
}
</script>

<style>
.Group::before {
  font-family: FontAwesome;
  padding-right: 0.2em;
  position: relative;
  top: 0.04em;
  content: "\f114";
}
</style>
