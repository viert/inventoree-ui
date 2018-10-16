<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: {{ actionMessage }}</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">User</label>
          <user :username="action.computed.username" :link="false" />
        </div>
      </div>
      <div class="col-sm-6">
        <status-fields :status="action.status" :errors="action.errors" />
        <request-details :params="action.params" :details="action.computed" />
      </div>
    </div>
  </div>
</template>

<script>
import ActionViewMixin from '@/mixins/ActionViewMixin'
export default {
  mixins: [ActionViewMixin],
  computed: {
    actionMessage() {
      return this.action.params.system ? 'set system flag' : 'unset system flag'
    }
  }
}
</script>
