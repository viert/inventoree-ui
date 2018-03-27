<template>
  <header class="PageHeader">
      <div class="PageHeader_Brand">
          <h1><router-link to="/">INVENTOREE</router-link></h1>
      </div>
      <nav class="PageHeader_Mainmenu">
          <ul class="PageHeader_Mainmenu_List">
              <li><router-link to="/datacenters">Datacenters</router-link></li>
              <li><router-link to="/projects">Projects</router-link></li>
              <li><router-link to="/groups">Groups</router-link></li>
              <li><router-link to="/hosts">Hosts</router-link></li>
              <li><router-link to="/users">Users</router-link></li>
              <li><router-link to="/actions">Action Log</router-link></li>
          </ul>
      </nav>
      <div v-if="isLoading" class="PageHeader_LoadSpinner">
        <i class="fa fa-spin fa-spinner"></i>
      </div>
      <div class="PageHeader_Account">
          <div class="PageHeader_Account_Avatar">
              <img class="PageHeader_Account_Avatar_Pic" src="/avatar.png" alt="avatar"/>
          </div>
      </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style>
.PageHeader {
    padding: 2px 0 0;
    color: white;
    align-items: center;
    border-bottom: 2px solid #99c;
    background: #2c539e; /* Old browsers */
    background: -moz-linear-gradient(top, #236aa7 0%, #1e5d94 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #236aa7 0%,#1e5d94 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #236aa7 0%,#1e5d94 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#236aa7', endColorstr='#1e5d94',GradientType=0 ); /* IE6-9 */
}

.PageFooter, .PageHeader {
    display: flex;
    width: 100%;
    height: 54px;
    box-sizing: border-box;
    justify-content: space-between;
    font-size: 0.8rem;
}

.PageFooter {
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid #eee;
}

.PageHeader a { color: white; }
.PageHeader a:hover { color: #ccf; }
.PageHeader_Brand {
    margin: -2px 0 0;
    position: relative;
    margin-left: 20px;
}
.PageHeader_Brand h1 { font-size: 22px; font-weight: bold; margin-bottom: 0; }

.PageHeader_Mainmenu {
    flex-grow: 1;
    margin-left: 40px;
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

.PageHeader_Account {
    display: flex;
}
.PageHeader_Account_Avatar, .PageHeader_Account_Avatar_Pic {
    width: 36px;
    height: 36px;
    box-sizing: content-box;
}
.PageHeader_LoadSpinner {
  width: 40px;
  height: 36px;
  color: white;
  font-size: 26px;
}
.PageHeader_Account_Avatar {
    border: 2px solid white;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    position: relative;
}
</style>
