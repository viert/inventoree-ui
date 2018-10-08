<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Edit WorkGroup</h2>
        <div class="ContentHeader_Buttons">
          <router-link v-if="!create" to="/work_groups/++/edit" class="btn btn-success btn-sm text-uppercase">
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
                <input class="form-control" type="text" v-model="work_group.name" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Description</label>
                <input class="form-control" type="text" v-model="work_group.description" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Email</label>
                <input class="form-control" type="text" v-model="work_group.email" />
              </div>
              <div class="Form_Buttons">
                <button type="submit" class="btn btn-primary" @click="handleSave">Save</button>
                <confirm-button class="btn btn-danger" @confirm="handleDestroy">Destroy</confirm-button>
              </div>
            </div>
          </div>
          <div v-if="!create" class="col-sm-7 offset-sm-1">
            <h5>WorkGroup Users</h5>
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
                      v-for="member in work_group.members"
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
                      :user="work_group.owner"
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

const editorFields = ['_id', 'name', 'description', 'owner', 'members', 'email']

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
      work_group: {
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
        let { workGroupName } = this.$route.params
        Api.WorkGroups.Get(workGroupName, editorFields)
          .then(response => {
            this.work_group = response.data.data[0]
            this.memberMap = this.work_group.members.reduce((acc, i) => {
              acc[i._id] = i
              return acc
            }, {})
          })
          .catch(status => {
            if (status === 404) {
              this.$router.push('/work_groups')
            }
          })
      } else {
        this.work_group = {
          _id: null,
          name: '',
          description: '',
          email: '',
          owner: { username: '' },
          members: []
        }
        this.memberMap = {}
      }
    },
    ownerPicked(owner) {
      this.work_group.owner = owner
    },
    ownerClear() {
      this.work_group.owner._id = null
    },
    handleSave() {
      let { name, description, email } = this.work_group
      let payload = {
        name,
        description,
        email
      }
      if (this.create) {
        Api.WorkGroups.Create(payload).then(response => {
          let { name } = payload
          this.$store.dispatch(
            'info',
            `WorkGroup ${name} has been created, you can now add its members`
          )
          this.$router.push(`/work_groups/${name}`)
        })
      } else {
        Api.WorkGroups.Update(this.work_group._id, payload, editorFields).then(
          response => {
            this.$store.dispatch(
              'info',
              `WorkGroup ${name} has been updated, be sure to save its members if you made any changes`
            )
          }
        )
      }
    },
    handleDestroy() {
      Api.WorkGroups.Delete(this.work_group._id).then(() => {
        this.$store.dispatch(
          'info',
          `WorkGroup ${this.work_group.name} has been deleted successfully`
        )
        this.$router.push('/work_groups')
      })
    },
    handleSaveMembers() {
      let memberIds = this.work_group.members.map(i => i._id)
      Api.WorkGroups.SetMembers(this.work_group._id, memberIds).then(() => {
        this.$store.dispatch(
          'info',
          `WorkGroup ${this.work_group.name} members have been updated`
        )
      })
    },
    handleChangeOwner() {
      Api.WorkGroups.ChangeOwner(
        this.work_group._id,
        this.work_group.owner._id
      ).then(() => {
        this.$store.dispatch(
          'info',
          `WorkGroup ${this.work_group.name} owner has been changed`
        )
      })
    },
    isSelected(item) {
      return item._id in this.memberMap
    },
    addMember(member) {
      this.work_group.members.push(member)
      this.$set(this.memberMap, member._id, member)
    },
    removeMember(member) {
      this.work_group.members = this.work_group.members.filter(
        i => i._id !== member._id
      )
      this.$delete(this.memberMap, member._id)
    }
  },
  watch: {
    '$route.params.workGroupName'() {
      this.reload()
    }
  }
}
</script>
