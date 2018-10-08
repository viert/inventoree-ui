<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: add tags to {{ modelName }}</h3>
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
          <label class="Card_FieldLabel">Tags Added</label>
          <div>
            <tag v-for="tag in action.computed.tags_added" :key="tag" :name="tag" />
          </div>
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
import Tag from '@/components/Common/Tag'

export default {
  components: {
    Tag
  },
  mixins: [ActionViewMixin]
}
</script>
