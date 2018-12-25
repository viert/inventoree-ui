const mineFilterButtons = ['mine', 'all']

const FilteredDataMixin = {
  data() {
    let page = this.$route.query._page ? parseInt(this.$route.query._page) : 1
    let totalPages = 1
    return {
      filter: this.$route.query._filter || '',
      filterDirty: false,
      page,
      totalPages,
      mineFilterButtons,
      mineFilter: false,
      _tm: null
    }
  },
  created() {
    this.loadData()
    this._tm = setInterval(this.updateData, 200)
  },
  beforeDestroy() {
    clearInterval(this._tm)
    this._tm = null
  },
  computed: {
    mineFilterValue() {
      return this.mineFilter ? 'mine' : 'all'
    }
  },
  methods: {
    updateData() {
      let prevFilter = this.filter
      if (this.filterDirty) {
        this.loadData().then(() => {
          if (this.filter === prevFilter) {
            this.filterDirty = false
          }
        })
      }
    },
    handleMineFilterClick(value) {
      this.mineFilterChanged(value === 'mine')
    },
    setQuery() {
      let query = {
        _page: this.page
      }
      if (this.filter) {
        query._filter = this.filter
      }
      if (!this.mineFilter) {
        query.all = true
      }
      this.$router.replace({ query })
    },
    filterChanged(e) {
      this.filter = e.target.value
      this.filterDirty = true
      this.setQuery()
    },
    mineFilterChanged(value) {
      this.mineFilter = value
      this.filterDirty = true
      this.setQuery()
    },
    pageChanged(page) {
      this.page = page
      this.setQuery()
      this.loadData()
    },
    fixPage(response) {
      if (
        response.data.total_pages > 0 &&
        response.data.page > response.data.total_pages
      ) {
        this.pageChanged(response.data.total_pages)
        return Promise.reject(new Error('page_change'))
      }
      this.page = response.data.page
      this.totalPages = response.data.total_pages
      return Promise.resolve(response)
    }
  }
}

export default FilteredDataMixin
