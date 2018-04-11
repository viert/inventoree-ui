<template>
  <ul class="ParamList">
    <li v-for="(param, key) in params" :key="key">
      <span class="ParamList_Key">{{key}}</span>: {{param}}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    params: {
      required: true
    }
  }
}
</script>

<style>
.ParamList {
  padding-left: 20px;
  margin: 0;
  list-style: none;
}
.ParamList_Key {
  font-weight: bold;
}
</style>
