<template>
  <el-main class="layout-main pad-overflow-scroll">
    <div class="content">
      <bread-crumb class="bread"></bread-crumb>
      <router-view></router-view>
    </div>
  </el-main>
</template>
<script>
import BreadCrumb from '@/components/BreadCrumb'
export default {
  components: {
    BreadCrumb
  }
}
</script>
<style scoped lang="less">
.layout-main {
  margin-left: 200px;
  transition: all 0.3s;
  height: 100%;
  padding: 0;
  .content {
    margin: 15px;
    padding: 10px;
    min-height: calc(100% - 30px);
    background: #fff;
  }
}
</style>
