<template>
  <div class="alertbox-wrapper">
    <transition-group name="fade">
      <div v-for="msg in messages" :key="msg.id" class="alert" :class="msg | msgClass">
        <b v-if="msg.prefix">{{msg.prefix}}</b>
        {{ msg.text }}
        <a class="close" @click="forceRemove(msg.id)">
          <span aria-hidden="true">&times;</span>
        </a>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const messageClasses = {
  alert: 'danger',
  warning: 'warn',
  info: 'info',
  success: 'success'
}

export default {
  computed: {
    ...mapState(['messages'])
  },
  methods: {
    forceRemove (msgId) {
      this.$store.dispatch('removeMessage', msgId)
    }
  },
  filters: {
    msgClass (msg) {
      return `alert-${messageClasses[msg.type]}`
    }
  }
}
</script>

<style>
.alertbox-wrapper {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50%;
    z-index: 15;
}

.alertbox-wrapper b {
    font-weight: 700;
}

.alertbox-wrapper .alert {
    margin-bottom: 4px;
    opacity: 0.95;
    box-shadow: 0 0 4px black;
}

.alertbox-wrapper:hover .alert {
    opacity: 1;
}

.fade-enter-active {
  animation: fadeIn 0.5s;
}
.fade-leave-active {
  animation: fadeIn 0.5s reverse;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
