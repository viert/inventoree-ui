
const FilteredDataMixin = {
  data () {
    let page = this.$route.query._page || 1
    let totalPages = 0
    return {
      filter: this.$route.query._filter || '',
      filterDirty: false,
      page,
      totalPages,
      _tm: null
    }
  },
  created () {
    this.loadData()
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
    },
    filterChanged (e) {
      this.filter = e.target.value
      this.filterDirty = true
      this.$router.replace({query: {_page: this.page, _filter: this.filter}})
    },
    pageChanged (page) {
      this.page = page
      this.$router.replace({query: {_page: this.page, _filter: this.filter}})
      this.loadData()
    }
  }
}

export default FilteredDataMixin
