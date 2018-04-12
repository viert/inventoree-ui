<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: set group's hosts</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">Group</label>
          <datacenter :name="action.computed.group_name" :link="false" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">Hosts</label>
          <host
            v-for="(host_fqdn, i) in action.computed.host_fqdns"
            :key="i"
            :link="false"
            :fqdn="host_fqdn"
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
