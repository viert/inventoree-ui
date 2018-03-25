<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">View Group</h2>
        <div class="ContentHeader_Buttons">
          <router-link :to="editLink" class="btn btn-primary btn-sm text-uppercase">
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
            <h3 class="Group">{{ group.name }}</h3>
            <div class="Card_Field">{{ group.description }}</div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Tags</label>
                <div class="Card_TagList">
                  <tag
                    v-for="tag in group.all_tags"
                    :derived="!group.tags.includes(tag)"
                    :name="tag"
                    :key="tag" />
                </div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Custom Fields</label>
                <custom-field
                  v-for="cf in group.all_custom_fields"
                  :key="cf.key"
                  :cfKey="cf.key"
                  :cfValue="cf.value" />
              </div>
            </div>
            <div class="col-sm-7">
              <div class="Card_Field">
                <label class="Card_FieldLabel">Project</label>
                <div class="Project"><a href="#">{{ group.project_name }}</a></div>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Children</label>
                <ul class="RelationsList">
                  <li
                    v-for="child in group.children"
                    class="RelationsList_Item Group"
                    :key="child._id">
                    <a href="#">{{ child.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="Card_Field">
                <label class="Card_FieldLabel">Hosts</label>
                <ul class="RelationsList">
                  <li
                    v-for="host in group.hosts"
                    class="RelationList_Item Host"
                    :key="host._id">
                    <a href="#">{{ host.fqdn }}</a>
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
export default {
  components: {
    Tag,
    CustomField
  },
  data () {
    return {
      group: {
        name: '',
        description: '',
        project_name: '',
        children: [],
        hosts: [],
        all_tags: [],
        tags: [],
        all_custom_fields: [],
        custom_fields: []
      }
    }
  },
  computed: {
    editLink () {
      return `/groups/${this.group.name}/edit`
    },
    cloneLink () {
      return `/groups/${this.group.name}/clone`
    }
  },
  created () {
    let { groupName } = this.$route.params
    Api.Groups.Get(groupName)
      .then(response => {
        this.group = response.data.data[0]
      })
  }
}
</script>

<style>

</style>
