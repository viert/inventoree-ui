<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View Server Group</h2>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="Card">
          <div class="CardHeader">
            <h3><server-group :name="server_group.name" :link="false" /></h3>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Id</label>
                <div @click="selectAll">{{server_group._id}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">WorkGroup</label>
                <work-group :name="server_group.work_group_name" :icon="true" :link="true"/>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Hosts Count</label>
                <div>{{server_group.hosts_count}}</div>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Master Group</label>
                <div>{{server_group.is_master}}</div>
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
      server_group: {
        name: '',
        work_group_name: '',
        is_master: false,
        modification_allowed: false,
        assigning_allowed: false,
        hosts_count: 0
      }
    }
  },
  methods: {
    loadData() {
      let { serverGroupName } = this.$route.params
      Api.ServerGroups.Get(serverGroupName)
        .then(response => {
          this.server_group = response.data.data[0]
        })
        .catch(status => {
          if (status === 404) {
            this.$router.push('/server_groups')
          }
        })
    }
  },
  created() {
    this.loadData()
  },
  watch: {
    '$route.params.serverGroupName'() {
      this.loadData()
    }
  }
}
</script>

<style>
</style>
