<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Edit User</h2>
        <div class="ContentHeader_Buttons">
          <router-link v-if="!create" to="/users/++/edit" class="btn btn-success btn-sm text-uppercase">
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
                <label class="Form_FieldLabel">Username</label>
                <input class="form-control" type="text" v-model="user.username" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">First Name</label>
                <input class="form-control" type="text" v-model="user.first_name" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Last Name</label>
                <input class="form-control" type="text" v-model="user.last_name" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Email</label>
                <input class="form-control" type="text" v-model="user.email" />
              </div>
              <div class="Form_Buttons">
                <button type="submit" class="btn btn-primary" @click="handleSave">Save</button>
                <confirm-button class="btn btn-danger" @confirm="handleDestroy">Destroy</confirm-button>
              </div>
            </div>
          </div>
          <div v-if="!create" class="col-sm-7 offset-sm-1">
            <h5>User Access</h5>
            <form autocomplete="new-password" @submit="$event.preventDefault()" class="Form">
              <div class="row">
                <div class="col-sm-6">
                  <div class="Form_Field">
                    <!-- Hack for disabling new password autofill in firefox -->
                    <input type="password" style="display: none;" />
                    <label class="Form_FieldLabel">New Password</label>
                    <input class="form-control" type="password" autocomplete="new-password" v-model="newPassword" />
                  </div>
                  <div class="Form_Field">
                    <label class="Form_FieldLabel">Confirm Password</label>
                    <input class="form-control" type="password" v-model="confirmPassword" />
                  </div>
                  <div class="Form_Buttons">
                    <confirm-button class="btn btn-danger" @confirm="handleChangePassword">Change Password</confirm-button>
                  </div>
                  <hr />
                  <div class="Form_Buttons">
                    <label class="Form_FieldLabel">Supervisor</label>
                    <confirm-button v-if="user.supervisor" type="submit" class="btn btn-danger" @confirm="toggleSupervisor">
                      Revoke Supervisor
                    </confirm-button>
                    <confirm-button v-else type="submit" class="btn btn-success" @confirm="toggleSupervisor">
                      Grant Supervisor
                    </confirm-button>
                  </div>
                </div>
                <div class="col-sm-6">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Api from '@/api'

const editorFields = [
  '_id',
  'username',
  'first_name',
  'last_name',
  'supervisor',
  'email'
]

export default {
  props: {
    create: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      user: {
        _id: null,
        username: '',
        first_name: '',
        last_name: '',
        email: ''
      },
      newPassword: '',
      confirmPassword: ''
    }
  },
  created() {
    this.reload()
  },
  methods: {
    reload() {
      if (!this.create) {
        let { userName } = this.$route.params
        this.newPassword = ''
        this.confirmPassword = ''
        Api.Users.Get(userName, editorFields)
          .then(response => {
            this.user = response.data.data[0]
          })
          .catch(status => {
            if (status === 404) {
              this.$router.push('/users')
            }
          })
      } else {
        this.user = {
          _id: null,
          username: '',
          first_name: '',
          last_name: '',
          email: ''
        }
        this.newPassword = ''
        this.confirmPassword = ''
      }
    },
    handleSave() {
      let payload = {
        username: this.user.username,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email
      }
      if (this.create) {
        Api.Users.Create(payload).then(response => {
          let user = response.data.data
          this.$store.dispatch(
            'info',
            `User ${user.username} has been created successfully`
          )
          this.$router.push(`/users/${user.username}/edit`)
        })
      } else {
        Api.Users.Update(this.user._id, payload).then(response => {
          this.user = response.data.data
          this.$store.dispatch(
            'info',
            `User ${this.user.username} has been updated successfully`
          )
        })
      }
    },
    handleDestroy() {
      Api.Users.Delete(this.user._id).then(() => {
        this.$store.dispatch(
          'info',
          `User ${this.user.username} has been deleted successfully`
        )
        this.$router.push('/users')
      })
    },
    handleChangePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.$store.dispatch('error', "Passwords don't match")
        return
      }
      Api.Users.ChangePassword(
        this.user._id,
        this.newPassword,
        this.confirmPassword
      ).then(() => {
        this.$store.dispatch('info', 'Password has been updated')
        this.newPassword = ''
        this.confirmPassword = ''
      })
    },
    toggleSupervisor() {
      let supervisor = !this.user.supervisor
      Api.Users.SetSupervisor(this.user._id, supervisor).then(() => {
        this.$store.dispatch(
          'info',
          'Supervisor permissions successfully ' +
            (supervisor ? 'granted' : 'revoked')
        )
        this.user.supervisor = supervisor
      })
    }
  },
  watch: {
    '$route.params.userName'() {
      this.reload()
    }
  }
}
</script>
