<template>
  <button @click="handleClick">
    <slot></slot><span class="ConfirmButton_Counter" v-if="showCounter">? ({{ counter }})</span>
  </button>
</template>

<script>
export default {
  props: {
    delay: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      counter: 0,
      showCounter: false,
      tm: null
    }
  },
  methods: {
    handleClick (e) {
      if (!this.showCounter) {
        this.showCounter = true
        this.counter = this.delay
        this.$emit('click', e)
        this.tm = setInterval(this.tick, 1000)
      } else {
        this.showCounter = false
        clearInterval(this.tm)
        this.tm = null
        this.$emit('confirm', e)
      }
    },
    tick () {
      this.counter--
      if (this.counter <= 0) {
        this.showCounter = false
        clearInterval(this.tm)
        this.tm = null
      }
    }
  }
}
</script>
