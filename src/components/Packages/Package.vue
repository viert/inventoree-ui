<template>
  <span :class="{ Package: icon }">
    <router-link v-if="link" :to="packageLink">{{ name }}</router-link>
    <span v-else>{{ name }}</span>
    <span v-if="version !== null">= {{ version }}</span>
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
    },
    version: {
      default: null
    }
  },
  computed: {
    packageLink() {
      return `/packages/${this.name}`
    }
  }
}
</script>

<style>
.Package::before {
  top: 0.04em;
  font-weight: 900;
  content: '\f1b2';
}
</style>
