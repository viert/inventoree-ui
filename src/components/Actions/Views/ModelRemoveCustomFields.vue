<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: remove custom fields from {{ modelName }}</h3>
      <div class="Card_Field">Invoked by <user :username="action.username" :link="false" />, {{ actionDatetime }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">{{ modelName }}</label>
          <host v-if="model == 'host'" :fqdn="action.computed.host_fqdn" :link="false" />
          <group v-else :name="action.computed.group_name" :link="false" />
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">Custom Fields Removed</label>
          <custom-field
            v-for="cf in action.computed.custom_fields_removed"
            :key="cf.key"
            :cf-key="cf.key"
            :cf-value="cf.value" />
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
import CustomField from '@/components/Common/CustomField'

export default {
  components: {
    CustomField
  },
  mixins: [ActionViewMixin]
}
</script>
