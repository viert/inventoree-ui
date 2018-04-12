<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: set project members</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">Project</label>
          <project :name="action.computed.project_name" :link="false" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">Members</label>
          <user
            v-for="(username, i) in action.computed.user_names"
            :key="i"
            :username="username"
            :link="false"
            style="display: block" />
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
