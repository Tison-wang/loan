<template>
  <div class="my-loan">
    <div v-if="list.length">
      <router-link
        :to="{ name: 'loanDetail', query: { oid: item.id } }"
        v-for="item in list"
        :key="item.id"
      >
        <van-panel>
          <div slot="header">
            <van-cell is-link>
              <span slot="title">借款编号：{{ item.no }}</span>
              <span slot="default">{{ status(item.state) }}</span>
            </van-cell>
          </div>
          <div class="loan-detail" slot="default">
            <img src="../../../assets/images/b_03.png" />
            <div class="loan-right">
              <p>
                借款金额：
                <span>￥{{ item.amount }}</span>
              </p>
              <p>
                还款分期：
                <span
                  >￥{{ item.repayAmountOfMonth }}X{{ item.loanTerm }}期</span
                >
              </p>
            </div>
          </div>
        </van-panel>
      </router-link>
    </div>
    <no-data v-if="isShow">
      <!-- <p>无需还款哦！</p> -->
      <p>您还未提交任何借款申请哦。</p>
      <van-button
        type="primary"
        class="loan-button"
        :to="{ name: 'applyMoney' }"
        >去申请借款</van-button
      >
    </no-data>
  </div>
</template>
<script>
import NoData from '@/components/NoData'
export default {
  name: 'myLoan',
  components: { NoData },
  data() {
    return {
      list: [],
      isShow: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    status(state) {
      let result = ''
      switch (state) {
        case 0:
          result = '贷款申请成功'
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
    },
    getList() {
      this.$api.common.loanList().then(res => {
        if (res.code === 200) {
          this.list = res.data.list || []
          this.isShow = this.list.length === 0
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.my-loan {
  .van-panel {
    margin-bottom: 10px;
  }
  .van-cell__title {
    word-break: break-all;
  }
  .van-cell__value {
    color: #f90006;
    width: 105px;
    flex: none;
  }
  .loan-detail {
    display: flex;
    border-top: 1px solid #f2f3f5;
    padding: 15px;
    img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
      border: 1px solid #f0f0f0;
    }
    .loan-right {
      flex: 1;
      p {
        font-size: 14px;
        line-height: 25px;
        span {
          font-weight: normal;
          color: #f90006;
        }
      }
    }
  }
}
</style>
