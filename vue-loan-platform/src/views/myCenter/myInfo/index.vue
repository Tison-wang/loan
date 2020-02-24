<template>
  <div class="my-info">
    <div class="tips">只需3分钟完成资料验证，即可申请借款哦~</div>
    <van-cell
      title="身份信息"
      label="*让我们了解您的基本情况"
      is-link
      to="id-info"
    >
      <van-icon slot="icon" class-prefix="loan" name="id-info" />
      <div
        slot="default"
        :class="userStatus.identityStatus ? '' : 'no-perfect'"
      >
        {{ userStatus.identityStatus ? '已填写' : '不完整' }}
      </div>
    </van-cell>
    <van-cell
      title="资料信息"
      label="*让我们了解您的资料信息"
      is-link
      to="person-info"
    >
      <van-icon slot="icon" class-prefix="loan" name="person-info" />
      <div
        slot="default"
        :class="userStatus.userInfoStatus ? '' : 'no-perfect'"
      >
        {{ userStatus.userInfoStatus ? '已填写' : '不完整' }}
      </div>
    </van-cell>
    <van-cell
      title="收款银行卡"
      label="*捷信金融会将钱打到该卡内"
      is-link
      to="bank-card"
    >
      <van-icon slot="icon" class-prefix="loan" name="yhk" />
      <div
        slot="default"
        :class="userStatus.bankInfoStatus ? '' : 'no-perfect'"
      >
        {{ userStatus.bankInfoStatus ? '已填写' : '不完整' }}
      </div>
    </van-cell>
    <van-button type="primary" :to="{ name: 'applyMoney' }" class="loan-button"
      >立即借款</van-button
    >
  </div>
</template>
<script>
export default {
  name: 'myInfo',
  data() {
    return {
      userStatus: {
        bankInfoStatus: false,
        identityStatus: false,
        userInfoStatus: false
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$api.common.infoStatus().then(res => {
        if (res.code === 200) {
          this.userStatus = { ...res.data }
        }
      })
    }
  }
}
</script>
<style lang="less">
.my-info {
  .tips {
    text-align: center;
    padding: 10px 0;
  }
  .van-cell__value {
    align-self: center;
    font-size: 12px;
    .no-perfect {
      color: #1989fa;
    }
  }
  .van-cell__title {
    flex: 2;
  }
  .van-cell__right-icon {
    line-height: 45px;
  }
  i.loan {
    font-size: 30px;
    line-height: 45px;
    margin-right: 10px;
  }
  i.loan-id-info {
    color: #1f8fef;
  }
  i.loan-person-info {
    color: #f45d5d;
  }
  i.loan-yhk {
    color: #ecab5a;
  }
}
</style>
