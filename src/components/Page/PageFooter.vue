<template>
  <footer class="PageFooter">
    <span v-if="appInfoLoaded">
    Inventoree {{appInfo.app.version}} / flask {{appInfo.flask_version}} / mongodb {{appInfo.mongodb.version}}
    </span>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['appInfo', 'appInfoLoaded'])
  }
}
</script>

<style>
.PageFooter {
  display: flex;
  width: 100%;
  height: 54px;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 0.8rem;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #eee;
}
</style>
