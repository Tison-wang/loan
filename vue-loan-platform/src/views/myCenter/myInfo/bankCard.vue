<template>
  <div class="bank-card">
    <van-cell-group>
      <van-field
        v-model="form.name"
        label="持卡人姓名"
        placeholder="请输入姓名"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="form.bankName"
        label="开户银行"
        readonly
        clickable
        placeholder="请选择开户银行"
        @click="showPicker = true"
      />
      <van-field
        v-model="form.bankCardNumber"
        label="银行卡卡号"
        placeholder="请输入银行卡号"
      />

      <!-- <van-field
        v-model="form.mobile"
        label="贷款用途"
        placeholder="请输入贷款用途"
      />-->
    </van-cell-group>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <div class="tips">
      <p>温馨提示：</p>
      <p>填写的银行卡须是本人名下的借记卡（储蓄卡）。</p>
    </div>
    <van-button type="primary" @click="handleSend" class="loan-button"
      >提交</van-button
    >
  </div>
</template>
<script>
export default {
  name: 'bankCard',
  data() {
    return {
      form: {
        bankCardNumber: '',
        name: '',
        bankName: ''
      },
      showPicker: false,
      columns: [
        '工商银行',
        '中国银行',
        '建设银行',
        '招商银行',
        '广发银行',
        '邮储银行',
        '农业银行',
        '兴业银行',
        '平安银行',
        '中信银行',
        '华夏银行',
        '光大银行',
        '浦发银行',
        '民生银行'
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.$api.common.getInfo()
      this.form = {
        name: res.data.name,
        bankCardNumber: res.data.bankCardNumber,
        bankName: res.data.bankName
      }
    },
    handleSend() {
      if (!this.form.name) {
        this.$toast({
          type: 'warning',
          message: '请输入姓名'
        })
        return false
      } else if (!this.form.bankName) {
        this.$toast({
          type: 'warning',
          message: '请选择开户银行'
        })
        return false
      } else if (!this.form.bankCardNumber) {
        this.$toast({
          type: 'warning',
          message: '请输入银行卡号'
        })
        return false
      } else if (
        !/^([1-9]{1})(\d{15}|\d{18})$/.test(this.form.bankCardNumber)
      ) {
        this.$toast({
          type: 'warning',
          message: '请输入正确的银行卡号'
        })
        return false
      }
      this.$api.common.updateInfo(this.form).then(res => {
        if (res.code === 200) {
          this.$toast({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push({ name: 'myInfo' })
        }
      })
    },
    onConfirm(value) {
      this.form.bankName = value
      this.showPicker = false
    }
  }
}
</script>
<style lang="less">
.bank-card {
  .van-cell-group:first-child {
    margin-bottom: 10px;
  }
  .tips {
    padding: 10px 12px;
    color: #999;
  }
}
</style>
