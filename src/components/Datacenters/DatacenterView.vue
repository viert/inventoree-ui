<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View Datacenter</h2>
        <div class="ContentHeader_Buttons">
          <router-link :to="editLink" class="btn btn-primary btn-sm text-uppercase">
            <i class="fa fa-edit"></i> Edit
          </router-link>
          <router-link :to="cloneLink" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-copy"></i> Clone
          </router-link>
          <router-link to="/datacenters/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="Card">
          <div class="CardHeader">
            <h3><datacenter :name="datacenter.name" :sub="datacenter.parent !== null" :link="false" /></h3>
            <div class="Card_Field">{{ datacenter.description }}</div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Parent</label>
                <datacenter v-if="datacenter.parent !== null" :name="datacenter.parent.name" :sub="datacenter.parent.parent_id !== null" />
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Root DC</label>
                <datacenter v-if="datacenter.root !== null" :name="datacenter.root.name" />
              </div>
            </div>
            <div class="col-sm-7">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Children</label>
                <ul class="RelationsList">
                  <li
                    v-for="child in datacenter.children"
                    :key="child._id"
                    class="RelationsList_Item">
                    <datacenter :sub="true" :name="child.name" />
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

export default {
  data () {
    return {
      datacenter: {
        _id: null,
        name: '',
        description: '',
        parent: null,
        root: null,
        children: []
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      let { datacenterName } = this.$route.params
      Api.Datacenters.Get(datacenterName)
        .then(response => {
          this.datacenter = response.data.data[0]
        })
    }
  },
  computed: {
    editLink () {
      return `/datacenters/${this.datacenter.name}/edit`
    },
    cloneLink () {
      return `/datacenters/${this.datacenter.name}/clone`
    }
  },
  watch: {
    '$route.params.datacenterName' () {
      this.loadData()
    }
  }
}
</script>
