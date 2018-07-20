<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Edit Project</h2>
        <div class="ContentHeader_Buttons">
          <router-link v-if="!create" to="/projects/++/edit" class="btn btn-success btn-sm text-uppercase">
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
                <input class="form-control" type="text" v-model="project.name" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Description</label>
                <input class="form-control" type="text" v-model="project.description" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Email</label>
                <input class="form-control" type="text" v-model="project.email" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Root Email</label>
                <input class="form-control" type="text" v-model="project.root_email" />
              </div>
              <div class="Form_Buttons">
                <button type="submit" class="btn btn-primary" @click="handleSave">Save</button>
                <confirm-button class="btn btn-danger" @confirm="handleDestroy">Destroy</confirm-button>
              </div>
            </div>
          </div>
          <div v-if="!create" class="col-sm-7 offset-sm-1">
            <h5>Project Users</h5>
            <div class="Form">
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Members</label>
                    <user-picker
                      :multi="true"
                      :inline="true"
                      :isSelected="isSelected"
                      @add="addMember"
                      @remove="removeMember" />
                  </div>
                  <ul class="ListSelected">
                    <li
                      v-for="member in project.members"
                      :key="member._id"
                      :inline="true"
                      @click="removeMember(member)"
                      class="ListSelected_Item">
                      {{member.username}}
                    </li>
                  </ul>
                  <div class="Form_Buttons">
                    <button type="submit" class="btn btn-primary" @click="handleSaveMembers">Save Members</button>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Owner</label>
                    <user-picker
                      :multi="false"
                      :inline="false"
                      :user="project.owner"
                      @clear="ownerClear"
                      @pick="ownerPicked" />
                  </div>
                  <div class="Form_Buttons">
                    <confirm-button type="submit" class="btn btn-danger" @confirm="handleChangeOwner">Change Owner</confirm-button>
                  </div>
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
import UserPicker from '@/components/Picker/UserPicker'

const editorFields = [
  '_id',
  'name',
  'description',
  'owner',
  'members',
  'email',
  'root_email'
]

export default {
  props: {
    create: {
      type: Boolean,
      required: true
    }
  },
  components: {
    UserPicker
  },
  data() {
    return {
      project: {
        _id: null,
        name: '',
        description: '',
        email: '',
        root_email: '',
        owner: { username: '' },
        members: []
      },
      memberMap: {}
    }
  },
  created() {
    this.reload()
  },
  methods: {
    reload() {
      if (!this.create) {
        let { projectName } = this.$route.params
        Api.Projects.Get(projectName, editorFields)
          .then(response => {
            this.project = response.data.data[0]
            this.memberMap = this.project.members.reduce((acc, i) => {
              acc[i._id] = i
              return acc
            }, {})
          })
          .catch(status => {
            if (status === 404) {
              this.$router.push('/projects')
            }
          })
      } else {
        this.project = {
          _id: null,
          name: '',
          description: '',
          email: '',
          root_email: '',
          owner: { username: '' },
          members: []
        }
        this.memberMap = {}
      }
    },
    ownerPicked(owner) {
      this.project.owner = owner
    },
    ownerClear() {
      this.project.owner._id = null
    },
    handleSave() {
      let { name, description, email } = this.project
      let payload = {
        name,
        description,
        email,
        root_email: this.project.root_email
      }
      if (this.create) {
        Api.Projects.Create(payload).then(response => {
          let { name } = payload
          this.$store.dispatch(
            'info',
            `Project ${name} has been created, you can now add project members`
          )
          this.$router.push(`/projects/${name}`)
        })
      } else {
        Api.Projects.Update(this.project._id, payload, editorFields).then(
          response => {
            this.$store.dispatch(
              'info',
              `Project ${name} has been updated, be sure to save project members if you made any changes`
            )
          }
        )
      }
    },
    handleDestroy() {
      Api.Projects.Delete(this.project._id).then(() => {
        this.$store.dispatch(
          'info',
          `Project ${this.project.name} has been deleted successfully`
        )
        this.$router.push('/projects')
      })
    },
    handleSaveMembers() {
      let memberIds = this.project.members.map(i => i._id)
      Api.Projects.SetMembers(this.project._id, memberIds).then(() => {
        this.$store.dispatch(
          'info',
          `Project ${this.project.name} members have been updated`
        )
      })
    },
    handleChangeOwner() {
      Api.Projects.ChangeOwner(this.project._id, this.project.owner._id).then(
        () => {
          this.$store.dispatch(
            'info',
            `Project ${this.project.name} owner has been changed`
          )
        }
      )
    },
    isSelected(item) {
      return item._id in this.memberMap
    },
    addMember(member) {
      this.project.members.push(member)
      this.$set(this.memberMap, member._id, member)
    },
    removeMember(member) {
      this.project.members = this.project.members.filter(
        i => i._id !== member._id
      )
      this.$delete(this.memberMap, member._id)
    }
  },
  watch: {
    '$route.params.projectName'() {
      this.reload()
    }
  }
}
</script>
