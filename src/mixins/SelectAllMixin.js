const SelectAllMixin = {
  methods: {
    selectAll(e) {
      let element = e.target
      if (document.body.createTextRange) {
        let range = document.body.createTextRange()
        range.moveToElementText(element)
        range.select()
      } else if (window.getSelection) {
        let selection = window.getSelection()
        let range = document.createRange()
        range.selectNodeContents(element)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }
}

export default SelectAllMixin
