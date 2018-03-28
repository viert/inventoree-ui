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
                <group-picker :group="host.group" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Datacenter</label>
                <datacenter-picker :datacenter="host.datacenter" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Tags</label>
                <tag-editor :tags="host.tags" @add="addTag" @remove="removeTag" />
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
    TagEditor
  },
  data () {
    return {
      host: {
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
    if (!this.create) {
      let editorFields = [
        '_id',
        'fqdn',
        'datacenter',
        'group',
        'tags',
        'custom_fields',
        'description'
      ]
      Api.Hosts.Get(this.$route.params.hostName, editorFields)
        .then(response => {
          this.host = response.data.data[0]
        })
    }
  },
  methods: {
    addTag (tag) {
      this.host.tags.push(tag)
    },
    removeTag (tag) {
      this.host.tags = this.host.tags.filter(i => i !== tag)
    }
  },
  computed: {
    cloneLink () {
      return `/hosts/${this.$route.params.hostName}/clone`
    }
  }
}
</script>

<style>

</style>
