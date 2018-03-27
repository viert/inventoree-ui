<template>
  <span class="Project">
    <router-link v-if="link" :to="projectLink">{{ name }}</router-link>
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
    projectLink () {
      return `/projects/${this.name}`
    }
  }
}
</script>

<style>
.Project::before {
  font-family: FontAwesome;
  padding-right: 0.2em;
  position: relative;
  content: "\f0f2";
  top: 0;
}
</style>
