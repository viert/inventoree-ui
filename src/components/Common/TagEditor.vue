<template>
  <div class="TagEditor" :class="{ 'TagEditor--Focused': focused }" @click="$refs.tagInput.focus()">
    <tag v-for="tag in tags" :name="tag" :key="tag" :cross="true" @close="removeTag(tag)" />
    <input
      ref="tagInput"
      type="text"
      class="TagEditor_Input"
      :value="value"
      :size="size"
      @input="editorInput"
      @keydown.enter.prevent="addTag"
      @keydown.space.prevent="addTag"
      @keydown.tab="tabHandler"
      @keydown.delete="backspaceHandler"
      @focus="focused = true"
      @blur="onBlur" />
  </div>
</template>

<script>
import Tag from '@/components/Common/Tag'

export default {
  props: {
    tags: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      focused: false,
      value: '',
      size: 5
    }
  },
  components: {
    Tag
  },
  methods: {
    onBlur(e) {
      this.focused = false
      this.addTag(e)
    },
    removeTag(tag) {
      this.$emit('remove', tag)
    },
    addTag(e) {
      let tag = e.target.value.trim()
      this.value = ''
      this.size = 5
      if (tag.length === 0) return
      if (this.tags.find(i => i === tag)) return
      this.$emit('add', tag)
    },
    tabHandler(e) {
      if (e.target.value.length > 0) {
        e.preventDefault()
        this.addTag(e)
      }
    },
    backspaceHandler(e) {
      if (e.target.value.length === 0) {
        e.preventDefault()
        let lastTag = this.tags[this.tags.length - 1]
        this.removeTag(lastTag)
      }
    },
    editorInput(e) {
      let { value, size } = e.target
      let targetSize = value.length + 5
      let newSize = targetSize
      if (targetSize > size) {
        let inputWidth = e.target.clientWidth
        let parentWidth = e.target.parentElement.clientWidth
        if (inputWidth + 48 > parentWidth) {
          newSize = size
        }
      }
      this.value = value
      this.size = newSize
    }
  }
}
</script>

<style>
.TagEditor {
  min-height: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px 2px;
  background-color: white;
  cursor: text;
  transition: border-color 0.15s linear, box-shadow 0.15s linear;
}

.TagEditor--Focused {
  box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.25);
  border-color: #597ea2;
}

.TagEditor_Input {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  display: inline-block;
  background-color: transparent;
  padding: 0;
}

.TagEditor .Tag {
  cursor: default;
  display: inline-block;
  padding: 1px 8px;
  border: 1px solid #ccc;
  background-color: #e0ffe0;
  margin-right: 4px;
  margin-bottom: 4px;
  overflow-wrap: normal;
  line-height: 1.5em;
  position: relative;
  top: -1px;
}
</style>
