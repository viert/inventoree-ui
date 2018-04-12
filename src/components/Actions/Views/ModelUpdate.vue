<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: update {{ model }}</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">{{ model }}</label>
          <project v-if="model == 'project'" :name="action.computed.project_name" :link="false" />
          <group v-else-if="model == 'group'" :name="action.computed.group_name" :link="false" />
          <datacenter v-else-if="model == 'datacenter'" :name="action.computed.datacenter_name" :link="false" />
          <user v-else-if="model == 'user'" :username="action.computed.username" :link="false" />
          <host v-else-if="model == 'host'" :fqdn="action.computed.host_fqdn" :link="false" />
        </div>
        <div v-if="updatedFields" class="Card_Field">
          <label class="Card_FieldLabel">Updated Fields</label>
          <param-list :params="updatedFields" />
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
