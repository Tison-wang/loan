<template>
  <el-container :class="{ closeBar: opened }">
    <layout-header />
    <div class="wrapper-con">
      <side-bar />
      <layout-main />
    </div>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import layoutHeader from './Header'
import layoutMain from './Main'
import SideBar from './SideBar/index'
export default {
  components: {
    layoutHeader,
    layoutMain,
    SideBar
  },
  computed: {
    ...mapGetters(['opened'])
  },
  data() {
    return {}
  }
}
</script>
<style scoped lang="less">
.el-container {
  height: 100%;
  background: #f0f3f4;
  position: relative;
}
.wrapper-con {
  height: 100%;
  width: 100%;
  padding-top: 50px;
}
#app .closeBar {
  /deep/ .header_r,
  .layout-main {
    margin-left: 64px;
  }
  .side-bar {
    width: 64px !important;
  }
  /deep/ .header_l {
    width: 64px;
    img {
      width: 60%;
    }
  }
  /deep/ .el-menu--collapse .el-menu-item span,
  /deep/ .el-menu--collapse .el-submenu > .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  /deep/ .el-menu--collapse .el-menu-item .el-submenu__icon-arrow,
  /deep/
    .el-menu--collapse
    .el-submenu
    > .el-submenu__title
    .el-submenu__icon-arrow {
    display: none;
  }
}
</style>
