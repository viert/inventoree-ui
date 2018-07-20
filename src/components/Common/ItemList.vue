<template>
  <div class="item-list">
    <div class="item-list_no-items-message" v-if="count === 0">
      <div v-if="filter === ''">You don't have any items to show yet</div>
      <div v-else>You don't have any items matching filter criteria</div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>
.item-list {
}

.item-list_no-items-message {
  text-align: center;
  font-size: 18px;
  margin-top: calc(50vh - 140px);
  text-transform: uppercase;
}
</style>
