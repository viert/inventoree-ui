<template>
  <nav aria-label="Page navigation" class="Pagination">
    <ul class="pagination" v-if="total > 1 || current > total">
      <li
        v-for="page in pages"
        :key="page.id"
        :class="{ 'page-item': true, 'active': page.page === current, disabled: page.disabled }">
        <a class="page-link" @click.prevent="pageClick(page)" v-if="page.id === 'prev'">&larr;</a>
        <a class="page-link" @click.prevent="pageClick(page)" v-else-if="page.id === 'next'">&rarr;</a>
        <a class="page-link" @click.prevent="pageClick(page)" v-else>{{page.page}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    spread: {
      type: Number,
      default: 3
    }
  },
  methods: {
    pageClick (page) {
      if (page.disabled) return
      var newPage
      switch (page.page) {
        case 'prev':
          newPage = this.current - 1
          break
        case 'next':
          newPage = this.current + 1
          break
        default:
          newPage = page.page
      }
      this.$emit('page', newPage)
    }
  },
  computed: {
    pages () {
      let { current, total, spread } = this

      // always show the first page
      let result = [
        { id: 'prev', page: 'prev', disabled: current === 1 },
        { id: 1, page: 1, disabled: current === 1 }
      ]

      let i = 2
      if ((current - spread) > 2) {
        result.push({ id: 2, page: '...', disabled: true })
        i = current - spread
      }

      while (i <= current + spread && i <= total) {
        result.push({ id: i, page: i, disabled: current === i })
        i++
      }

      if (i < total) {
        result.push({ id: i, page: '...', disabled: true })
        // show the last page
        result.push({ id: total, page: total, disabled: current === total })
      }

      result.push({ id: 'next', page: 'next', disabled: current === total })
      return result
    }
  }
}
</script>

<style>
.Pagination {
    margin: 30px auto 0;
    display: flex;
    justify-content: space-around;
}

.page-link, .page-item.disabled .page-link {
    background: white;
    border: 1px solid #ddd;
    color: black;
}

.page-item.disabled .page-link {
    color: #999;
}

.page-link:hover {
    background: #999;
}

.page-item:not(:first-child) .page-link {
    border-left: none;
}

.page-item.active .page-link {
    background: #18BC9C;
    color: white;
}
</style>
