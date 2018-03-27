<template>
  <div class="Content">
    <page-header/>
    <router-view />
    <page-footer/>
  </div>
</template>

<script>
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
export default {
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>

</style>
