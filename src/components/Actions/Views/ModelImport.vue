<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: import packages</h3>
      <div class="Card_Field">Invoked by
        <user :username="action.username" :link="false"/>
        , {{ actionDatetime }}
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field" v-if="action.computed.packages_created.length > 0">
          <label v-if="action.status === 'error'" class="Card_FieldLabel">packages to create</label>
          <label v-else class="Card_FieldLabel">packages created</label>
          <package
            style="display: block"
            v-for="name in action.computed.packages_created"
            :name="name"
            :key="name"
            :link="false"
          />
        </div>
        <div class="Card_Field" v-if="action.computed.packages_updated.length > 0">
          <label v-if="action.status === 'error'" class="Card_FieldLabel">packages to update</label>
          <label v-else class="Card_FieldLabel">packages updated</label>
          <package
            style="display: block"
            v-for="name in action.computed.packages_updated"
            :name="name"
            :key="name"
            :link="false"
          />
        </div>
      </div>
      <div class="col-sm-6">
        <status-fields :status="action.status" :errors="action.errors"/>
        <request-details :params="action.params"/>
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
