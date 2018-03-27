<template>
  <span :class="{ User: icon }">
    <router-link v-if="link" :to="userLink">{{ username }}</router-link>
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
    username: {
      type: String,
      required: true
    }
  },
  computed: {
    userLink () {
      return `/users/${this.username}`
    }
  }
}
</script>

<style>
.User::before {
    font-family: FontAwesome;
    padding-right: 0.2em;
    position: relative;
    top: 0.04em;
    content: "\f007";
}
</style>
