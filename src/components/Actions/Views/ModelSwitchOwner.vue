<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: change project owner</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">Project</label>
          <project :name="action.computed.project_name" :link="false" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">New Owner</label>
          <user :link="false" :username="action.computed.owner_username" />
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
