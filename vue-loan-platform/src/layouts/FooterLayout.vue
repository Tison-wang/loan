<template>
  <van-tabbar route>
    <van-tabbar-item :to="{ name: 'applyMoney' }" icon="wap-home"
      >借款</van-tabbar-item
    >
    <van-tabbar-item :to="{ name: 'gold' }" icon="gold-coin"
      >钱包</van-tabbar-item
    >
    <van-tabbar-item :to="{ name: 'myCenter' }" icon="manager"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
<script>
export default {
  name: 'footerLayout'
}
</script>
<style scoped lang="less"></style>
