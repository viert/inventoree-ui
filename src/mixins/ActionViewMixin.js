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
    ParamList
  },
  computed: {
    actionDatetime () {
      if (this.action.created_at) {
        let dt = new Date(this.action.created_at)
        return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString()
      }
    },
    isFailure () {
      return this.action.status !== 'success'
    },
    isSuccess () {
      return this.action.status === 'success'
    },
    updatedFields () {
      let computedKey = this.model + '_data'
      if (computedKey in this.action.computed) {
        return this.action.computed[computedKey]
      } else {
        return null
      }
    },
    actionDetails () {
      let details = {}
      for (var key in this.action.computed) {
        if (key !== this.model + '_data') {
          details[key] = this.action.computed[key]
        }
      }
      return details
    }
  }
}

export default ActionViewMixin
