<template>
  <div class="forget-pwd">
    <van-cell-group>
      <van-field
        v-model="form.code"
        label="验证码"
        placeholder="请输入图片验证码"
      >
        <div class="code" slot="right-icon" @click="againCode">
          <img :src="imgCode" />
        </div>
      </van-field>
      <van-field
        v-model="form.password"
        type="password"
        label="新密码"
        placeholder="请设置6-16位密码"
      ></van-field>
    </van-cell-group>
    <van-button type="primary" @click="updatePwd" class="loan-button"
      >完成</van-button
    >
  </div>
</template>
<script>
export default {
  name: 'forgetPwd',
  data() {
    return {
      form: {
        code: '',
        password: ''
      },
      imgCode: ''
    }
  },
  mounted() {
    this.getImgCode()
  },
  methods: {
    againCode() {
      this.getImgCode()
    },
    getImgCode() {
      this.$api.common.imageCode().then(() => {
        const num = Math.ceil(Math.random() * 10000000)
        this.imgCode = `${process.env.VUE_APP_BASE_API}/front/imageCode?${num}`
      })
    },
    updatePwd() {
      if (!this.form.code) {
        this.$toast({
          type: 'warning',
          message: '请输入验证码'
        })
        return false
      } else if (
        !this.form.password ||
        this.form.password.length < 6 ||
        this.form.password.length > 16
      ) {
        this.$toast({
          type: 'warning',
          message: '请输入6-16位密码'
        })
        return false
      }
      this.$api.common.editPassword(this.form).then(res => {
        if (res.code === 200) {
          this.$toast({
            type: 'success',
            message: '修改成功'
          })
          this.$router.push({ name: 'myCenter' })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.forget-pwd {
  .code {
    img {
      width: 65px;
      height: 24px;
    }
  }
}
</style>
