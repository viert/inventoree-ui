<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Edit Host</h2>
        <div class="ContentHeader_Buttons">
          <router-link
            v-if="!create && !clone"
            :to="cloneLink"
            class="btn btn-success btn-sm text-uppercase"
          >
            <i class="fa fa-copy"></i> Clone
          </router-link>
          <router-link
            v-if="!create"
            to="/hosts/++/edit"
            class="btn btn-success btn-sm text-uppercase"
          >
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div
        class="PageContentContainer"
        :class="{ 'PageContentContainer--Half': !clone && !create }"
      >
        <div class="row">
          <div :class="{ 'col-sm-12': !clone && !create, 'col-sm-6': clone || create }">
            <h5>Properties</h5>
            <div class="Form">
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Fqdn</label>
                    <input class="form-control" type="text" v-model="host.fqdn">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Description</label>
                    <input class="form-control" type="text" v-model="host.description">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Group</label>
                    <group-picker
                      :group="host.group"
                      @clear="host.group = null"
                      @pick="groupPicked"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Datacenter</label>
                    <datacenter-picker
                      :datacenter="host.datacenter"
                      @clear="host.datacenter = null"
                      @pick="datacenterPicked"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Network Group</label>
                    <network-group-picker
                      :network-group="host.network_group"
                      @clear="host.network_group = null"
                      @pick="networkGroupPicked"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Aliases</label>
                    <list-editor :items="host.aliases" @change="aliasesChange"/>
                  </div>
                </div>
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Tags</label>
                <tag-editor :tags="host.tags" @add="addTag" @remove="removeTag"/>
              </div>
              <div class="Form_Field Form_Field--CFE">
                <label class="Form_FieldLabel">Custom Data</label>
                <yaml-editor :value="yamlData" @change="handleCustomDataChange"/>
              </div>
              <div class="Form_Buttons">
                <button type="submit" class="btn btn-primary" @click="handleSave">Save</button>
                <confirm-button class="btn btn-danger" @confirm="handleDestroy">Destroy</confirm-button>
              </div>
            </div>
          </div>
          <div class="col-sm-6" v-if="clone || create">
            <div v-if="hostList.length === 0">
              <h5>How to create multiple host records</h5>
              <p>
                You can create multiple records in one step. To do it use hostname patterns instead of fqdn.
                Available patterns are described below:
              </p>
              <p></p>
              <pre style="display: inline">[<span style="color: red">VAL1</span>-<span style="color: red">VAL2</span>]</pre>will interpolate
              from VAL1 to VAL2, i.e. [0-9] will produce 0,1,2,3,...,9
              <p></p>
              <pre style="display: inline">[<span style="color: red">VAL1</span>,<span style="color: red">VAL2</span>,<span style="color: red">VAL3</span>]</pre>will produce a sequence, i.e. [0,3,8,b] will produce 0,3,8,b
              <p>
                Combining those you can produce long and complex list of hostnames in a flexible way.
                Try typing something like
              </p>
              <pre style="display: inline">srv[00-12][a,b,f].example.com</pre>and see the result
              <h5>Aliases with multiple host creation</h5>
              <p>
                You can still use aliases with multiple hosts.
                Use
                <span
                  style="color: red"
                >$1</span>,
                <span style="color: red">$2</span> etc. syntax to match your FQDN pattern expressions.
                <br>For example, for pattern
              </p>
              <pre style="display: inline">srv[00-12][a,b,f].example.com</pre>the first host generated will be
              <pre style="display: inline">srv00a.example.com</pre>and thus, there will be vars available:
              <span style="color: red">$0</span> = srv00a.example.com,
              <span style="color: red">$1</span> = 00,
              <span style="color: red">$2</span> = a.
              <br>Alias pattern
              <pre style="display: inline">int.srv$1$2.mycompany.io</pre>will generate
              <pre style="display: inline">int.srv00a.mycopmany.io</pre>correspondingly.
            </div>
            <div v-else>
              <h5>Multiple host records will be created</h5>
              <ul class="RelationsList">
                <li class="RelationsList_Item" v-for="hostname in hostList" :key="hostname">
                  <host :fqdn="hostname" :link="false"/>
                </li>
              </ul>
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
import GroupPicker from '@/components/Picker/GroupPicker'
import DatacenterPicker from '@/components/Picker/DatacenterPicker'
import NetworkGroupPicker from '@/components/Picker/NetworkGroupPicker'
import TagEditor from '@/components/Common/TagEditor'
import YamlEditor from '@/components/Common/YamlEditor'
import ListEditor from '@/components/Common/ListEditor'
import { hasValidPatterns, expandPattern } from '@/lib/Permutation'

const editorFields = [
  '_id',
  'fqdn',
  'datacenter',
  'group',
  'tags',
  'network_group',
  'local_custom_data',
  'aliases',
  'description'
]

export default {
  props: {
    create: {
      type: Boolean,
      required: true
    },
    clone: {
      type: Boolean,
      required: true
    }
  },
  components: {
    GroupPicker,
    DatacenterPicker,
    NetworkGroupPicker,
    YamlEditor,
    TagEditor,
    ListEditor
  },
  data() {
    return {
      host: {
        _id: null,
        fqdn: '',
        description: '',
        tags: [],
        local_custom_data: {},
        aliases: [],
        group: null,
        datacenter: null,
        network_group: null
      },
      hostList: [],
      yamlData: ''
    }
  },
  created() {
    this.reload()
  },
  methods: {
    handleCustomDataChange(value) {
      this.yamlData = value
      this.host.local_custom_data = yaml.safeLoad(value)
    },
    reload() {
      if (!this.create) {
        let { hostName } = this.$route.params
        Api.Hosts.Get(hostName, editorFields)
          .then(response => {
            this.host = response.data.data[0]
            this.createYaml()
          })
          .catch(status => {
            if (status === 404) {
              this.$router.push('/hosts')
            }
          })
      } else {
        this.host = {
          _id: null,
          fqdn: '',
          description: '',
          tags: [],
          local_custom_data: {},
          aliases: [],
          group: null,
          datacenter: null
        }
        this.createYaml()
      }
    },
    createYaml() {
      this.yamlData = yaml.safeDump(this.host.local_custom_data)
    },
    addTag(tag) {
      this.host.tags.push(tag)
    },
    removeTag(tag) {
      this.host.tags = this.host.tags.filter(i => i !== tag)
    },
    groupPicked(group) {
      this.host.group = group
    },
    networkGroupPicked(networkGroup) {
      this.host.network_group = networkGroup
    },
    datacenterPicked(dc) {
      this.host.datacenter = dc
    },
    cfChange(fields) {
      this.host.custom_fields = fields
    },
    aliasesChange(aliases) {
      this.host.aliases = aliases
    },
    handleSave() {
      const { _id, fqdn, datacenter, group, description } = this.host

      const networkGroup = this.host.network_group

      let payload = {
        tags: [...this.host.tags],
        local_custom_data: { ...this.host.local_custom_data },
        aliases: [...this.host.aliases],
        description,
        group_id: group ? group._id : null,
        datacenter_id: datacenter ? datacenter._id : null,
        network_group_id: networkGroup ? networkGroup._id : null
      }
      if (this.create || this.clone) {
        if (this.hostList.length > 0) {
          payload.fqdn_pattern = fqdn
        } else {
          payload.fqdn = fqdn
        }
        Api.Hosts.Create(payload).then(response => {
          if (payload.fqdn) {
            this.$store.dispatch(
              'info',
              `Host ${payload.fqdn} successfully created`
            )
          } else {
            let createdHostnames = response.data.data.map(h => h.fqdn)
            this.$store.dispatch(
              'info',
              `Hosts successfully created: ${createdHostnames.join(', ')}`
            )
          }
          this.$router.push('/hosts')
        })
      } else {
        payload.fqdn = fqdn
        Api.Hosts.Update(_id, payload).then(() => {
          this.$store.dispatch(
            'info',
            `Host ${payload.fqdn} successfully updated`
          )
          this.$router.push('/hosts')
        })
      }
    },
    handleDestroy() {
      Api.Hosts.Delete(this.host._id).then(() => {
        this.$store.dispatch(
          'info',
          `Host ${this.host.fqdn} successfully deleted`
        )
        this.$router.push('/hosts')
      })
    }
  },
  computed: {
    cloneLink() {
      return `/hosts/${this.$route.params.hostName}/clone`
    }
  },
  watch: {
    '$route.params.hostName'() {
      this.reload()
    },
    'host.fqdn'(fqdn) {
      if (this.clone || this.create) {
        if (hasValidPatterns(fqdn)) {
          let i = 0
          let hosts = []
          for (var host of expandPattern(fqdn)) {
            hosts.push(host)
            i++
            if (i === 20) {
              hosts.push('...')
              break
            }
          }
          this.hostList = hosts
        } else {
          this.hostList = []
        }
      }
    }
  }
}
</script>
