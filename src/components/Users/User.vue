<template>
  <span :class="{ User: icon }">
    <router-link v-if="link" :to="userLink">{{ username }}</router-link>
    <span v-else>{{ username }}</span>
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
    userLink() {
      return `/users/${this.username}`
    }
  }
}
</script>

<style>
.User::before {
  top: 0;
  content: '\f007';
}
</style>
