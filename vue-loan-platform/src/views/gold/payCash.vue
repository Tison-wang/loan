<template>
  <div class="pay-cash">
    <div class="pay-text" v-html="detail"></div>
    <div class="pay-foot">
      <van-button class="loan-button" type="primary" @click="handleApply"
        >确定提现</van-button
      >
      <van-button class="loan-button" type="default" @click="$router.go(-1)"
        >返回</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'payCash',
  data() {
    return {
      detail: null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$api.common.withdrawTips().then(res => {
        if (res.code === 200) {
          this.detail = res.data
        }
      })
    },
    handleApply() {
      const amount = this.$route.query.amount
      this.$api.common.withdraw(amount).then(res => {
        if (res.code === 200) {
          this.$toast({
            type: 'success',
            message: '申请提交成功'
          })
          this.$router.push({ name: 'gold' })
        }
      })
    }
  }
}
</script>
<style lang="less">
.pay-cash {
  margin-top: 20px;
  text-align: center;
  padding-bottom: 120px;
  .pay-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
  .pay-text {
    padding: 0 10px;
  }
  p {
    line-height: 30px;
    font-size: 14px;
    &.pay-red {
      color: red;
    }
  }
}
</style>
