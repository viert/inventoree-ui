<template>
  <div>
    <div v-if="details" class="Card_Field">
      <label class="Card_FieldLabel">Request Details</label>
      <param-list :params="actionDetails" />
    </div>
    <div v-if="params" class="Card_Field">
      <label class="Card_FieldLabel">Request Payload</label>
      <param-list :params="params" />
    </div>
  </div>
</template>

<script>
import ParamList from '@/components/Actions/Views/ParamList'

export default {
  props: {
    params: {
      type: Object
    },
    details: {
      type: Object
    }
  },
  components: {
    ParamList
  },
  computed: {
    actionDetails () {
      let details = {}
      for (var key in this.details) {
        if (key !== this.model + '_data') {
          details[key] = this.details[key]
        }
      }
      return details
    }
  }
}
</script>

<style>

</style>
