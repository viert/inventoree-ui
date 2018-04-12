<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: set group's children</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">Group</label>
          <group :name="action.computed.group_name" :link="false" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">Children</label>
          <group
            v-for="(group_name, i) in action.computed.child_group_names"
            :key="i"
            :link="false"
            :name="group_name"
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
