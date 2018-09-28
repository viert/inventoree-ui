<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View User</h2>
        <div class="ContentHeader_Buttons">
          <router-link :to="editLink" v-if="user.modification_allowed" class="btn btn-primary btn-sm text-uppercase">
            <i class="fa fa-edit"></i> Edit
          </router-link>
          <router-link to="/users/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="Card">
          <div class="CardHeader">
            <h3><user :username="user.username" :link="false" /></h3>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Id</label>
                <div @click="selectAll">{{user._id}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">First Name</label>
                <div>{{user.first_name}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Last Name</label>
                <div>{{user.last_name}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Email</label>
                <div>{{user.email}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Supervisor</label>
                <div>{{user.supervisor}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Auth Token</label>
                <user-auth-token :token="user.auth_token" />
              </div>
            </div>
            <div class="col-sm-7">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Projects Owned</label>
                <ul class="RelationsList">
                  <li
                    v-for="project in user.projects_owned"
                    class="RelationsList_Item"
                    :key="project._id">
                    <project :name="project.name" />
                  </li>
                </ul>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Projects Participated In</label>
                <ul class="RelationsList">
                  <li
                    v-for="project in user.projects_included_into"
                    class="RelationsList_Item"
                    :key="project._id">
                    <project :name="project.name" />
                  </li>
                </ul>
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
import UserAuthToken from './UserAuthToken'
import SelectAllMixin from '@/mixins/SelectAllMixin'

export default {
  mixins: [SelectAllMixin],
  data() {
    return {
      user: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        projects_owned: [],
        projects_included_into: [],
        auth_token: '',
        modification_allowed: false,
        supervisor: false
      }
    }
  },
  components: {
    UserAuthToken
  },
  computed: {
    editLink() {
      return `/users/${this.user.username}/edit`
    }
  },
  methods: {
    loadData() {
      let { userName } = this.$route.params
      Api.Users.Get(userName)
        .then(response => {
          this.user = response.data.data[0]
        })
        .catch(status => {
          if (status === 404) {
            this.$router.push('/users')
          }
        })
    }
  },
  created() {
    this.loadData()
  },
  watch: {
    '$route.params.userName'() {
      this.loadData()
    }
  }
}
</script>

<style>
</style>
