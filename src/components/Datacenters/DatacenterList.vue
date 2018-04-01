<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Datacenter Tree</h2>
        <div class="ContentHeader_Buttons">
          <router-link to="/datacenters/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> Create
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer">
        <datacenter-tree :datacenters="datacenters" />
      </div>
    </main>
  </div>
</template>

<script>
import Api from '@/api'
import DatacenterTree from './DatacenterTree'

export default {
  data () {
    return {
      datacenters: []
    }
  },
  components: {
    DatacenterTree
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      Api.Datacenters.FullList()
        .then(response => {
          this.datacenters = response.data.data
        })
    }
  }
}
</script>
