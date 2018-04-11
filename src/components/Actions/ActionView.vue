<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View User Action</h2>
      </div>
      <div v-if="action.action_type !== null" class="PageContentContainer PageContentContainer--Half">
        <component
          :is="componentName"
          :action="action"
          :model="modelName" />
      </div>
    </main>
  </div>
</template>

<script>
import Api from '@/api'
import ModelCreate from './Views/ModelCreate'
import ModelDelete from './Views/ModelDelete'
import ModelUpdate from './Views/ModelUpdate'
import ModelMassMove from './Views/ModelMassMove'

export default {
  data () {
    return {
      action: {
        action_type: null
      }
    }
  },
  components: {
    ModelCreate,
    ModelDelete,
    ModelUpdate,
    ModelMassMove
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      let { actionId } = this.$route.params
      Api.Actions.Get(actionId)
        .then(({data}) => {
          this.action = data.data[0]
        })
    }
  },
  computed: {
    modelName () {
      return this.action.action_type && this.action.action_type.split('_')[0]
    },
    modelAction () {
      return this.action.action_type && this.action.action_type.slice(this.action.action_type.indexOf('_') + 1)
    },
    componentName () {
      return 'model-' + this.modelAction.replace('_', '-')
    }
  },
  watch: {
    '$route.params.actionId' () {
      this.loadData()
    }
  }
}
</script>

<style>

</style>
