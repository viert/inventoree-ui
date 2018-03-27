<template>
  <div class="input-group-wrap">
    <input
      :value="inputValue"
      @input="inputValueChanged"
      @focus="inputFocus"
      @blur="inputBlur"
      @keydown.down="moveCursor(1)"
      @keydown.up="moveCursor(-1)"
      @keydown.enter="pickItem"
      :class="inputClassComputed"
      :placeholder="placeholder"
      type="text" />
    <ul v-if="showSuggestionsComputed" class="autosuggest">
      <li
        v-for="(suggestion, i) in suggestions"
        :class="{ active: i === selectIndex }"
        :key="getIndex(suggestion)"
        @mousedown="pickItem"
        @mouseover="selectIndex = i">
        {{ getValue(suggestion) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    suggestions: {
      type: Array,
      default: () => { return [] }
    },
    getValue: {
      type: Function,
      required: true
    },
    getIndex: {
      type: Function,
      required: true
    },
    inputClass: {
      type: String,
      default: ''
    },
    inputPickedClass: {
      type: String,
      default: ''
    },
    placeholder: {
      default: ''
    }
  },
  methods: {
    inputValueChanged (e) {
      this.picked = false
      this.inputValue = e.target.value
      this.typedValue = e.target.value
      this.showSuggestions = true
      this.$emit('change', e.target.value)
      this.$emit('clear')
    },
    inputFocus () {
      this.showSuggestions = true
    },
    inputBlur () {
      this.showSuggestions = false
      if (!this.picked) {
        console.log('matching...')
        let match = this.suggestions.find(item => this.getValue(item).toLowerCase() === this.inputValue.toLowerCase())
        if (match) {
          this.$emit('pick', match)
          this.picked = true
        }
      }
    },
    moveCursor (amount) {
      let si = this.selectIndex + amount
      if (si >= this.suggestions.length) {
        si = -1
      } else if (si < -1) {
        si = this.suggestions.length - 1
      }
      this.selectIndex = si
    },
    pickItem () {
      if (this.selectIndex < 0 || this.selectIndex >= this.suggestions.length) {
        return
      }
      let item = this.suggestions[this.selectIndex]
      this.$emit('pick', item)
      this.inputValue = this.getValue(item)
      this.typedValue = this.inputValue
      this.showSuggestions = false
      this.picked = true
    }
  },
  watch: {
    suggestions (newSuggestions) {
      if (this.selectIndex >= newSuggestions.length) {
        this.selectIndex = newSuggestions.length - 1
      }
    },
    selectIndex (si) {
      if (si === -1) {
        this.inputValue = this.typedValue
      } else {
        this.inputValue = this.getValue(this.suggestions[si])
      }
    }
  },
  data () {
    return {
      inputValue: '',
      selectIndex: -1,
      showSuggestions: false,
      typedValue: '',
      picked: false
    }
  },
  computed: {
    showSuggestionsComputed () {
      return this.showSuggestions && this.suggestions.length > 0
    },
    inputClassComputed () {
      let c = {
        [this.inputClass]: true,
        [this.inputPickedClass]: this.picked
      }
      return c
    }
  }
}
</script>

<style>
.input-group .input-group-wrap {
  flex: 1 1 auto;
  width: 1px;
  position: relative;
}

.input-group-wrap input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-group-wrap + .input-group-append {
  background: white;
  z-index: 2;
}

ul.autosuggest {
  position: absolute;
  width: 100%;
  list-style: none;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  margin-top: 4px;
  padding: 0;
  z-index: 9999;
}

ul.autosuggest > li {
  padding: 6px 12px;
  background-color: white;
  cursor: pointer;
}

ul.autosuggest > li.active {
  background-color: #1e5d94;
  color: white;
}
</style>