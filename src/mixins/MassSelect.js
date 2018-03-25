const MassSelect = {
  data () {
    return {
      items: [],
      itemsSelected: [],
      itemsSelectedMap: {}
    }
  },
  methods: {
    selectItem (i) {
      if (i._selected) return
      i._selected = true
      this.itemsSelected.push(i)
      this.$set(this.itemsSelectedMap, i._id, i)
    },
    deselectItem (i) {
      if (!i._selected) return
      i._selected = false
      this.$delete(this.itemsSelectedMap, i._id)
      this.itemsSelected = this.itemsSelected.filter(item => item._id !== i._id)
    },
    toggleItem (i) {
      if (i._selected) {
        this.deselectItem(i)
      } else {
        this.selectItem(i)
      }
    },
    shouldBeSelected (i) {
      return i._id in this.itemsSelectedMap
    },
    toggleAll () {
      if (this.allSelected) {
        this.items.forEach(i => {
          this.deselectItem(i)
        })
      } else {
        this.items.forEach(i => {
          this.selectItem(i)
        })
      }
    }
  },
  computed: {
    allSelected () {
      return this.items.length > 0 && this.items.every(i => i._selected)
    }
  }
}

export default MassSelect
