<template>
  <el-pagination
    layout="slot, prev, pager, next"
    :total="total"
    :class="{ 'hide-last': hideLastPage }"
    :disabled="disabled"
    :current-page="currentPage"
    :page-size="currentSize"
    @current-change="currentChange"
  >
    <div class="flexbox">
      <p>
        共
        <span>{{ total }}</span
        >条数据
      </p>
    </div>
  </el-pagination>
</template>

<script>
export default {
  name: 'ComPages',
  computed: {
    hideLastPage() {
      // 最大值时隐藏最后一页
      const max = 100
      const countp = 3
      const count = Math.ceil(this.total / this.limit)
      return count > max && count - this.currentPage > countp
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 20
    },
    page: {
      type: Number,
      default: 1
    },
    isLimit: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      currentSize: this.limit,
      currentPage: this.page
    }
  },
  methods: {
    currentChange(page) {
      this.currentPage = page
      this.$emit('current-change', page)
    },
    sizeChange() {
      const pageCount = Math.ceil(this.total / this.currentSize)
      if (pageCount < this.currentPage) {
        this.currentPage = pageCount
      }
      this.$emit('size-change', this.currentSize)
    }
  },
  watch: {
    page(page) {
      this.currentPage = page
    },
    limit(limit) {
      this.currentSize = limit
    }
  }
}
</script>

<style lang="less" scoped>
.hide-last {
  /deep/ .el-pager {
    .number:last-child {
      display: none;
    }
  }
}
</style>
