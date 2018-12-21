<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Edit Group</h2>
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
            to="/groups/++/edit"
            class="btn btn-success btn-sm text-uppercase"
          >
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer">
        <div class="row">
          <div class="col-sm-7">
            <h5>Properties</h5>
            <div class="Form">
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Name</label>
                    <input class="form-control" type="text" v-model="group.name">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Description</label>
                    <input class="form-control" type="text" v-model="group.description">
                  </div>
                </div>
              </div>
              <div v-if="create || clone" class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Parent Group</label>
                    <group-picker :group="parent" @pick="parentPicked"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">WorkGroup</label>
                    <work-group-picker :work-group="group.work_group" @pick="workGroupPicked"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Tags</label>
                    <tag-editor :tags="group.tags" @add="addTag" @remove="removeTag"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Custom Data</label>
                    <yaml-editor :value="yamlData" @change="handleCustomDataChange"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!create && !clone" class="col-sm-5">
            <div class="RelationsHeader">
              <h5 class="RelationsHeader_Title">Relations</h5>
              <div class="RelationsHeader_Buttons">
                <button
                  type="submit"
                  class="btn btn-xs"
                  :class="{'btn-warning': relationsModified}"
                  :disabled="!relationsModified"
                  @click="handleSaveRelations"
                >Save Changes</button>
              </div>
            </div>
            <div class="Form">
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Children</label>
                    <group-picker
                      :multi="true"
                      :inline="true"
                      :isSelected="isSelected"
                      @add="addChild"
                      @remove="removeChild"
                    />
                  </div>
                  <ul class="ListSelected">
                    <li
                      v-for="cgroup in group.children"
                      :key="cgroup._id"
                      @click="removeChild(cgroup)"
                      class="ListSelected_Item"
                    >{{cgroup.name}}</li>
                  </ul>
                </div>
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Hosts</label>
                    <host-picker
                      :multi="true"
                      :inline="true"
                      :isSelected="isHostSelected"
                      @add="addHost"
                      @remove="removeHost"
                    />
                  </div>
                  <ul class="ListSelected">
                    <li
                      @click="removeHost(chost)"
                      class="ListSelected_Item"
                      v-for="chost in group.hosts"
                      :key="chost._id"
                    >{{chost.fqdn}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="Form_Buttons">
              <button type="submit" class="btn btn-primary" @click="handleSave">Save</button>
              <confirm-button class="btn btn-danger" @confirm="handleDestroy">Destroy</confirm-button>
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
import WorkGroupPicker from '@/components/Picker/WorkGroupPicker'
import GroupPicker from '@/components/Picker/GroupPicker'
import HostPicker from '@/components/Picker/HostPicker'
import TagEditor from '@/components/Common/TagEditor'
import YamlEditor from '@/components/Common/YamlEditor'

const editorFields = [
  '_id',
  'name',
  'description',
  'children',
  'hosts',
  'tags',
  'local_custom_data',
  'work_group'
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
    WorkGroupPicker,
    GroupPicker,
    HostPicker,
    TagEditor,
    YamlEditor
  },
  data() {
    return {
      group: {
        _id: null,
        name: '',
        description: '',
        children: [],
        hosts: [],
        tags: [],
        local_custom_data: {},
        work_group: null
      },
      parent: null,
      childrenMap: {},
      hostMap: {},
      relationsModified: false,
      yamlData: ''
    }
  },
  created() {
    this.reload()
  },
  methods: {
    handleCustomDataChange(value) {
      this.yamlData = value
      this.group.local_custom_data = yaml.safeLoad(value)
    },
    handleResponse(group) {
      this.group = group
      this.childrenMap = this.group.children.reduce((acc, i) => {
        acc[i._id] = i
        return acc
      }, {})
      this.hostMap = this.group.hosts.reduce((acc, i) => {
        acc[i._id] = i
        return acc
      }, {})
      this.createYaml()
    },
    reload() {
      if (!this.create) {
        let { groupName } = this.$route.params
        Api.Groups.Get(groupName, editorFields)
          .then(response => {
            this.handleResponse(response.data.data[0])
          })
          .catch(status => {
            if (status === 404) {
              this.$router.push('/groups')
            }
          })
      } else {
        this.group = {
          _id: null,
          name: '',
          description: '',
          children: [],
          hosts: [],
          tags: [],
          local_custom_data: {},
          work_group: null
        }
        this.childrenMap = {}
        this.hostMap = {}
        this.createYaml()
      }
    },
    createYaml() {
      this.yamlData = yaml.safeDump(this.group.local_custom_data)
    },
    addTag(tag) {
      this.group.tags.push(tag)
    },
    removeTag(tag) {
      this.group.tags = this.group.tags.filter(i => i !== tag)
    },
    workGroupPicked(workGroup) {
      this.group.work_group = workGroup
      // remove current parent if it doesn't match the workgroup picked
      if (this.parent && this.parent.work_group_id !== workGroup._id) {
        this.parent = null
      }
    },
    parentPicked(parentGroup) {
      this.parent = parentGroup
      // set workgroup matching the picked parent
      Api.WorkGroups.Get(parentGroup.work_group_id).then(response => {
        this.group.work_group = response.data.data[0]
      })
    },
    handleSave() {
      let { name, description, tags } = this.group
      let payload = {
        name,
        description,
        tags,
        local_custom_data: this.group.local_custom_data,
        work_group_id: this.group.work_group ? this.group.work_group._id : null
      }
      if (this.create || this.clone) {
        if (this.parent && this.parent._id) {
          payload.parent_group_id = this.parent._id
        }
        Api.Groups.Create(payload).then(response => {
          let { name } = payload
          this.$store.dispatch(
            'info',
            `Group ${name} has been created, you can now add group's relations`
          )
          this.$router.push(`/groups/${name}/edit`)
        })
      } else {
        Api.Groups.Update(this.group._id, payload, editorFields).then(
          response => {
            this.handleResponse(response.data.data)
            this.$store.dispatch(
              'info',
              `Group ${name} has been updated, be sure to save group's relations if you made any changes`
            )
          }
        )
      }
    },
    handleDestroy() {
      Api.Groups.Delete(this.group._id).then(() => {
        this.$store.dispatch(
          'info',
          `Group ${this.group.name} has been deleted successfully`
        )
        this.$router.push('/groups')
      })
    },
    handleSaveRelations() {
      let childIds = this.group.children.map(i => i._id)
      let hostIds = this.group.hosts.map(i => i._id)
      let { _id } = this.group
      Api.Groups.SetChildren(_id, childIds, ['children']).then(response => {
        let { children } = response.data.data
        this.group.children = children
        this.$store.dispatch(
          'info',
          `Group's children have been successfully updated`
        )
        this.relationsModified = false
      })
      Api.Groups.SetHosts(_id, hostIds, ['hosts']).then(response => {
        let { hosts } = response.data.data
        this.group.hosts = hosts
        this.$store.dispatch(
          'info',
          `Group's hosts have been successfully updated`
        )
        this.relationsModified = false
      })
    },
    isSelected(item) {
      return item._id in this.childrenMap
    },
    isHostSelected(item) {
      return item._id in this.hostMap
    },
    addChild(child) {
      this.group.children.push(child)
      this.$set(this.childrenMap, child._id, child)
      this.relationsModified = true
    },
    removeChild(child) {
      this.group.children = this.group.children.filter(i => i._id !== child._id)
      this.$delete(this.childrenMap, child._id)
      this.relationsModified = true
    },
    addHost(host) {
      this.group.hosts.push(host)
      this.$set(this.hostMap, host._id, host)
      this.relationsModified = true
    },
    removeHost(host) {
      this.group.hosts = this.group.hosts.filter(i => i._id !== host._id)
      this.$delete(this.hostMap, host._id)
      this.relationsModified = true
    }
  },
  computed: {
    cloneLink() {
      return `/groups/${this.$route.params.groupName}/clone`
    }
  },
  watch: {
    '$route.params.groupName'() {
      this.reload()
    }
  }
}
</script>

<style>
.RelationsHeader {
  display: flex;
}

.RelationsHeader_Title {
  flex-grow: 1;
}
</style>
