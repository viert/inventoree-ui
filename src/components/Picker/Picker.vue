<template>
  <div class="input-group-wrap" :class="{ picked: picked }">
    <input
      ref="autosuggestInput"
      :value="inputValue"
      @input="inputValueChanged"
      @focus="inputFocus"
      @blur="inputBlur"
      @keydown.down="moveCursor(1)"
      @keydown.up="moveCursor(-1)"
      @keydown.enter="pickItem"
      @keydown.esc="handleEscape"
      :class="inputClassComputed"
      :placeholder="placeholder"
      type="text"
    >
    <ul
      v-if="showSuggestionsComputed"
      class="autosuggest"
      :class="{ 'autosuggest-multi': multi, 'autosuggest-inline': inline }"
    >
      <li
        v-for="(suggestion, i) in suggestions"
        :class="{ active: i === selectIndex, selected: multi && isSelected(suggestion) }"
        :key="getIndex(suggestion)"
        @mousedown="pickItem"
        @mouseover="selectIndex = i"
      >{{ getValue(suggestion) }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    suggestions: {
      type: Array,
      default: () => {
        return []
      }
    },
    getValue: {
      type: Function,
      required: true
    },
    getIndex: {
      type: Function,
      required: true
    },
    isSelected: {
      type: Function,
      default: () => {
        console.error('isSelected prop is required in "multi" mode of picker')
      }
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
    },
    clearInputOnUnpick: {
      type: Boolean,
      default: true
    },
    pickedItem: {
      type: Object,
      default: null
    },
    multi: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.ticker = setInterval(this.tick, 200)
    this.dirty = false
  },
  beforeDestroy() {
    if (this.ticker) {
      clearInterval(this.ticker)
    }
    this.ticker = null
  },
  methods: {
    tick() {
      if (this.dirty) {
        this.$emit('change', this.typedValue)
        this.dirty = false
      }
    },
    inputValueChanged(e) {
      if (this.picked) this.$emit('clear')
      this.picked = false
      this.inputValue = e.target.value
      this.typedValue = e.target.value
      this.showSuggestions = true
      this.dirty = true
    },
    inputFocus() {
      this.showSuggestions = true
    },
    handleEscape() {
      if (this.multi) {
        this.showSuggestions = false
        this.inputBlur()
      }
    },
    inputBlur() {
      if (this.multi) {
        if (this.justPicked) {
          this.justPicked = false
          this.$refs.autosuggestInput.focus()
        } else {
          this.showSuggestions = false
        }
      } else {
        this.showSuggestions = false
      }
      if (!this.picked && !this.multi) {
        let match = this.suggestions.find(
          item =>
            this.getValue(item).toLowerCase() === this.typedValue.toLowerCase()
        )
        if (match) {
          this.$emit('pick', match)
          this.picked = true
        }
      }
    },
    moveCursor(amount) {
      let si = this.selectIndex + amount
      if (si >= this.suggestions.length) {
        si = -1
      } else if (si < -1) {
        si = this.suggestions.length - 1
      }
      this.selectIndex = si
    },
    pickItem(e) {
      if (this.selectIndex < 0 || this.selectIndex >= this.suggestions.length) {
        return
      }

      if (e.type === 'mousedown') {
        this.justPicked = true
      }

      let item = this.suggestions[this.selectIndex]
      if (!this.multi) {
        this.$emit('pick', item)
        this.inputValue = this.getValue(item)
        this.typedValue = this.inputValue
        this.showSuggestions = false
        this.picked = true
      } else {
        if (this.isSelected(item)) {
          this.$emit('remove', item)
        } else {
          this.$emit('add', item)
        }
        this.showSuggestions = true
      }
    }
  },
  watch: {
    suggestions(newSuggestions) {
      if (this.selectIndex >= newSuggestions.length) {
        this.selectIndex = newSuggestions.length - 1
      }
    },
    selectIndex(si) {
      if (!this.multi) {
        if (si === -1) {
          this.inputValue = this.typedValue
        } else {
          this.inputValue = this.getValue(this.suggestions[si])
        }
      }
    },
    pickedItem(newVal) {
      if (newVal) {
        this.inputValue = this.getValue(newVal)
        this.typedValue = this.getValue(newVal)
        this.picked = true
      } else {
        if (this.clearInputOnUnpick) {
          this.inputValue = ''
          this.typedValue = ''
        }
        this.picked = false
      }
    }
  },
  data() {
    return {
      inputValue: this.pickedItem ? this.getValue(this.pickedItem) : '',
      selectIndex: -1,
      showSuggestions: false,
      typedValue: this.pickedItem ? this.getValue(this.pickedItem) : '',
      picked: this.pickedItem !== null
    }
  },
  computed: {
    showSuggestionsComputed() {
      return this.showSuggestions && this.suggestions.length > 0
    },
    inputClassComputed() {
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
.input-group-wrap {
  position: relative;
}

.input-group .input-group-wrap {
  flex: 1 1 auto;
  width: 1px;
}

.input-group .input-group-wrap input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-group-wrap.picked::after {
  display: block;
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  right: 7px;
  top: 7px;
  content: '\f00c';
  color: #18bc9c;
}

.ContentHeader_ActionTypeField .input-group-wrap.picked::after,
.ContentHeader_AdditionalFilter .input-group-wrap.picked::after {
  top: 4px;
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

ul.autosuggest.autosuggest-inline {
  position: relative;
}

ul.autosuggest > li {
  padding: 6px 12px;
  background-color: white;
  cursor: pointer;
}

ul.autosuggest.autosuggest-multi > li {
  padding-left: 24px;
  position: relative;
}

ul.autosuggest.autosuggest-multi > li.selected::before {
  display: block;
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  left: 7px;
  top: 10px;
  content: '\f00c';
  font-size: 0.7em;
}

ul.autosuggest > li.active {
  background-color: #1e5d94;
  color: white;
}
</style>
