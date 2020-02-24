<template>
  <div class="breadDiv" id="domBread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :to="item.path"
        :key="index"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadList: []
    }
  },
  watch: {
    $route: {
      handler(route) {
        let allList = route.matched.filter(item => {
          if (item.meta && item.meta.title) {
            if (item.redirect) {
              item.path = ''
            }
            return true
          }
        })
        // if (allList[0].path !== "/" && allList[0].path !== "/work") {
        //   allList.unshift({ path: "/", meta: { title: "首页" } });
        // }
        this.breadList = allList
      },
      immediate: true
    }
  }
}
</script>
<style scoped lang="less">
.breadDiv {
  margin-bottom: 20px;
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 10px;
  .el-breadcrumb {
    font-size: 22px;
    line-height: normal;
  }
}
</style>
