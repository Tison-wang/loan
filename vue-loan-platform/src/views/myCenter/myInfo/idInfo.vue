<template>
  <div class="id-info">
    <div class="tips">填写真实有效的信息，审核才会通过哦~</div>
    <van-cell-group>
      <van-field
        v-model="form.name"
        required
        label="姓名"
        placeholder="请输入真实的姓名"
      />

      <van-field
        v-model="form.idCardNumber"
        label="身份证号"
        placeholder="请输入真实身份证"
        required
      />
    </van-cell-group>
    <div class="tips">
      <p>*须本人身份证，且内容清晰可辨</p>
      <p>*请您确认拍照权限已开启</p>
    </div>
    <van-uploader :max-count="1" :after-read="handleFront">
      <div class="auto-uploader" slot="default">
        <img v-if="frontImg" :src="frontImg" />
        <img v-else src="../../../assets/images/1.png" />
      </div>
    </van-uploader>
    <van-uploader :max-count="1" :after-read="handleReverse">
      <div class="auto-uploader" slot="default">
        <img v-if="reverseImg" :src="reverseImg" />
        <img v-else src="../../../assets/images/1.png" />
      </div>
    </van-uploader>
    <van-uploader :max-count="1" :after-read="handleHold">
      <div class="auto-uploader" slot="default">
        <img v-if="holdImg" :src="holdImg" />
        <img v-else src="../../../assets/images/1.png" />
      </div>
    </van-uploader>
    <van-button type="primary" @click="handleSend" class="loan-button"
      >提交</van-button
    >
  </div>
</template>
<script>
export default {
  name: 'idInfo',
  data() {
    return {
      frontImg: '',
      reverseImg: '',
      holdImg: '',
      idcardReg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
      form: {
        name: '',
        idCardNumber: '',
        idCardFrontImage: '',
        idCardReverseImage: '',
        idCardHoldImage: ''
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$api.common.getInfo().then(res => {
        if (res.code === 200) {
          if (res.data) {
            this.form = {
              name: res.data.name,
              idCardNumber: res.data.idCardNumber,
              idCardFrontImage: res.data.idCardFrontImage,
              idCardReverseImage: res.data.idCardReverseImage,
              idCardHoldImage: res.data.idCardHoldImage
            }
            this.frontImg = `${process.env.VUE_APP_BASE_API}/common/download/${this.form.idCardFrontImage}`
            this.reverseImg = `${process.env.VUE_APP_BASE_API}/common/download/${this.form.idCardReverseImage}`
            this.holdImg = `${process.env.VUE_APP_BASE_API}/common/download/${this.form.idCardHoldImage}`
          }
        }
      })
    },
    handleSend() {
      if (!this.form.name) {
        this.$toast({
          type: 'warning',
          message: '请输入真实的姓名'
        })
        return false
      } else if (!this.form.idCardNumber) {
        this.$toast({
          type: 'warning',
          message: '请输入真实身份证'
        })
        return false
      } else if (!this.idcardReg.test(this.form.idCardNumber)) {
        this.$toast({
          type: 'warning',
          message: '请输入正确的身份证'
        })
        return false
      } else if (!this.form.idCardFrontImage) {
        this.$toast({
          type: 'warning',
          message: '请上传身份证正面照'
        })
        return false
      } else if (!this.form.idCardReverseImage) {
        this.$toast({
          type: 'warning',
          message: '请上传身份证反面照'
        })
        return false
      } else if (!this.form.idCardHoldImage) {
        this.$toast({
          type: 'warning',
          message: '请上传手持身份证照'
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
    handleFront(obj) {
      this.frontImg = obj.content
      let formData = new FormData()
      formData.append('file', obj.file)
      this.$api.common.uploadFile(formData).then(res => {
        this.form.idCardFrontImage = res.data
      })
    },
    handleReverse(obj) {
      this.reverseImg = obj.content
      let formData = new FormData()
      formData.append('file', obj.file)
      this.$api.common.uploadFile(formData).then(res => {
        this.form.idCardReverseImage = res.data
      })
    },
    handleHold(obj) {
      this.holdImg = obj.content
      let formData = new FormData()
      formData.append('file', obj.file)
      this.$api.common.uploadFile(formData).then(res => {
        this.form.idCardHoldImage = res.data
      })
    }
  }
}
</script>
<style lang="less">
.id-info {
  .tips {
    text-align: center;
    padding: 10px 0;
  }
  .van-uploader {
    display: block;
    background: #fff;
    .van-uploader__wrapper {
      justify-content: center;
    }
    .auto-uploader {
      margin: 0 auto;
      img {
        max-height: 220px;
        max-width: 100%;
      }
    }
  }
  .loan-button {
    margin-bottom: 20px;
  }
}
</style>
