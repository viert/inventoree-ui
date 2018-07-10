<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View User Action</h2>
      </div>
      <div v-if="action.action_type !== null" class="PageContentContainer" :class="{ 'ActionFailure': action.status !== 'success' }">
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
import ModelMassDelete from './Views/ModelMassDelete'
import ModelMassSetDatacenter from './Views/ModelMassSetDatacenter'
import ModelSetSupervisor from './Views/ModelSetSupervisor'
import ModelSetPassword from './Views/ModelSetPassword'
import ModelSetParent from './Views/ModelSetParent'
import ModelSetChildren from './Views/ModelSetChildren'
import ModelSetHosts from './Views/ModelSetHosts'
import ModelSwitchOwner from './Views/ModelSwitchOwner'
import ModelAddMember from './Views/ModelAddMember'
import ModelRemoveMember from './Views/ModelRemoveMember'
import ModelSetMembers from './Views/ModelSetMembers'

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
    ModelMassMove,
    ModelMassDelete,
    ModelMassSetDatacenter,
    ModelSetSupervisor,
    ModelSetChildren,
    ModelSetHosts,
    ModelSetParent,
    ModelSwitchOwner,
    ModelSetPassword,
    ModelAddMember,
    ModelRemoveMember,
    ModelSetMembers
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
        .catch(status => {
          if (status === 404) {
            this.$router.push('/actions')
          }
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
      return 'model-' + this.modelAction.replace(/_/g, '-')
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
.ActionFailure .CardHeader h3 {
  color: #E74C3C;
}
.ErrorList {
  list-style: none;
  padding-left: 20px;
  margin: 0;
}

.ErrorList li {
  color: #E74C3C;
}
</style>
