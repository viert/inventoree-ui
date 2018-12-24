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
      <div class="PageContentContainer">
        <div class="Card">
          <div class="CardHeader">
            <h3>
              <group :name="group.name" :link="false"/>
            </h3>
            <div class="Card_Field">{{ group.description }}</div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="Card_Field">
                    <label class="Card_FieldLabel">Id</label>
                    <div @click="selectAll">{{group._id}}</div>
                  </div>
                  <div class="Card_Field">
                    <label class="Card_FieldLabel">WorkGroup</label>
                    <div>
                      <work-group :name="group.work_group_name"/>
                    </div>
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
                </div>
                <div class="col-sm-6">
                  <div class="Card_Field">
                    <label class="Card_FieldLabel">Parents</label>
                    <ul class="RelationsList">
                      <li
                        v-for="parent in group.parents"
                        class="RelationsList_Item"
                        :key="parent._id"
                      >
                        <group :name="parent.name"/>
                      </li>
                    </ul>
                  </div>
                  <div class="Card_Field">
                    <label class="Card_FieldLabel">Children</label>
                    <ul class="RelationsList">
                      <li
                        v-for="child in group.children"
                        class="RelationsList_Item"
                        :key="child._id"
                      >
                        <group :name="child.name"/>
                      </li>
                      <li v-if="hasMoreChildren">
                        <button
                          @click.prevent="loadChildren(groupPage+1)"
                          class="btn-outline-secondary btn btn-sm btn-block btn-hasmore"
                        >More children...</button>
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
            <div class="col-sm-6">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Custom Data (including inherited)</label>
                <yaml-editor :value="yamlData" :readOnly="true"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import yaml from 'js-yaml'
import Api from '@/api'
import Tag from '@/components/Common/Tag'
import YamlEditor from '@/components/Common/YamlEditor'
import SelectAllMixin from '@/mixins/SelectAllMixin'
export default {
  components: {
    Tag,
    YamlEditor
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
        custom_data: {},
        custom_fields: [],
        modification_allowed: false
      },
      hostPage: null,
      hostTotalPages: null,
      groupPage: null,
      groupTotalPages: null,
      yamlData: ''
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
    },
    hasMoreChildren() {
      return (
        this.groupPage &&
        this.groupTotalPages &&
        this.groupPage < this.groupTotalPages
      )
    }
  },
  methods: {
    loadData() {
      let { groupName } = this.$route.params
      Api.Groups.Get(groupName)
        .then(response => {
          this.group = response.data.data[0]
          this.createYaml()
          this.loadHosts()
          this.loadChildren()
        })
        .catch(status => {
          if (status === 404) {
            this.$router.push('/groups')
          }
        })
    },
    createYaml() {
      this.yamlData = yaml.safeDump(this.group.custom_data)
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
    },
    loadChildren(page = 1) {
      Api.Groups.ListByParentId(this.group._id, page).then(response => {
        let groups
        if (!this.group.children || this.group.children.length === 0) {
          groups = response.data.data
        } else {
          groups = [...this.group.children, ...response.data.data]
        }
        this.$set(this.group, 'children', groups)
        this.groupPage = response.data.page
        this.groupTotalPages = response.data.total_pages
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
