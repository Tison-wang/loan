<template>
  <div class="forget-pwd">
    <van-cell-group>
      <van-field
        v-model="form.userName"
        label="手机号"
        placeholder="请输入手机号"
      />

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
        class="sms-code"
        v-if="isShow"
        v-model="form.smsCode"
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button
          v-show="sendAuthCode"
          @click="send"
          class="send-code"
          slot="button"
          size="small"
          type="primary"
          >发送验证码</van-button
        >
        <van-button
          v-show="!sendAuthCode"
          slot="button"
          class="send-code"
          size="small"
          type="primary"
          >{{ auth_time }}s</van-button
        >
      </van-field>
      <van-field
        v-model="form.password"
        type="password"
        label="新密码"
        placeholder="请设置6-16位密码"
      ></van-field>
    </van-cell-group>
    <van-button type="primary" @click="forget" class="loan-button"
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
        userName: '',
        code: '',
        password: '',
        smsCode: ''
      },
      imgCode: '',
      isShow: false,
      sendAuthCode: true,
      auth_time: 0
    }
  },
  mounted() {
    this.getImgCode()
    this.getOpenStatus()
  },
  methods: {
    forget() {
      if (!this.form.userName) {
        this.$toast({
          type: 'warning',
          message: '请输入手机号'
        })
        return false
      } else if (!/^1[34578]\d{9}$/.test(this.form.userName)) {
        this.$toast({
          type: 'warning',
          message: '请输入正确的手机号'
        })
        return false
      } else if (!this.form.code) {
        this.$toast({
          type: 'warning',
          message: '请输入验证码'
        })
        return false
      } else if (this.isShow && !this.form.smsCode) {
        this.$toast({
          type: 'warning',
          message: '请输入短信验证码'
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
      this.$api.common.forgetPwd(this.form).then(res => {
        if (res.code === 200) {
          this.$toast({
            type: 'success',
            message: '修改成功'
          })
          this.$router.push({ name: 'login' })
        }
      })
    },
    getImgCode() {
      this.$api.common.imageCode().then(() => {
        const num = Math.ceil(Math.random() * 10000000)
        this.imgCode = `${process.env.VUE_APP_BASE_API}/front/imageCode?${num}`
      })
    },
    getOpenStatus() {
      this.$api.common.openStatus().then(res => {
        this.isShow = res.data
      })
    },
    send() {
      if (!this.form.userName) {
        this.$toast({
          type: 'warning',
          message: '请输入手机号'
        })
        return false
      } else if (!/^1[34578]\d{9}$/.test(this.form.userName)) {
        this.$toast({
          type: 'warning',
          message: '请输入正确的手机号'
        })
        return false
      }
      this.getAuthCode()
      this.$api.common.getMobileCode(this.form.userName, 2).then(res => {
        if (res.code === 200) {
          this.$toast({
            type: 'success',
            message: '验证码发送成功'
          })
        }
      })
    },
    againCode() {
      this.getImgCode()
    },
    getAuthCode() {
      this.sendAuthCode = false
      this.auth_time = 60
      let auth_timetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true
          clearInterval(auth_timetimer)
        }
      }, 1000)
    }
  }
}
</script>
<style scoped lang="less">
.forget-pwd {
  .code {
    img {
      height: 24px;
    }
  }
  .send-code {
    width: 78px;
  }
}
</style>
