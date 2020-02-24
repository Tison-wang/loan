<template>
  <div class="apply-comfirm">
    <van-panel title="确定借款信息">
      <ul>
        <li>
          <span>借款金额</span>
          ￥{{ getData.amount || 0 }}
        </li>
        <li>
          <span>借款期限</span>
          ￥{{ getData.loanTerm || 0 }}
        </li>
        <li>
          <span>每月还款</span>
          ￥{{ getData.repay || 0 }}
          <i>
            (含日利率 {{ getData.rateDay || 0 }}% ￥{{ getData.rate || 0 }}元)
          </i>
        </li>
      </ul>
    </van-panel>
    <van-button type="primary" @click="handleApply" class="loan-button"
      >确定申请</van-button
    >
  </div>
</template>
<script>
export default {
  name: 'applyComfirm',
  computed: {
    getData() {
      return JSON.parse(this.$route.query.data) || {}
    }
  },
  methods: {
    handleApply() {
      if (this.getData) {
        const params = {
          amount: this.getData.amount,
          loanTerm: this.getData.loanTerm,
          useFor: this.getData.useFor
        }
        this.$api.common.loan(params).then(res => {
          if (res.code === 200) {
            this.$toast({
              type: 'success',
              message: '申请成功'
            })
            this.$router.push({ name: 'myLoan' })
          }
        })
      }
    }
  }
}
</script>
<style lang="less">
.apply-comfirm {
  ul {
    padding: 0 15px 20px;
    li {
      line-height: 30px;
      font-size: 16px;
      span {
        color: #999;
        margin-right: 10px;
      }
      i {
        font-style: normal;
        color: #999;
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
