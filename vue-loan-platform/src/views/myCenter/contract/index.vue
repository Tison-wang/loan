<template>
  <div class="contract">
    <div class="contract-content">
      <!-- 1、十分士大夫士大夫士大夫士大夫十分打发士大夫士大夫1、十分士大夫士大夫士大夫士大夫十分打发士大夫士大夫1、十分士大夫士大夫士大夫士大夫十分打发士大夫士大夫 -->
    </div>
    <van-checkbox class="user-xy" v-model="checked" shape="square">
      <span class="xy-link">确认签署合同</span>
    </van-checkbox>
    <van-button type="primary" class="loan-button">确认提交</van-button>
  </div>
</template>
<script>
export default {
  name: 'contract',
  data() {
    return {
      checked: true
    }
  }
}
</script>
<style lang="less">
.contract {
  background: #fff;
  height: 100vh;
  .contract-content,
  .user-xy {
    padding: 10px;
  }
}
</style>
