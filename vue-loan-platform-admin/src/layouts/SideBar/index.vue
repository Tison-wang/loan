<template>
  <div class="side-bar">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        mode="vertical"
        :collapse-transition="false"
        :collapse="opened"
      >
        <sidebar-item
          v-for="item in routes"
          :key="item.path"
          :item="item"
          :basePath="item.path"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from './SideBarItem'
import { mapGetters } from 'vuex'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['routes', 'opened']),
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>
<style scoped lang="less">
.side-bar {
  width: 200px;
  height: calc(100% - 50px);
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  transition: width 0.3s;
  z-index: 999;
  .el-scrollbar {
    height: 100%;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    /deep/ .el-scrollbar__view,
    /deep/ .el-menu {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
