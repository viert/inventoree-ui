<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Edit Group</h2>
        <div class="ContentHeader_Buttons">
          <router-link v-if="!create && !clone" :to="cloneLink" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-copy"></i> Clone
          </router-link>
          <router-link v-if="!create" to="/groups/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer">
        <div class="row">
          <div class="col-sm-4">
            <h5>Properties</h5>
            <div class="Form">
              <div class="Form_Field">
                <label class="Form_FieldLabel">Name</label>
                <input class="form-control" type="text" v-model="group.name" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Description</label>
                <input class="form-control" type="text" v-model="group.description" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Project</label>
                <project-picker :project="group.project" @pick="projectPicked" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Tags</label>
                <tag-editor :tags="group.tags" @add="addTag" @remove="removeTag" />
              </div>
              <div class="Form_Field Form_Field--CFE">
                <label class="Form_FieldLabel">Custom Fields</label>
                <custom-field-editor :fields="group.custom_fields" @change="cfChange" />
              </div>
              <div class="Form_Buttons">
                <button type="submit" class="btn btn-primary" @click="handleSave">Save</button>
                <confirm-button class="btn btn-danger" @confirm="handleDestroy">Destroy</confirm-button>
              </div>
            </div>
          </div>
          <div class="col-sm-7 offset-sm-1">
            <h5>Relations</h5>
            <div class="Form">
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Children</label>
                    <group-picker
                      :multi="true"
                      :isSelected="isSelected"
                      @add="addChild"
                      @remove="removeChild" />
                  </div>
                </div>
                <div class="col-sm-6">
                </div>
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
import ProjectPicker from '@/components/Picker/ProjectPicker'
import GroupPicker from '@/components/Picker/GroupPicker'
import TagEditor from '@/components/Common/TagEditor'
import CustomFieldEditor from '@/components/Common/CustomFieldEditor/CustomFieldEditor'

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
    ProjectPicker,
    GroupPicker,
    TagEditor,
    CustomFieldEditor
  },
  data () {
    return {
      group: {
        _id: null,
        name: '',
        description: '',
        children: [],
        hosts: [],
        tags: [],
        custom_fields: [],
        project: null
      },
      childrenMap: {}
    }
  },
  created () {
    if (!this.create) {
      let editorFields = [
        '_id',
        'name',
        'description',
        'children',
        'hosts',
        'tags',
        'custom_fields',
        'project'
      ]
      let { groupName } = this.$route.params
      Api.Groups.Get(groupName, editorFields)
        .then(response => {
          this.group = response.data.data[0]
          this.childrenMap = this.group.children.reduce((acc, i) => {
            acc[i._id] = i
            return acc
          }, {})
        })
    }
  },
  methods: {
    addTag (tag) {
      this.group.tags.push(tag)
    },
    removeTag (tag) {
      this.group.tags = this.host.tags.filter(i => i !== tag)
    },
    projectPicked (project) {
      this.group.project = project
    },
    cfChange (fields) {
      this.group.custom_fields = fields
    },
    handleSave () {

    },
    handleDestroy () {

    },
    isSelected (item) {
      return item._id in this.childrenMap
    },
    addChild (child) {
      this.group.children.push(child)
      this.$set(this.childrenMap, child._id, child)
    },
    removeChild (child) {
      this.group.children = this.group.children.filter(i => i._id !== child._id)
      this.$delete(this.childrenMap, child._id)
    }
  },
  computed: {
    cloneLink () {
      return `/groups/${this.$route.params.groupName}/clone`
    }
  }
}
</script>
