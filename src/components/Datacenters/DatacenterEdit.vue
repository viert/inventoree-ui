<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Edit Datacenter</h2>
        <div class="ContentHeader_Buttons">
          <router-link v-if="!create && !clone" :to="cloneLink" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-copy"></i> Clone
          </router-link>
          <router-link v-if="!create" to="/datacenters/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="row">
          <div class="col-sm-12">
            <h5>Properties</h5>
            <div class="Form">
              <div class="Form_Field">
                <label class="Form_FieldLabel">Name</label>
                <input class="form-control" type="text" v-model="datacenter.name" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Description</label>
                <input class="form-control" type="text" v-model="datacenter.description" />
              </div>
              <div class="Form_Field">
                <label class="Form_FieldLabel">Parent</label>
                <datacenter-picker
                  :datacenter="datacenter.parent"
                  @pick="datacenter.parent=$event"
                  @clear="datacenter.parent = null" />
              </div>
              <div class="Form_Buttons">
                <button type="submit" class="btn btn-primary" @click="handleSave">Save</button>
                <confirm-button class="btn btn-danger" @confirm="handleDestroy">Destroy</confirm-button>
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
import DatacenterPicker from '@/components/Picker/DatacenterPicker'

const editorFields = [
  '_id',
  'name',
  'description',
  'parent'
]

export default {
  props: {
    clone: {
      type: Boolean,
      default: false
    },
    create: {
      type: Boolean,
      default: false
    }
  },
  components: {
    DatacenterPicker
  },
  data () {
    return {
      datacenter: {
        name: '',
        description: '',
        parent: null
      }
    }
  },
  created () {
    this.reload()
  },
  methods: {
    reload () {
      if (!this.create) {
        let { datacenterName } = this.$route.params
        Api.Datacenters.Get(datacenterName, editorFields)
          .then(response => {
            this.datacenter = response.data.data[0]
          })
      } else {
        this.datacenter = {
          name: '',
          description: '',
          parent: null
        }
      }
    },
    handleSave () {
      let { name, description, parent } = this.datacenter
      let payload = {
        name,
        description,
        parent_id: parent ? parent._id : null
      }
      if (this.create || this.clone) {
        Api.Datacenters.Create(payload)
          .then(() => {
            this.$store.dispatch('info', `Datacenter ${this.datacenter.name} has been created`)
            this.$router.push('/datacenters')
          })
      } else {
        Api.Datacenters.Update(this.datacenter._id, payload)
          .then(() => {
            this.$store.dispatch('info', `Datacenter ${this.datacenter.name} has been updated`)
            this.$router.push('/datacenters')
          })
      }
    },
    handleDestroy () {
      Api.Datacenters.Delete(this.datacenter._id)
        .then(() => {
          this.$store.dispatch('info', `Datacenter ${this.datacenter.name} has been deleted`)
          this.$router.push('/datacenters')
        })
    }
  },
  computed: {
    cloneLink () {
      return `/datacenters/${this.$route.params.datacenterName}/clone`
    }
  },
  watch: {
    '$route.params.datacenterName' () {
      this.reload()
    }
  }
}
</script>

<style>

</style>
