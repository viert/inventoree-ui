<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View Project</h2>
        <div class="ContentHeader_Buttons">
          <router-link v-if="project.modification_allowed" :to="editLink" class="btn btn-primary btn-sm text-uppercase">
            <i class="fa fa-edit"></i> Edit
          </router-link>
          <router-link to="/projects/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="Card">
          <div class="CardHeader">
            <h3><project :name="project.name" :link="false" /></h3>
            <div class="Card_Field">{{project.description}}</div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Id</label>
                <div @click="selectAll">{{project._id}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Owner</label>
                <user :username="project.owner.username" />
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Email</label>
                <div>{{project.email}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Root Email</label>
                <div>{{project.root_email}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Groups Count</label>
                <div>{{project.groups_count}}</div>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Members</label>
                <ul class="RelationsList">
                  <li
                    v-for="member in project.members"
                    class="RelationsList_Item"
                    :key="member._id">
                    <user :username="member.username" />
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
import SelectAllMixin from '@/mixins/SelectAllMixin'

export default {
  mixins: [SelectAllMixin],
  data() {
    return {
      project: {
        name: '',
        description: '',
        owner: { username: '' },
        members: [],
        email: '',
        root_email: '',
        modification_allowed: false,
        groups_count: 0
      }
    }
  },
  computed: {
    editLink() {
      return `/projects/${this.project.name}/edit`
    }
  },
  methods: {
    loadData() {
      let { projectName } = this.$route.params
      Api.Projects.Get(projectName)
        .then(response => {
          this.project = response.data.data[0]
        })
        .catch(status => {
          if (status === 404) {
            this.$router.push('/projects')
          }
        })
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
</style>
