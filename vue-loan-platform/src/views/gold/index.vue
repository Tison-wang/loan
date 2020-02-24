<template>
  <div class="gold">
    <div class="gold-bg">
      <img src="../../assets/images/about_1.png" />
      <span>正常</span>
    </div>
    <div class="total flexbox">
      <div class="handling flex-item">
        <h4>冻结金额(元)</h4>
        <p>{{ freezeAmount }}</p>
      </div>
      <div class="can-handle flex-item">
        <h4>可提现金额(元)</h4>
        <p>{{ amount }}</p>
      </div>
    </div>
    <van-button
      type="primary"
      class="loan-button"
      :disabled="isDisable"
      @click="cash"
      >提现</van-button
    >
  </div>
</template>
<script>
export default {
  name: 'gold',
  data() {
    return {
      amount: 0,
      freezeAmount: 0,
      isDisable: true
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$api.common.wallet().then(res => {
        if (res.code === 200 && res.data) {
          this.amount = res.data.amount || 0
          this.isDisable = !this.amount
          this.freezeAmount = res.data.freezeAmount || 0
        }
      })
    },
    getStatus() {
      this.$api.common.canWithdraw().then(res => {
        this.isDisable = !(res.code === 200)
        if (!this.isDisable) {
          this.$router.push({
            name: 'applyCash',
            query: { amount: this.amount }
          })
        }
      })
    },
    cash() {
      if (this.amount) {
        this.getStatus()
      }
    }
  }
}
</script>
<style scoped lang="less">
.gold {
  background: #fff;
  height: 100vh;
  .gold-bg {
    width: 100%;
    background: url('../../assets/images/usr_1.jpg') 0 0 no-repeat;
    background-size: cover;
    padding: 30px 0 20px;
    text-align: center;
    img {
      display: block;
      margin: 0 auto;
    }
    span {
      color: #fff;
      display: inline-block;
      border-radius: 20px;
      border: 1px solid #fff;
      margin: 30px auto 0;
      padding: 5px 15px;
      font-size: 16px;
    }
  }
  .total {
    padding: 20px;
    .flex-item:last-child {
      border-left: 1px solid #e1e1e1;
      padding-left: 15px;
      margin-left: 10px;
    }
    h4 {
      font-size: 16px;
      font-weight: bold;
    }
    p {
      font-size: 18px;
      color: #f60;
      line-height: 40px;
    }
  }
}
</style>
