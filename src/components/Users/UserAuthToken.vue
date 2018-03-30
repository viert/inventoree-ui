<template>
  <span @click="selectAll" class="AuthToken">{{token}}</span>
</template>

<script>
const selectText = (element) => {
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

export default {
  props: {
    token: {
      type: String,
      required: true
    }
  },
  methods: {
    selectAll (e) {
      selectText(e.target)
    }
  }
}
</script>

<style>
.AuthToken {
  font-size: 0.7em;
}
</style>
