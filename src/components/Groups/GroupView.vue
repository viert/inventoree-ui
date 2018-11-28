<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View Group</h2>
        <div class="ContentHeader_Buttons">
          <router-link
            :to="editLink"
            v-if="group.modification_allowed"
            class="btn btn-primary btn-sm text-uppercase"
          >
            <i class="fa fa-edit"></i> Edit
          </router-link>
          <router-link :to="cloneLink" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-copy"></i> Clone
          </router-link>
          <router-link to="/groups/++/edit" class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> New
          </router-link>
        </div>
      </div>
      <div class="PageContentContainer PageContentContainer--Half">
        <div class="Card">
          <div class="CardHeader">
            <h3>
              <group :name="group.name" :link="false"/>
            </h3>
            <div class="Card_Field">{{ group.description }}</div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Id</label>
                <div @click="selectAll">{{group._id}}</div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Tags</label>
                <div class="Card_TagList">
                  <tag
                    v-for="tag in group.all_tags"
                    :derived="!group.tags.includes(tag)"
                    :name="tag"
                    :key="tag"
                  />
                </div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Custom Fields</label>
                <custom-field
                  v-for="cf in group.all_custom_fields"
                  :key="cf.key"
                  :cfKey="cf.key"
                  :cfValue="cf.value"
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="Card_Field">
                <label class="Card_FieldLabel">WorkGroup</label>
                <div>
                  <work-group :name="group.work_group_name"/>
                </div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Parents</label>
                <ul class="RelationsList">
                  <li v-for="parent in group.parents" class="RelationsList_Item" :key="parent._id">
                    <group :name="parent.name"/>
                  </li>
                </ul>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Children</label>
                <ul class="RelationsList">
                  <li v-for="child in group.children" class="RelationsList_Item" :key="child._id">
                    <group :name="child.name"/>
                  </li>
                </ul>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Hosts</label>
                <ul class="RelationsList">
                  <li v-for="host in group.hosts" :key="host._id">
                    <host :fqdn="host.fqdn"/>
                  </li>
                  <li v-if="hasMoreHosts">
                    <button
                      @click.prevent="loadHosts(hostPage+1)"
                      class="btn-outline-secondary btn btn-sm btn-block btn-hasmore"
                    >More hosts...</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Api from '@/api'
import Tag from '@/components/Common/Tag'
import CustomField from '@/components/Common/CustomField'
import SelectAllMixin from '@/mixins/SelectAllMixin'
export default {
  components: {
    Tag,
    CustomField
  },
  mixins: [SelectAllMixin],
  data() {
    return {
      group: {
        name: '',
        description: '',
        work_group_name: '',
        children: [],
        parents: [],
        hosts: [],
        all_tags: [],
        tags: [],
        all_custom_fields: [],
        custom_fields: [],
        modification_allowed: false
      },
      hostPage: null,
      hostTotalPages: null
    }
  },
  computed: {
    editLink() {
      return `/groups/${this.group.name}/edit`
    },
    cloneLink() {
      return `/groups/${this.group.name}/clone`
    },
    hasMoreHosts() {
      return (
        this.hostPage &&
        this.hostTotalPages &&
        this.hostPage < this.hostTotalPages
      )
    }
  },
  methods: {
    loadData() {
      let { groupName } = this.$route.params
      Api.Groups.Get(groupName)
        .then(response => {
          this.group = response.data.data[0]
          this.loadHosts()
        })
        .catch(status => {
          if (status === 404) {
            this.$router.push('/groups')
          }
        })
    },
    loadHosts(page = 1) {
      Api.Hosts.ListByGroupId(this.group._id, page).then(response => {
        let hosts
        if (!this.group.hosts || this.group.hosts.length === 0) {
          hosts = response.data.data
        } else {
          hosts = [...this.group.hosts, ...response.data.data]
        }
        this.$set(this.group, 'hosts', hosts)
        this.hostPage = response.data.page
        this.hostTotalPages = response.data.total_pages
      })
    }
  },
  created() {
    this.loadData()
  },
  watch: {
    '$route.params.groupName'() {
      this.loadData()
    }
  }
}
</script>

<style>
.btn-hasmore {
  margin-top: 4px;
}
</style>
