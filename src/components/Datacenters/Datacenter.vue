<template>
  <span :class="{ Datacenter: icon, 'Datacenter--Root': icon && root, 'Datacenter--Sub': icon && sub }">
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
    root: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    dcLink() {
      return `/datacenters/${this.name}`
    }
  }
}
</script>

<style>
.Datacenter::before {
  content: '\f1ad';
  font-weight: 400;
  top: -0.08em;
}

.Datacenter.Datacenter--Sub::before {
  font-weight: 900;
  content: '\f233';
  top: 0.04em;
}

.Datacenter.Datacenter--Root::before {
  font-weight: 400;
  content: '\f57d';
}
</style>
