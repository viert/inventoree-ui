import StatusFields from '@/components/Actions/Views/StatusFields'
import RequestDetails from '@/components/Actions/Views/RequestDetails'
import ParamList from '@/components/Actions/Views/ParamList'

const ActionViewMixin = {
  props: {
    action: {
      type: Object,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },
  components: {
    StatusFields,
    RequestDetails,
    ParamList
  },
  computed: {
    actionDatetime() {
      if (this.action.created_at) {
        let dt = new Date(this.action.created_at)
        return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString()
      }
    },
    updatedFields() {
      let computedKey = this.model + '_data'
      console.log(computedKey)
      if (computedKey in this.action.computed) {
        return this.action.computed[computedKey]
      } else {
        return null
      }
    },
    modelName() {
      // work_group alias
      if (this.model === 'work_group') {
        return 'workgroup'
      }
      if (this.model === 'server_group') {
        return 'server group'
      }
      return this.model
    }
  }
}

export default ActionViewMixin
