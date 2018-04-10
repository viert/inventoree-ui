<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View Host</h2>
        <div class="ContentHeader_Buttons">
          <router-link :to="editLink" v-if="host.modification_allowed" class="btn btn-primary btn-sm text-uppercase">
            <i class="fa fa-edit"></i> Edit
          </router-link>
          <router-link :to="cloneLink" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-copy"></i> Clone
          </router-link>
          <router-link to="/hosts/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="Card">
          <div class="CardHeader">
            <h3><host :fqdn="host.fqdn" :link="false" /></h3>
            <div class="Card_Field">{{host.description}}</div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Aliases</label>
                <div v-for="alias in host.aliases" :key="alias">
                  <host :link="false" :fqdn="alias" />
                </div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Tags</label>
                <div class="Card_TagList">
                  <tag
                    v-for="tag in host.all_tags"
                    :derived="!host.tags.includes(tag)"
                    :name="tag"
                    :key="tag" />
                </div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Custom Fields</label>
                <custom-field
                  v-for="cf in host.all_custom_fields"
                  :key="cf.key"
                  :cfKey="cf.key"
                  :cfValue="cf.value" />
              </div>
            </div>
            <div class="col-sm-7">
              <div class="Card_Field" v-if="host.group_name">
                <label class="Card_FieldLabel">Group</label>
                <div><group :name="host.group_name"/></div>
              </div>
              <div class="Card_Field" v-if="host.datacenter_name" >
                <label class="Card_FieldLabel">Datacenter</label>
                <div><datacenter :name="host.datacenter_name"/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Api from '@/api'
import Tag from '@/components/Common/Tag'
import CustomField from '@/components/Common/CustomField'

export default {
  components: {
    Tag,
    CustomField
  },
  data () {
    return {
      host: {
        fqdn: '',
        description: '',
        tags: [],
        all_tags: [],
        custom_fields: [],
        all_custom_fields: [],
        group_name: null,
        modification_allowed: false,
        datacenter_name: null
      }
    }
  },
  computed: {
    editLink () {
      return `/hosts/${this.host.fqdn}/edit`
    },
    cloneLink () {
      return `/hosts/${this.host.fqdn}/clone`
    }
  },
  methods: {
    loadData () {
      let { hostName } = this.$route.params
      Api.Hosts.Get(hostName)
        .then(response => {
          this.host = response.data.data[0]
        })
    }
  },
  created () {
    this.loadData()
  },
  watch: {
    '$route.params.hostName' () {
      this.loadData()
    }
  }
}
</script>

<style>

</style>
