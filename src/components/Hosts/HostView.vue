<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View Host</h2>
        <div class="ContentHeader_Buttons">
          <router-link
            :to="editLink"
            v-if="host.modification_allowed"
            class="btn btn-primary btn-sm text-uppercase"
          >
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
      <div class="PageContentContainer">
        <div class="Card">
          <div class="CardHeader">
            <h3>
              <host :fqdn="host.fqdn" :link="false"/>
              <span v-if="host.ext_id" class="CardHeader_Small">
                Ext ID:
                <span>{{ host.ext_id }}</span>
              </span>
            </h3>
            <div class="Card_Field">{{host.description}}</div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="Card_Field">
                    <label class="Card_FieldLabel">Id</label>
                    <div @click="selectAll">{{host._id}}</div>
                  </div>
                  <div class="Card_Field">
                    <label class="Card_FieldLabel">Aliases</label>
                    <div v-for="alias in host.aliases" :key="alias">
                      <host :link="false" :fqdn="alias"/>
                    </div>
                  </div>
                  <div class="Card_Field">
                    <label class="Card_FieldLabel">Tags</label>
                    <div class="Card_TagList">
                      <tag
                        v-for="tag in host.all_tags"
                        :derived="!host.tags.includes(tag)"
                        :name="tag"
                        :key="tag"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="Card_Field" v-if="host.group_name">
                    <label class="Card_FieldLabel">Group</label>
                    <div>
                      <group :name="host.group_name"/>
                    </div>
                  </div>
                  <div class="Card_Field" v-if="host.datacenter_name">
                    <label class="Card_FieldLabel">Datacenter</label>
                    <div>
                      <datacenter :name="host.datacenter_name"/>
                    </div>
                  </div>
                  <div class="Card_Field" v-if="host.server_group_name">
                    <label class="Card_FieldLabel">Server Group</label>
                    <div>
                      <server-group :name="host.server_group_name"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Custom Data (including inherited)</label>
                <yaml-editor :value="yamlData" :readOnly="true"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import yaml from 'js-yaml'
import Api from '@/api'
import Tag from '@/components/Common/Tag'
import YamlEditor from '@/components/Common/YamlEditor'
import SelectAllMixin from '@/mixins/SelectAllMixin'

export default {
  components: {
    Tag,
    YamlEditor
  },
  mixins: [SelectAllMixin],
  data() {
    return {
      host: {
        fqdn: '',
        ext_id: '',
        description: '',
        tags: [],
        all_tags: [],
        custom_fields: [],
        custom_data: [],
        group_name: null,
        modification_allowed: false,
        datacenter_name: null
      },
      yamlData: ''
    }
  },
  computed: {
    editLink() {
      return `/hosts/${this.host.fqdn}/edit`
    },
    cloneLink() {
      return `/hosts/${this.host.fqdn}/clone`
    }
  },
  methods: {
    loadData() {
      let { hostName } = this.$route.params
      Api.Hosts.Get(hostName)
        .then(response => {
          this.host = response.data.data[0]
          this.createYaml()
        })
        .catch(status => {
          if (status === 404) {
            this.$router.push('/hosts')
          }
        })
    },
    createYaml() {
      this.yamlData = yaml.safeDump(this.host.custom_data)
    }
  },
  created() {
    this.loadData()
  },
  watch: {
    '$route.params.hostName'() {
      this.loadData()
    }
  }
}
</script>

<style>
.CardHeader_Small {
  font-size: 0.5em;
  font-weight: lighter;
}
</style>
