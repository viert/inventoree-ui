<template>
  <span @click="selectAll" class="AuthToken">{{token}}</span>
</template>

<script>
import SelectAllMixin from '@/mixins/SelectAllMixin'
export default {
  props: {
    token: {
      type: String,
      required: true
    }
  },
  mixins: [SelectAllMixin]
}
</script>

<style>
.AuthToken {
  font-size: 0.7em;
}
</style>
