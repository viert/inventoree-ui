<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Edit Host</h2>
        <div class="ContentHeader_Buttons">
          <router-link v-if="!create && !clone" :to="cloneLink" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-copy"></i> Clone
          </router-link>
          <router-link v-if="!create" to="/hosts/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="row">
          <div class="col-sm-12">
            <h5>Properties</h5>
            <div class="Form">
              <div class="Form_Field">
                <label class="Form_FieldLabel">Fqdn</label>
                <input class="form-control" type="text" v-model="host.fqdn" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Description</label>
                <input class="form-control" type="text" v-model="host.description" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Group</label>
                <group-picker :group="host.group" @pick="groupPicked" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Datacenter</label>
                <datacenter-picker :datacenter="host.datacenter" @pick="datacenterPicked" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Tags</label>
                <tag-editor :tags="host.tags" @add="addTag" @remove="removeTag" />
              </div>
              <div class="Form_Field Form_Field--CFE">
                <label class="Form_FieldLabel">Custom Fields</label>
                <custom-field-editor :fields="host.custom_fields" @change="cfChange" />
              </div>
              <div class="Form_Buttons">
                <button type="submit" class="btn btn-primary" @click="handleSave">Save</button>
                <confirm-button class="btn btn-danger" @confirm="handleDestroy">Destroy</confirm-button>
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
import GroupPicker from '@/components/Picker/GroupPicker'
import DatacenterPicker from '@/components/Picker/DatacenterPicker'
import TagEditor from '@/components/Common/TagEditor'
import CustomFieldEditor from '@/components/Common/CustomFieldEditor/CustomFieldEditor'

const editorFields = [
  '_id',
  'fqdn',
  'datacenter',
  'group',
  'tags',
  'custom_fields',
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
    TagEditor,
    CustomFieldEditor
  },
  data () {
    return {
      host: {
        _id: null,
        fqdn: '',
        description: '',
        tags: [],
        custom_fields: [],
        group: null,
        datacenter: null
      }
    }
  },
  created () {
    this.reload()
  },
  methods: {
    reload () {
      if (!this.create) {
        let { hostName } = this.$route.params
        Api.Hosts.Get(hostName, editorFields)
          .then(response => {
            this.host = response.data.data[0]
          })
      } else {
        this.host = {
          _id: null,
          fqdn: '',
          description: '',
          tags: [],
          custom_fields: [],
          group: null,
          datacenter: null
        }
      }
    },
    addTag (tag) {
      this.host.tags.push(tag)
    },
    removeTag (tag) {
      this.host.tags = this.host.tags.filter(i => i !== tag)
    },
    groupPicked (group) {
      this.host.group = group
    },
    datacenterPicked (dc) {
      this.host.datacenter = dc
    },
    cfChange (fields) {
      this.host.custom_fields = fields
    },
    handleSave () {
      let { _id, fqdn, datacenter, group, description } = this.host
      let payload = {
        fqdn,
        tags: [...this.host.tags],
        custom_fields: [...this.host.custom_fields],
        description,
        group_id: group ? group._id : null,
        datacenter_id: datacenter ? datacenter._id : null
      }
      if (this.create || this.clone) {
        Api.Hosts.Create(payload)
          .then(() => {
            this.$store.dispatch('info', `Host ${payload.fqdn} successfully created`)
            this.$router.push('/hosts')
          })
      } else {
        Api.Hosts.Update(_id, payload)
          .then(() => {
            this.$store.dispatch('info', `Host ${payload.fqdn} successfully updated`)
            this.$router.push('/hosts')
          })
      }
    },
    handleDestroy () {
      Api.Hosts.Delete(this.host._id)
        .then(() => {
          this.$store.dispatch('info', `Host ${this.host.fqdn} successfully deleted`)
          this.$router.push('/hosts')
        })
    }
  },
  computed: {
    cloneLink () {
      return `/hosts/${this.$route.params.hostName}/clone`
    }
  },
  watch: {
    '$route.params.hostName' () {
      this.reload()
    }
  }
}
</script>
