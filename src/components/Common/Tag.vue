<template>
  <div class="Tag" :class="{ 'Tag--Derived':derived, 'Tag--Clickable': clickable }" @click.self="tagClick">
    {{name}}
    <a v-if="cross" class="Tag_Cross" href="#" @click.prevent="crossClick"><i class="fa fa-times"></i></a>
  </div>
</template>

<script>
export default {
  props: {
    derived: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    cross: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    crossClick (e) {
      this.$emit('close', e)
    },
    tagClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style>
.Tag {
  font-size: 80%;
  padding: 1px 4px;
  box-sizing: border-box;
  border-radius: 2px;
  color: black;
  display: inline-block;
  margin-right: 4px;
  background: #efe;
  border: 1px solid #cdc;
}

.Tag.Tag--Clickable {
  cursor: pointer;
}

.Tag.Tag--Derived {
  border: 1px solid #ccd;
  background: #eef;
}

.ModelList .Tag {
  position: relative;
  top: -1px;
}

.Tag a.Tag_Cross {
  color: black;
}
</style>
