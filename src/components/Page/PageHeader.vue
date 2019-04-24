<template>
  <header class="PageHeader">
    <logo/>
    <div class="PageHeader_Brand">
      <h1>
        <router-link to="/">INVENTOREE</router-link>
      </h1>
    </div>
    <nav class="PageHeader_Mainmenu">
      <ul class="PageHeader_Mainmenu_List">
        <li>
          <router-link to="/datacenters">Datacenters</router-link>
        </li>
        <li>
          <router-link to="/groups">Groups</router-link>
        </li>
        <li>
          <router-link to="/hosts">Hosts</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
        <li>
          <router-link to="/work_groups">WorkGroups</router-link>
        </li>
        <li>
          <router-link to="/network_groups">Network Groups</router-link>
        </li>
      </ul>
    </nav>
    <div v-if="isLoading" class="PageHeader_LoadSpinner">
      <i class="fa fa-spin fa-spinner"></i>
    </div>
    <account :user="currentUser"/>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import Account from './Account'
import Logo from './Logo'

export default {
  components: {
    Account,
    Logo
  },
  computed: {
    ...mapGetters(['isLoading', 'currentUser'])
  }
}
</script>

<style>
.PageHeader {
  display: flex;
  width: 100%;
  height: 60px;
  padding: 2px 0 0;
  color: white;
  align-items: center;
  border-bottom: 2px solid #999;
  background: #222;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 0.8rem;
}

.PageHeader a {
  color: white;
}

.PageHeader a:hover {
  color: #ccc;
}
.PageHeader_Brand {
  margin: -2px 0 0 8px;
  position: relative;
}
.PageHeader_Brand h1 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0;
}

.PageHeader_Mainmenu {
  flex-grow: 1;
  margin-left: 14px;
}

.PageHeader_Mainmenu_List {
  padding: 0;
  margin: 0;
  display: flex;
  list-style: none;
}

.PageHeader_Mainmenu_List li {
  padding: 0 10px;
  margin: 0;
  text-transform: uppercase;
}

.PageHeader_LoadSpinner {
  width: 40px;
  height: 36px;
  color: white;
  font-size: 26px;
}
</style>
