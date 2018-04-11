<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: mass move {{ model }}</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="Card_Field">
          <label class="Card_FieldLabel">Status</label>
          <span :class="{ 'text-danger': isFailure, 'text-success': isSuccess }">{{action.status}}</span>
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">{{ model }}s</label>
          <div v-if="model == 'group'">
            <group style="display: block" v-for="group_name in action.computed.group_names" :name="group_name" :key="group_name" :link="false" />
          </div>
          <div v-else-if="model == 'host'">
            <host style="display: block" v-for="host_fqdn in action.computed.host_fqdns" :fqdn="host_fqdn" :key="host_fqdn" :link="false" />
          </div>
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">Destination</label>
          <group v-if="model == 'host'" :name="action.computed.group_name" :link="false" />
          <project v-else-if="model == 'group'" :name="action.computed.project_name" :link="false" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">Request Details</label>
          <param-list :params="actionDetails" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">Request Payload</label>
          <param-list :params="action.params" />
        </div>
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
