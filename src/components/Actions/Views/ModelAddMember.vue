<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: add workgroup member</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">WorkGroup</label>
          <work-group :name="action.computed.work_group_name" :link="false" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">New Member</label>
          <user :link="false" :username="action.computed.user_name" />
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
  mixins: [ActionViewMixin]
}
</script>
