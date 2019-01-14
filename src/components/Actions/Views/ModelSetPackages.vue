<template>
  <div class="Card">
    <div class="CardHeader">
      <h3>Action: set packages on host</h3>
      <div class="Card_Field">Invoked by
        <user :username="action.username" :link="false"/>
        , {{ actionDatetime }}
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="Card_Field">
          <label class="Card_FieldLabel">Host</label>
          <work-group :name="action.computed.host_fqdn" :link="false"/>
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">Packages</label>
          <package
            v-for="(pkg, i) in action.computed.packages"
            :key="i"
            :name="pkg.name"
            :version="pkg.version"
            :link="false"
            style="display: block"
          />
        </div>
      </div>
      <div class="col-sm-6">
        <status-fields :status="action.status" :errors="action.errors"/>
        <request-details :params="action.params" :details="action.computed"/>
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
