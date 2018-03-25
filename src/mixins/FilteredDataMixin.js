
const FilteredDataMixin = {
  data () {
    return {
      filter: this.$route.query._filter || '',
      filterDirty: false,
      _tm: null
    }
  },
  created () {
    this._tm = setInterval(this.updateData, 200)
  },
  beforeDestroy () {
    clearInterval(this._tm)
    this._tm = null
  },
  methods: {
    updateData () {
      let prevFilter = this.filter
      if (this.filterDirty) {
        this.loadData()
          .then(() => {
            if (this.filter === prevFilter) {
              this.filterDirty = false
            }
          })
      }
    }
  }
}

export default FilteredDataMixin
