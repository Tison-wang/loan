<template>
  <div class="loan-detail">
    <van-panel class="process-wrap" title="借款进度">
      <div class="process">
        <div class="process-title">
          <span class="tips-color">
            {{ active === 11 ? '放款成功' : status }}
          </span>
          <span class="money-text">￥{{ detail.amount }}元</span>
        </div>
        <van-steps :active="active" class="process-step">
          <van-step>审核中</van-step>
          <van-step>{{ status }}</van-step>
          <van-step>放款成功</van-step>
        </van-steps>
        <div class="tips-wrap">
          <span>温馨提示</span>
          <div class="tips-content">{{ detail.stateDesc }}</div>
        </div>
      </div>
    </van-panel>
    <van-panel title="借款详情">
      <ul>
        <li>
          <span>订单编号</span>
          {{ detail.no }}
        </li>
        <li>
          <span>借款金额</span>
          ￥{{ detail.amount }}
        </li>
        <li>
          <span>借款期限</span>
          {{ detail.loanTerm }}个月
        </li>
        <!-- <li>
          <span>到账银行</span>
          招商银行
        </li>-->
        <li>
          <span>每月还款</span>
          ￥{{ detail.repayAmountOfMonth }}
        </li>
        <!-- <li>
          <span>还款说明</span>
          您需要再15日前，进入我的还款列表进行还款
        </li>-->
      </ul>
    </van-panel>
  </div>
</template>
<script>
export default {
  name: 'loanDetail',
  data() {
    return {
      active: 1,
      detail: {}
    }
  },
  computed: {
    status() {
      let result = ''
      switch (this.detail.state) {
        case 0:
          result = '贷款申请'
          break
        case 1:
          result = '正在审核'
          break
        case 2:
          result = '审核不通过'
          break
        case 3:
          result = '审核通过'
          break
        case 4:
          result = '授权码失效'
          break
        case 5:
          result = '收取保险费'
          break
        case 6:
          result = '预付前1期费用'
          break
        case 7:
          result = '预付前2期费用'
          break
        case 8:
          result = '预付前3期费用'
          break
        case 9:
          result = '订单取消'
          break
        case 10:
          result = '申请退款'
          break
        case 11:
          result = '放款成功'
          break
        case 12:
          result = '打款中'
          break
        case 13:
          result = '信用流水'
          break
        case 14:
          result = '银行卡异常'
          break
        case 15:
          result = '解冻'
          break
        case 16:
          result = '冻结'
          break
        case 17:
          result = '解冻成功,需回档'
          break
      }
      return result
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.$api.common.loanDetail(this.$route.query.oid)
      this.detail = res.data
      if (this.detail.state === 0) {
        this.active = 0
      } else if (this.detail.state === 11) {
        this.active = 2
      } else {
        this.active = 1
      }
    }
  }
}
</script>
<style lang="less">
.loan-detail {
  .process-wrap {
    margin-bottom: 10px;
    padding-bottom: 40px;
    .process-title {
      display: flex;
      span {
        flex: 1;
        &.tips-color {
          color: red;
        }
        &.money-text {
          font-size: 22px;
          text-align: right;
        }
      }
    }
  }
  .process {
    margin-top: 15px;
    padding: 0 20px;
  }
  .process-step {
    width: 90%;
    margin: 15px auto 0;
  }
  .tips-wrap {
    display: flex;
    span {
      flex: 1;
    }
    .tips-content {
      flex: 2;
      color: red;
    }
  }
  ul {
    padding: 0 15px 20px;
    li {
      line-height: 30px;
      font-size: 16px;
    }
  }
}
</style>
