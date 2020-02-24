<template>
  <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
</template>
<script>
export default {
  name: 'HeaderLayout',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.van-hairline--bottom::after {
  border: 0;
}
</style>
