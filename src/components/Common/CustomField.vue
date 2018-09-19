<template>
  <div class="CF">
    <span class="CF_Key">{{cfKey}}</span>
    <span class="CF_Value">{{cfValue}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    cfKey: {
      type: String,
      required: true
    },
    cfValue: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.CF {
  line-height: 1.1em;
}

.CF_Key {
  font-weight: bold;
}

.CF_Key::after {
  content: ':';
}

.CF_Replace .CF_Value {
  color: green;
  font-weight: bold;
}

.CF_Replace .CF_Prev {
  color: #770000;
  text-decoration: line-through;
}

.ModelList .CF:not(:last-child) .CF_Value::after {
  content: ', ';
}

.ModelList .CF {
  display: inline;
}
</style>
