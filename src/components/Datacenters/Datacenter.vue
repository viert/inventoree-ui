<template>
  <span :class="{ Datacenter: icon, 'Datacenter--Sub': icon && sub }">
    <router-link v-if="link" :to="dcLink">{{ name }}</router-link>
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
    sub: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    dcLink () {
      return `/datacenters/${this.name}`
    }
  }
}
</script>

<style>
.Datacenter::before {
    font-family: FontAwesome;
    padding-right: 0.2em;
    position: relative;
    content: "\f0f7";
    top: -0.08em;
}

.Datacenter.Datacenter--Sub::before {
    content: "\f233";
    top: 0.04em;
}
</style>
