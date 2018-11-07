<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View Server Group</h2>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="Card">
          <div class="CardHeader">
            <h3><network-group :name="network_group.name" :link="false" /></h3>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Id</label>
                <div @click="selectAll">{{network_group._id}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">WorkGroup</label>
                <work-group :name="network_group.work_group_name" :icon="true" :link="true"/>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Hosts Count</label>
                <div>{{network_group.hosts_count}}</div>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Master Group</label>
                <div>{{network_group.is_master}}</div>
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
      network_group: {
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
      let { networkGroupName } = this.$route.params
      Api.NetworkGroups.Get(networkGroupName)
        .then(response => {
          this.network_group = response.data.data[0]
        })
        .catch(status => {
          if (status === 404) {
            this.$router.push('/network_groups')
          }
        })
    }
  },
  created() {
    this.loadData()
  },
  watch: {
    '$route.params.networkGroupName'() {
      this.loadData()
    }
  }
}
</script>

<style>
</style>
