<template>
  <div class="ContentHeader_SearchField">
    <div class="input-group input-group-sm mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="filter-addon">
          <i class="fa fa-search"></i>
        </span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="FILTER"
        aria-label="Filter"
        aria-describedby="filter-addon"
        :value="value"
        @input="change" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    change: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>
.ContentHeader_SearchField {
  width: 300px;
  margin-left: 20px;
}
</style>
