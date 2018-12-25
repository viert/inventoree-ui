<template>
  <div class="yaml-editor">
    <codemirror
      :value="value"
      :options="cmOptions"
      @ready="handleEditorReady"
      @input="handleChange"
    ></codemirror>
    <div class="yaml-editor-error" v-if="yamlError">{{ yamlError }}</div>
  </div>
</template>

<script>
import yaml from 'js-yaml'
import 'codemirror/mode/yaml/yaml.js'
import 'codemirror/lib/codemirror.css'
import { codemirror } from 'vue-codemirror'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  components: {
    codemirror
  },
  data() {
    return {
      cmOptions: {
        tabSize: 2,
        theme: 'default',
        lineNumbers: true,
        line: true,
        fixedGutter: true,
        styleActiveLine: true,
        readOnly: this.readOnly
      },
      yamlError: null
    }
  },
  methods: {
    handleEditorReady(cm) {
      this.doc = cm.getDoc()
    },
    handleChange(value) {
      try {
        yaml.safeLoad(value)
        this.$emit('change', value)
        this.yamlError = null
        if (this.marker) {
          this.marker.clear()
        }
      } catch (e) {
        let { mark, message } = e
        this.yamlError = message

        let from = { line: mark.line - 1, ch: mark.column }
        let to = { line: mark.line - 1, ch: mark.column + 1000 }
        if (this.marker) {
          this.marker.clear()
        }
        this.marker = this.doc.markText(from, to, { className: 'editor-error' })
      }
    }
  }
}
</script>

<style>
.CodeMirror {
  font-family: 'PT Mono', monospace;
  font-size: 13px;
}

.yaml-editor {
  border-top: 1px solid #eee;
}

.editor-error {
  text-decoration: wavy underline red;
}

.yaml-editor-error {
  font-size: 85%;
  color: #700;
}
</style>
