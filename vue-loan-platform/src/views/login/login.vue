<template>
  <div class="login">
    <van-cell-group>
      <van-field
        v-model="form.userName"
        left-icon="phone-o"
        placeholder="请输入手机号"
      />

      <van-field
        v-model="form.password"
        :type="inputType"
        placeholder="请输入密码"
        right-icon="closed-eye"
      >
        <van-icon
          slot="right-icon"
          @click="checkPwd"
          class-prefix="loan"
          :name="inputType === 'text' ? 'opened' : 'closed'"
        />
        <van-icon slot="left-icon" class-prefix="loan" name="pwd" />
      </van-field>
    </van-cell-group>
    <van-button
      type="primary"
      class="loan-button"
      :loading="loading"
      @click="_login"
      >登录</van-button
    >
    <van-button type="primary" :to="{ name: 'register' }" class="loan-button"
      >注册</van-button
    >
    <router-link class="forget" :to="{ name: 'forgetPwd' }"
      >忘记密码？</router-link
    >
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      inputType: 'password',
      form: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    checkPwd() {
      this.inputType = this.inputType === 'password' ? 'text' : 'password'
    },
    _login() {
      if (
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
      this.$store
        .dispatch('user/_login', this.form)
        .then(res => {
          if (res.code === 200) {
            this.loading = false
            // this.$router.push(
            //   `${this.$route.query.redirect || "/" + this.loan_path}`
            // );
            this.$router.push({ name: 'applyMoney' })
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style scoped lang="less">
.login {
  /deep/ .van-field__left-icon {
    margin-right: 15px;
  }
  .forget {
    float: right;
    margin-right: 2%;
    margin-top: 10px;
  }
}
</style>
