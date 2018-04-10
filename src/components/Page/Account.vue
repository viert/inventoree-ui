<template>
  <div class="PageHeader_Account">
    <div class="PageHeader_Account_Username">{{ displayName }}</div>
    <div class="PageHeader_Account_Avatar" @mouseover="showPopover" @mouseout="hidePopover">
      <img v-if="user.avatar_url" class="PageHeader_Account_Avatar_Pic" :src="user.avatar_url" alt="avatar"/>
      <i class="fa fa-user" v-else></i>
    </div>
    <transition name="fadefast">
      <div class="PageHeader_Account_Popover" v-if="popover" @mouseover="showPopover" @mouseout="hidePopover">
        <div class="PageHeader_Account_Popover_Arrow"></div>
        <div class="PageHeader_Account_Popover_Content">
          <h5><user :username="user.username" /></h5>
        </div>
        <div class="Card_Field">
          <label class="Card_FieldLabel">My Token</label>
          <user-auth-token :token="user.auth_token" />
        </div>
        <div class="Form_Buttons">
          <confirm-button @confirm="logout" class="btn btn-danger">Logout</confirm-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import UserAuthToken from '@/components/Users/UserAuthToken'
import Api from '@/api'
export default {
  data () {
    return {
      popover: false,
      popoverWillHide: false
    }
  },
  components: {
    UserAuthToken
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    displayName () {
      let dn = ''
      if (this.user.first_name && this.user.last_name) {
        return `${this.user.first_name} ${this.user.last_name}`
      } else {
        return this.user.username
      }
    }
  },
  methods: {
    logout () {
      Api.Account.Logout()
        .then(() => {
          this.$store.commit('setAuthState', 'authenticating')
          this.$store.commit('setUser', null)
        })
    },
    showPopover (e) {
      this.popoverWillHide = false
      this.popover = true
    },
    hidePopover (e) {
      this.popoverWillHide = true
      setTimeout(this.seriouslyHidePopover, 250)
    },
    seriouslyHidePopover () {
      if (this.popoverWillHide) {
        this.popover = false
      }
    }
  }
}
</script>

<style>
.PageHeader_Account {
  display: flex;
  position: relative;
}

.PageHeader_Account_Username {
  padding-right: 8px;
  line-height: 40px;
}

.PageHeader_Account_Avatar, .PageHeader_Account_Avatar_Pic {
  width: 36px;
  height: 36px;
  box-sizing: content-box;
}

.PageHeader_Account_Avatar {
  border: 2px solid white;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  position: relative;
}

.PageHeader_Account_Avatar .fa-user {
  font-size: 28px;
  position: relative;
  top: 3px;
  left: 8px;
}

.PageHeader_Account_Popover {
  display: block;
  position: absolute;
  z-index: 1080;
  right: 8px;
  top: 52px;
  width: 250px;
  background: white;
  color: black;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.PageHeader_Account_Popover_Arrow {
  display: block;
  position: absolute;
  top: -6px;
  right: 16px;
  width: 12px;
  height: 12px;
  background: white;
  transform: rotate(45deg);
}

.PageHeader_Account_Popover_Content h5 {
  text-transform: none;
}

.PageHeader_Account_Popover_Content a {
  color: #1e5dc4;
}
.PageHeader_Account_Popover_Content a:hover {
  color: red;
}

.fadefast-enter-active {
  animation: fadeIn 0.15s ease;
}

.fadefast-leave-active {
  animation: fadeIn 0.15s ease reverse;
}
</style>
