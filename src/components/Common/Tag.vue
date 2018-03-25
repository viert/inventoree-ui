<template>
  <div class="Tag" :class="{ 'Tag--Derived':derived }">{{name}}</div>
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
    }
  }
}
</script>

<style>
.Tag {
  font-size: 80%;
  padding: 1px 4px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 2px;
  color: black;
  display: inline-block;
  margin-right: 4px;
  background: #efe;
  border: 1px solid #cdc;
}

.Tag.Tag--Derived {
  border: 1px solid #ccd;
  background: #eef;
}

.ModelList .Tag {
  position: relative;
  top: -1px;
}
</style>
