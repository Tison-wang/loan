<template>
  <div class="apply-money">
    <img class="bg" src="../../assets/images/banner.jpg" />
    <div class="apply-slider">
      <div class="money-wrap">
        <p>申请金额(元)</p>
        <p>{{ form.amount }}</p>
      </div>
      <div class="slider-wrap">
        <span class="btn reduce" @click="reduce"></span>
        <span class="btn add" @click="add"></span>
        <van-slider
          :min="home.minLoan"
          :max="home.maxLoan"
          bar-height="15px"
          inactive-color="#6da3c9"
          :step="1000"
          v-model="form.amount"
        >
          <div slot="button" class="apply-btn"></div>
        </van-slider>
      </div>
    </div>
    <div class="loan-limit">
      <p>借款期限</p>
      <van-radio-group v-model="form.loanTerm">
        <van-radio :name="item" v-for="(item, index) in monthList" :key="index">
          <span slot="icon">{{ item }}个月</span>
        </van-radio>
      </van-radio-group>
    </div>
    <van-field
      class="use-for"
      v-model="form.useFor"
      label="贷款用途"
      placeholder="请输入贷款用途"
    />
    <van-field class="apply-count" v-model="count" label="每期还款">
      <div slot="input" class="count-input">
        {{ isNaN(repay) ? '' : repay }}元
        <span>
          (含日利率{{ isNaN(rateDay) ? '' : rateDay }}% ￥{{
            isNaN(rate) ? '' : rate
          }}元)
        </span>
      </div>
    </van-field>
    <!-- <van-field class="apply-count" v-model="count" label="借款用途">
      <div slot="input" class="count-input"></div>
    </!-->

    <van-checkbox class="user-xy" v-model="checked" shape="square">
      同意
      <span class="xy-link" @click="loanXy">《借款协议》</span>
    </van-checkbox>
    <van-button type="primary" @click="hanldeLink" class="loan-button"
      >立即申请</van-button
    >
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
export default {
  name: 'applyMoney',
  data() {
    return {
      form: {
        amount: null,
        loanTerm: null,
        useFor: null
      },
      count: '',
      checked: true,
      content: `甲方(借款人):_____________________<br>身份证号码:_________________________<br>一、双方就借款事项达成一致，约定如下:<br>二、借款金额<br>借款方向贷款方借人民币________万元。<br>三、借款利息<br>自支用贷款之日起，按实际支用数计算利息，并计算复利。在合同规定借款期内，年利为 _________。借款方如果不按期归还款，逾期部分加收利率_________。<br>四、借款期限<br>按本合同规定的利息偿还借款。贷款逾期不还的部分，贷款方有权限期追回贷款。<br>五、条款变更<br>因国家变更利率，需要变更合同条款时，由双方签订变更合同的文件，作为本合同的组成部分。<br>六、权利义务<br>贷款方有权监督贷款的使用情况，了解借款方的偿债能力等情况。借款方应如实提供有关的资料。借款 方如不按合同规定使用贷款，贷款方有权收回部分贷款，并对违约部分参照银行规定加收罚息。贷款方 提前还款的，应按规定减收利息。`,
      userStatus: {
        bankInfoStatus: false,
        identityStatus: false,
        userInfoStatus: false
      },
      home: {}
    }
  },
  computed: {
    rate() {
      const result = Number(
        Number(
          (this.form.amount * Number(this.home.serviceChargeRate)) /
            Number(this.form.loanTerm) /
            30
        ).toFixed(2)
      )
      return result
    },
    rateDay() {
      return (Number(this.home.serviceChargeRate) / 30).toFixed(2)
    },
    repay() {
      return (
        Number(
          Number(this.form.amount) +
            Number(this.form.amount) * Number(this.home.serviceChargeRate)
        ) / this.form.loanTerm
      ).toFixed(2)
    },
    monthList() {
      const months = this.home.allowLoanMonths
        ? this.home.allowLoanMonths.split(',')
        : []
      months.sort((a, b) => a - b)
      return months
    }
  },
  mounted() {
    this.getLoanData()
  },
  methods: {
    getHasUndoneLoan() {
      this.$api.common.hasUndoneLoan()
    },
    reduce() {
      if (this.form.amount > this.home.minLoan) {
        this.form.amount -= 1000
      }
    },
    add() {
      if (this.form.amount < this.home.maxLoan) {
        this.form.amount += 1000
      }
    },
    getLoanData() {
      this.$api.common.home().then(res => {
        if (res.code === 200) {
          this.home = { ...res.data }
          this.form.amount =
            Number(Number(res.data.defaultLoan).toFixed(2)) || 0
          this.form.loanTerm = `${res.data.defaultLoanMonth}`
        }
      })
    },
    getUserStatus() {
      this.$api.common.infoStatus().then(res => {
        if (res.code === 200) {
          this.userStatus = { ...res.data }
        }
      })
    },
    async hanldeLink() {
      if (!this.checked) {
        this.$toast({
          type: 'warning',
          message: '请您同意并勾选协议'
        })
        return false
      }
      const res = await this.$api.common.infoStatus()
      this.userStatus = { ...res.data }
      if (
        !this.userStatus.bankInfoStatus ||
        !this.userStatus.identityStatus ||
        !this.userStatus.userInfoStatus
      ) {
        this.$router.push({ name: 'myInfo' })
        return false
      }
      const res2 = await this.$api.common.hasUndoneLoan()
      if (res2.data) {
        this.$router.push({ name: 'myLoan' })
      } else {
        if (!this.form.useFor) {
          this.$toast({
            type: 'warning',
            message: '请输入贷款用途'
          })
          return false
        }
        const params = Object.assign({}, this.form)
        params.rateDay = this.rateDay
        params.rate = this.rate
        params.repay = this.repay
        const val = JSON.stringify(params)
        this.$router.push({
          name: 'applyComfirm',
          query: { data: val }
        })
      }
    },
    loanXy() {
      this.$dialog
        .alert({
          title: '《借款协议》',
          message: this.content,
          className: 'loan-xy',
          confirmButtonText: '关闭'
        })
        .then(() => {
          // on confirm
        })
    }
  }
}
</script>
<style lang="less">
.apply-money {
  background: #fff;
  height: 100vh;
  margin-bottom: 60px;
  .bg {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
  .apply-slider {
    .money-wrap {
      text-align: center;
      font-size: 20px;
    }
    .van-slider--disabled {
      opacity: 1;
    }
    .van-slider {
      width: 60%;
      margin: 0 auto;

      .van-slider__bar {
        background: #0362ad !important;
      }
    }
    .btn {
      display: inline-block;
      width: 35px;
      height: 35px;
      position: absolute;
      top: -7px;
    }
    .reduce {
      background: url('../../assets/images/subtract2.png') no-repeat;
      background-size: contain;
      left: 20px;
    }
    .add {
      background: url('../../assets/images/plus2.png') no-repeat;
      background-size: contain;
      right: 20px;
    }
    .apply-btn {
      width: 36px;
      height: 36px;
      background: url('../../assets/images/drag.png') no-repeat;
      background-size: contain;
    }
    .slider-wrap {
      position: relative;
      margin-top: 15px;
    }
  }
  .loan-limit {
    margin: 30px 0 0;
    p {
      font-size: 16px;
      margin: 0 0 10px 20px;
    }
    .van-radio-group {
      margin-left: 20px;
    }
    .van-radio {
      display: inline-block;
      .van-radio__icon {
        color: #999;
        background-color: #f5f5f9;
        font-size: 16px;
        width: 60px;
        height: 30px;
        line-height: 30px;
        margin-right: 10px;
        margin-bottom: 10px;
        text-align: center;
        border-radius: 3px;
        &.van-radio__icon--checked {
          background: #1989fa;
          color: #fff;
        }
      }
    }
  }
  .use-for {
    .van-field__label {
      width: 70px;
    }
  }
  .apply-count {
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    .count-input {
      font-size: 18px;
      span {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
      }
    }
    .van-field__label {
      width: 70px;
    }
  }
  .user-xy {
    margin: 15px 0 15px 3%;
    span.xy-link {
      color: #1989fa;
    }
  }
}
.loan-xy {
  .van-dialog__header {
    padding: 8px 0;
    color: #1989fa;
    border-bottom: 1px solid #1989fa;
  }
  .van-dialog__message {
    text-align: left;
  }
  .van-button--large {
    height: auto;
  }
}
</style>
