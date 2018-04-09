<template>
  <ul class="DatacenterTree">
    <li
      v-for="item in datacenterTree"
      :key="item._id"
      class="DatacenterTree_Item"
      :class="{ 'DatacenterTree_Item--Sub': item.level > 1, 'DatacenterTree_Item--Root': item.level === 0 }"
      :style="{ marginLeft: item.level * 16 + 'px'}" >
      <span v-if="item._id === 'root'">root</span>
      <router-link v-else :to="`/datacenters/` + item.name">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    datacenters: {
      type: Array,
      required: true
    }
  },
  methods: {
    buildTree (dcList, parentId, level) {
      let result = []
      dcList
        .filter(item => item.parent_id === parentId)
        .forEach(item => {
          item.level = level
          result.push(item)
          let children = this.buildTree(dcList, item._id, level + 1)
          if (children.length > 0) {
            result = result.concat(children)
          }
        })
      return result
    }
  },
  computed: {
    datacenterTree () {
      let tree = [
        {
          _id: 'root',
          name: 'root',
          description: 'Root Location',
          level: 0
        }
      ]
      let children = this.buildTree(this.datacenters, null, 1)
      if (children.length > 0) {
        tree = tree.concat(children)
      }
      return tree
    }
  }
}
</script>

<style>
.DatacenterTree {
  padding-left: 15px;
  list-style: none;
  margin-bottom: 0;
}

.DatacenterTree_Item {
  position: relative;
}

.DatacenterTree_Item--Root {
  font-weight: 700;
}

.DatacenterTree_Item::before {
  position: absolute;
  display: block;
  content: "\f0f7";
  font-family: FontAwesome;
  left: -16px;
}

.DatacenterTree_Item--Sub::before {
  content: "\f233";
  left: -18px;
}

.DatacenterTree_Item--Root::before {
  content: "\f0ac";
  font-weight: 300;
  left: -18px;
}
</style>
