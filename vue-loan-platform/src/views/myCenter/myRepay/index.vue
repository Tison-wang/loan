<template>
  <div class="my-repay">
    <router-link :to="{ name: 'applyMoney' }" v-if="list.length">
      <van-panel v-for="item in list" :key="item.id">
        <div slot="header">
          <van-cell is-link>
            <span slot="title">借款编号：{{ item.loanNo }}</span>
          </van-cell>
        </div>
        <div class="loan-detail" slot="default">
          <img src="../../../assets/images/b_03.png" />
          <div class="loan-right">
            <p>
              <span>本月还款金额：</span>
              ￥{{ item.amount || 0 }}
            </p>
            <p class="qs-num">第{{ item.currentPeriod || 1 }}期</p>
            <!-- <van-button type="primary" class="fr">立即还款</van-button> -->
          </div>
        </div>
      </van-panel>
    </router-link>
    <no-data v-if="isShow">
      <p>无需还款哦！</p>
      <!-- <p>您本月暂无需要还款账单。</p> -->
    </no-data>
  </div>
</template>
<script>
import NoData from '@/components/NoData'

export default {
  name: 'myRepay',
  components: { NoData },
  data() {
    return {
      list: [],
      isShow: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$api.common.repayList().then(res => {
        if (res.code === 200) {
          this.list = res.data.list || []
          this.isShow = this.list.length === 0
        }
      })
    }
  }
}
</script>
<style lang="less">
.my-repay {
  .van-panel {
    margin-bottom: 10px;
  }
  .van-cell__title {
    flex: 2;
  }
  .van-cell__value {
    color: #f90006;
  }
  .loan-detail {
    position: relative;
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
        &.qs-num {
          color: #fb6f00;
        }
        span {
          color: #999;
        }
      }
      .fr {
        position: absolute;
        right: 20px;
        top: 15px;
      }
    }
  }
}
</style>
