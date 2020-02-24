<template>
  <el-header class="layout-header" height="50px">
    <div class="header_l">
      <a href="/" class="logoLink">
        <img src="../assets/images/logo.png" alt="logo" />
      </a>
    </div>
    <div class="header_r">
      <div class="headr_d1">
        <side-collapse class="sidecoll"></side-collapse>
        <el-link :underline="false" type="success" @click="handleLink"
          >查看站点</el-link
        >
        <!-- <el-link :underline="false">清除缓存</el-link> -->
      </div>
      <div class="headr_d2">
        <ul class="headrUl">
          <li>
            <user-dropdown></user-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </el-header>
</template>
<script>
import SideCollapse from '@/components/SideCollapse'
import UserDropdown from '@/components/UserDropdown'
export default {
  components: {
    SideCollapse,
    UserDropdown
  },
  methods: {
    getData() {
      this.$api.common.siteName().then(res => {
        if (res.code === 200) {
          window.open(`http://${res.data}`, '_blank')
        }
      })
    },
    handleLink() {
      this.getData()
    }
  }
}
</script>
<style scoped lang="less">
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 0;
  .header_l {
    width: 200px;
    height: 100%;
    float: left;
    transition: width 0.3s;
    overflow: hidden;
    a {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      background: #409eff;
      img {
        width: 40%;
      }
    }
  }
  .header_r {
    height: 100%;
    margin-left: 200px;
    background-color: #fff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    .headr_d1 {
      float: left;
      height: 100%;
      margin-left: 20px;
      display: flex;
      align-items: center;
      a {
        margin-left: 15px;
        line-height: 18px;
      }
    }
    .headr_d2 {
      float: right;
      height: 100%;
      margin-right: 20px;
      .headrUl {
        height: 100%;
        li {
          float: left;
          height: 100%;
          line-height: 50px;
          padding: 0 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
