<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View WorkGroup</h2>
        <div class="ContentHeader_Buttons">
          <router-link v-if="work_group.modification_allowed" :to="editLink" class="btn btn-primary btn-sm text-uppercase">
            <i class="fa fa-edit"></i> Edit
          </router-link>
          <router-link to="/work_groups/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="Card">
          <div class="CardHeader">
            <h3><work-group :name="work_group.name" :link="false" /></h3>
            <div class="Card_Field">{{work_group.description}}</div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Id</label>
                <div @click="selectAll">{{work_group._id}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Owner</label>
                <user :username="work_group.owner.username" />
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Email</label>
                <div>{{work_group.email}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Groups Count</label>
                <div>{{work_group.groups_count}}</div>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Members</label>
                <ul class="RelationsList">
                  <li
                    v-for="member in work_group.members"
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
      work_group: {
        name: '',
        description: '',
        owner: { username: '' },
        members: [],
        email: '',
        modification_allowed: false,
        groups_count: 0
      }
    }
  },
  computed: {
    editLink() {
      return `/work_groups/${this.work_group.name}/edit`
    }
  },
  methods: {
    loadData() {
      let { workGroupName } = this.$route.params
      Api.WorkGroups.Get(workGroupName)
        .then(response => {
          this.work_group = response.data.data[0]
        })
        .catch(status => {
          if (status === 404) {
            this.$router.push('/work_groups')
          }
        })
    }
  },
  created() {
    this.loadData()
  },
  watch: {
    '$route.params.workGroupName'() {
      this.loadData()
    }
  }
}
</script>

<style>
</style>
