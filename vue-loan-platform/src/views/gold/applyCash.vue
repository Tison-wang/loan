<template>
  <div class="apply-cash">
    <div class="input-wrap">
      <span class="cash-text">提现金额：</span>
      <van-field
        type="number"
        @input="checkAmount"
        v-model="amount"
        placeholder="请输入提现金额"
      />
      <van-button @click="handleAll">全部提现</van-button>
    </div>

    <van-button
      type="primary"
      :disabled="isDisable"
      class="loan-button"
      @click="handleApply"
      >申请提现</van-button
    >
  </div>
</template>
<script>
export default {
  name: 'applyCash',
  data() {
    return {
      amount: '',
      isDisable: true
    }
  },
  methods: {
    checkAmount() {
      if (!this.amount) {
        this.isDisable = true
      } else if (+this.amount > +this.$route.query.amount) {
        this.isDisable = true
      } else {
        this.isDisable = false
      }
    },
    handleAll() {
      this.amount = this.$route.query.amount
      this.isDisable = false
    },
    handleApply() {
      if (!this.isDisable) {
        this.$router.push({ name: 'payCash', query: { amount: this.amount } })
      }
    }
  }
}
</script>
<style lang="less">
.apply-cash {
  .input-wrap {
    display: flex;
    margin: 15px 10px 0;
    .cash-text {
      min-width: 80px;
    }
    .van-button {
      min-width: 100px;
      margin-left: 10px;
    }
  }
  .cash-text {
    width: 60px;
    align-self: center;
  }
}
</style>
