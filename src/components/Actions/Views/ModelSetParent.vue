<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: set parent datacenter</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">Datacenter</label>
          <datacenter :name="action.computed.datacenter_name" :link="false" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">New Parent</label>
          <datacenter v-if="action.computed.parent_name" :link="false" :name="action.computed.parent_name" />
          <datacenter v-else :link="false" :root="true" name="root" />
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
  mixins: [
    ActionViewMixin
  ]
}
</script>
