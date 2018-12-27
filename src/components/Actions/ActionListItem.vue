<template>
  <tr class="ActionList_Item" :class="{ 'ActionList_Item--Failure': action.status !== 'success' }">
    <td class="ActionList_Item-Date">{{ date }}</td>
    <td class="ActionList_Item-User">
      <user :username="action.username" :link="false" :icon="false"/>
    </td>
    <td class="ActionList_Item-Act">
      <span v-if="action.action_type == 'user_update'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">updated</span>
          <span v-else>failed to update</span>
        </router-link>
        <user :username="action.computed.username" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'user_create'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">created</span>
          <span v-else>failed to create</span>
        </router-link>
        <user :username="action.computed.username" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'user_delete'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">deleted</span>
          <span v-else>failed to delete</span>
        </router-link>
        <user :username="action.computed.username" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'user_set_password'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">reset password of</span>
          <span v-else>failed to reset password</span>
        </router-link>
        <user :username="action.computed.username" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'user_set_supervisor'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">
            <span v-if="action.params.supervisor">granted supervisor to</span>
            <span v-else>revoked supervisor from</span>
          </span>
          <span v-else>
            <span v-if="action.params.supervisor">failed to grant supervisor to</span>
            <span v-else>failed to revoke supervisor from</span>
          </span>
        </router-link>
        <user :username="action.computed.username" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'user_set_system'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">
            <span v-if="action.params.system">set system flag for</span>
            <span v-else>unset system flag for</span>
          </span>
          <span v-else>
            <span v-if="action.params.system">failed to set system flag for</span>
            <span v-else>failed to unset system flag for</span>
          </span>
        </router-link>
        <user :username="action.computed.username" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'datacenter_update'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">updated</span>
          <span v-else>failed to update</span>
        </router-link>
        <datacenter :name="action.computed.datacenter_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'datacenter_delete'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">deleted</span>
          <span v-else>failed to delete</span>
        </router-link>
        <datacenter :name="action.computed.datacenter_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'datacenter_create'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">created</span>
          <span v-else>failed to create</span>
        </router-link>
        <datacenter :name="action.computed.datacenter_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'datacenter_set_parent'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">set parent of</span>
          <span v-else>failed to set parent of</span>
        </router-link>
        <datacenter :name="action.computed.datacenter_name" :link="false"/>to
        <datacenter
          v-if="action.computed.parent_name"
          :name="action.computed.parent_name"
          :link="false"
        />
        <datacenter v-else name="root" :link="false" :root="true"/>
      </span>
      <span v-else-if="action.action_type == 'group_update'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">updated</span>
          <span v-else>failed to update</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'group_delete'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">deleted</span>
          <span v-else>failed to delete</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'group_create'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">created</span>
          <span v-else>failed to create</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'group_mass_delete'">
        <router-link :to="viewLink">
          <span
            v-if="action.status == 'success'"
          >deleted {{action.computed.group_names.length}} groups</span>
          <span v-else>failed to delete {{action.computed.group_names.length}} groups</span>
        </router-link>
      </span>
      <span v-else-if="action.action_type == 'group_mass_move'">
        <router-link :to="viewLink">
          <span
            v-if="action.status == 'success'"
          >moved {{action.computed.group_names.length}} groups to</span>
          <span v-else>failed to move {{action.computed.group_names.length}} groups to</span>
        </router-link>
        <work-group :name="action.computed.work_group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'group_set_children'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">set children of</span>
          <span v-else>failed to set children of</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'group_set_hosts'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">set hosts of</span>
          <span v-else>failed to set hosts of</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'group_set_custom_fields'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">set custom fields of</span>
          <span v-else>failed to set custom fields of</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'group_remove_custom_fields'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">removed custom fields from</span>
          <span v-else>failed to remove custom fields from</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'group_add_tags'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">added tags to</span>
          <span v-else>failed to add tags to</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'group_remove_tags'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">removed tags from</span>
          <span v-else>failed to remove tags from</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_create'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">created</span>
          <span v-else>failed to create</span>
        </router-link>
        <host v-for="fqdn in action.computed.host_fqdns" :key="fqdn" :fqdn="fqdn" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_update'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">updated</span>
          <span v-else>failed to update</span>
        </router-link>
        <host :fqdn="action.computed.host_fqdn" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_discover'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">discovered</span>
          <span v-else>failed to discover</span>
        </router-link>
        <host :fqdn="action.computed.host_fqdn" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_set_custom_fields'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">set custom fields of</span>
          <span v-else>failed to set custom fields of</span>
        </router-link>
        <host :fqdn="action.computed.host_fqdn" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_remove_custom_fields'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">removed custom fields from</span>
          <span v-else>failed to remove custom fields from</span>
        </router-link>
        <host :fqdn="action.computed.host_fqdn" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_add_tags'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">added tags to</span>
          <span v-else>failed to add tags to</span>
        </router-link>
        <host :fqdn="action.computed.host_fqdn" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_remove_tags'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">removed tags from</span>
          <span v-else>failed to remove tags from</span>
        </router-link>
        <host :fqdn="action.computed.host_fqdn" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_delete'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">deleted</span>
          <span v-else>failed to delete</span>
        </router-link>
        <host :fqdn="action.computed.host_fqdn" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_mass_delete'">
        <router-link :to="viewLink">
          <span
            v-if="action.status == 'success'"
          >deleted {{action.computed.host_fqdns.length}} hosts</span>
          <span v-else>failed to delete {{action.computed.host_fqdns.length}} hosts</span>
        </router-link>
      </span>
      <span v-else-if="action.action_type == 'host_mass_detach'">
        <router-link :to="viewLink">
          <span
            v-if="action.status == 'success'"
          >detached {{action.computed.host_fqdns.length}} hosts</span>
          <span v-else>failed to detach {{action.computed.host_fqdns.length}} hosts</span>
        </router-link>
      </span>
      <span v-else-if="action.action_type == 'host_mass_move'">
        <router-link :to="viewLink">
          <span
            v-if="action.status == 'success'"
          >moved {{action.computed.host_fqdns.length}} hosts to</span>
          <span v-else>failed to move {{action.computed.host_fqdns.length}} hosts to</span>
        </router-link>
        <group :name="action.computed.group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'host_mass_set_datacenter'">
        <router-link :to="viewLink">
          <span
            v-if="action.status == 'success'"
          >moved {{action.computed.host_fqdns.length}} hosts to</span>
          <span v-else>failed to move {{action.computed.host_fqdns.length}} hosts to</span>
        </router-link>
        <datacenter :name="action.computed.datacenter_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'work_group_create'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">created</span>
          <span v-else>failed to create</span>
        </router-link>
        <work-group :name="action.computed.work_group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'work_group_delete'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">deleted</span>
          <span v-else>failed to delete</span>
        </router-link>
        <work-group :name="action.computed.work_group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'work_group_update'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">updated</span>
          <span v-else>failed to update</span>
        </router-link>
        <work-group :name="action.computed.work_group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'work_group_set_members'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">set members of</span>
          <span v-else>failed to set members of</span>
        </router-link>
        <work-group :name="action.computed.work_group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'work_group_switch_owner'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">set</span>
          <span v-else>failed to set</span>
        </router-link>
        <user :username="action.computed.owner_username" :link="false"/>as the new owner of
        <work-group :name="action.computed.work_group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'work_group_add_member'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">added</span>
          <span v-else>failed to add</span>
        </router-link>
        <user :username="action.computed.user_name" :link="false"/>to members of
        <work-group :name="action.computed.work_group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'work_group_remove_member'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">removed</span>
          <span v-else>failed to remove</span>
        </router-link>
        <user :username="action.computed.user_name" :link="false"/>from members of
        <work-group :name="action.computed.work_group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'network_group_create'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">created</span>
          <span v-else>failed to create</span>
        </router-link>
        <network-group :name="action.computed.network_group_name" :link="false"/>
      </span>
      <span v-else-if="action.action_type == 'network_group_delete'">
        <router-link :to="viewLink">
          <span v-if="action.status == 'success'">deleted</span>
          <span v-else>failed to delete</span>
        </router-link>
        <network-group :name="action.computed.network_group_name" :link="false"/>
      </span>
      
      <span v-else>{{action.action_type}}</span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  computed: {
    date() {
      let dt = new Date(this.action.created_at)
      return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString()
    },
    viewLink() {
      return `/actions/${this.action._id}`
    }
  }
}
</script>

<style>
.ActionList_Item {
  overflow: hidden;
  border-bottom: 2px solid white;
}

.ActionList_Item-Act .User > span,
.ActionList_Item-Act .Group > span,
.ActionList_Item-Act .work_group > span,
.ActionList_Item-Act .Host > span,
.ActionList_Item-Act .Datacenter > span {
  font-weight: bold;
}

.ActionList_Item-Act .User,
.ActionList_Item-Act .Group,
.ActionList_Item-Act .work_group,
.ActionList_Item-Act .Host,
.ActionList_Item-Act .Datacenter {
  padding-left: 4px;
}

.ActionList_Item > td {
  overflow: hidden;
  white-space: nowrap;
  padding: 0 12px 0 0;
}
.ActionList_Item > div:last-child {
  padding-right: 0;
}

.ActionList_Item-Date {
  width: 11em;
}

.ActionList_Item-User {
  width: 11em;
}

.ActionList_Item-Act {
}

.ActionList_Item--Failure td a {
  color: #cc0000 !important;
}

.ActionList_Item--Failure td a:hover {
  color: #ff0000 !important;
}
</style>
