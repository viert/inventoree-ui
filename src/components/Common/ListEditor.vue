<template>
  <transition-group name="scaley">
    <div class="row ListEditor_Item" v-for="(item, i) in cItems" :key="i">
      <div class="col-sm-12">
        <input class="form-control" :placeholder="placeholder" :value="item" @input="handleInput(i, $event)" type="text" />
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Type in a new item'
    }
  },
  computed: {
    cItems () {
      let items = [...this.items]
      if (items.length === 0 || items[items.length - 1] !== '') {
        items.push('')
      }
      return items
    }
  },
  methods: {
    handleInput (i, e) {
      let items = [...this.items]
      items[i] = e.target.value
      items = items.filter(item => item !== '')
      this.$emit('change', items)
    }
  }
}
</script>

<style>
.row.ListEditor_Item {
  margin-bottom: 8px;
}
</style>
