<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: mass move hosts to datacenter</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">hosts</label>
          <host style="display: block" v-for="host_fqdn in action.computed.host_fqdns" :fqdn="host_fqdn" :key="host_fqdn" :link="false" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">Destination</label>
          <datacenter :name="action.computed.datacenter_name" :link="false" />
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
