<template>
  <div class="login">
    <div class="loginBox">
      <h2 class="loginH2">后台管理系统</h2>
      <div class="loginCon">
        <div class="titleDiv">
          <h3>立即登录</h3>
          <p>输入要登录的用户名和密码:</p>
          <i class="el-icon-key"></i>
        </div>
        <el-form ref="loginForm" :rules="rules" :model="ruleForm">
          <el-form-item prop="userName">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              v-model="ruleForm.userName"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              show-password
              @keyup.enter.native="loginYz('loginForm')"
            ></el-input>
          </el-form-item>

          <el-button
            type="primary"
            class="loginBtn"
            @click="loginYz('loginForm')"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      // loading: false,
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3到15个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // this.shopTip();
  },
  methods: {
    // onSuccess() {
    //   // this.showSlide = false
    //   this._login()
    // },
    // onFail() {
    //   this.$message.error('验证失败')
    // },
    // refresh() {
    //   this.$refs.slideDiv.reset()
    // },
    loginYz(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // this.loading = true;
          this._login()
        }
      })
    },
    _login() {
      this.$store
        .dispatch('user/_login', this.ruleForm)
        .then(res => {
          if (res.code === 200) {
            this.$router.push(this.$route.query.redirect || '/')
            // this.$router.push({ name: "home" });
          }
        })
        .finally(() => {
          this.loading = false
          // this.refresh();
          // this.$message.error(error);
        })
    }
  }
}
</script>
<style scoped lang="less">
.login {
  height: 100%;
  width: 100%;
  background: url(../../assets/images/loginBg.jpg) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginBox {
  height: 455px;
  width: 550px;
}
.loginH2 {
  font-size: 38px;
  color: #fff;
  text-align: center;
}
.loginCon {
  margin-top: 30px;
  background: #eee;
  border-radius: 4px;
  .titleDiv {
    padding: 0 28px;
    background: #fff;
    position: relative;
    height: 120px;
    border-radius: 4px 4px 0 0;
    h3 {
      font-size: 22px;
      color: #555;
      font-weight: initial;
      padding-top: 23px;
    }
    p {
      font-size: 16px;
      color: #888;
      padding-top: 12px;
    }
    i {
      font-size: 65px;
      color: #ddd;
      position: absolute;
      right: 27px;
      top: 29px;
    }
  }
  .el-form {
    padding: 25px 25px 30px 25px;
    background: #eee;
    border-radius: 0 0 4px 4px;
  }
}
.loginBtn {
  width: 100%;
  background: #19b9e7;
}
</style>
