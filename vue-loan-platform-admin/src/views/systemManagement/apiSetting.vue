<template>
  <div class="api-setting">
    <div class="title">
      验证码通道
    </div>
    <el-form-item label="验证码短信接口地址" prop="codeSmsUrl">
      <el-input v-model="form.codeSmsUrl"></el-input>
    </el-form-item>
    <el-form-item label="验证码短信用户id" prop="codeSmsUserId">
      <el-input v-model="form.codeSmsUserId"></el-input>
    </el-form-item>
    <el-form-item label="验证码短信账号" prop="codeSmsAccount">
      <el-input v-model="form.codeSmsAccount"></el-input>
    </el-form-item>
    <el-form-item label="验证码短信账号的密码" prop="codeSmsPassword">
      <el-input v-model="form.codeSmsPassword"></el-input>
    </el-form-item>

    <div class="title">
      业务通知通道
    </div>
    <el-form-item label="通知类短信接口地址" prop="notifySmsUrl">
      <el-input v-model="form.notifySmsUrl"></el-input>
    </el-form-item>
    <el-form-item label="通知类短信用户id" prop="notifySmsUserId">
      <el-input v-model="form.notifySmsUserId"></el-input>
    </el-form-item>
    <el-form-item label="通知类短信账号" prop="notifySmsAccount">
      <el-input v-model="form.notifySmsAccount"></el-input>
    </el-form-item>
    <el-form-item label="通知类短信账号的密码" prop="notifySmsPassword">
      <el-input v-model="form.notifySmsPassword"></el-input>
    </el-form-item>
    <!-- <el-form-item label="单个站点每日获取最大次数" prop="siteCountLimit">
      <el-input
        v-model.number="form.siteCountLimit"
        @input="changePrice(form.siteCountLimit, 'siteCountLimit')"
      ></el-input>
    </el-form-item>
    <el-form-item label="是否开启验证码">
      <el-radio-group v-model="form.openCodeStatus">
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
      <el-tooltip
        effect="dark"
        content="温馨提示：关闭短信验证码功能，可导致前端用户无需短信验证码即可修改密码，请谨慎选择！"
        placement="left-end"
      >
        <i class="api-tips el-icon-warning"></i>
      </el-tooltip>
    </el-form-item> -->
  </div>
</template>
<script>
export default {
  name: 'apiSetting',
  props: {
    form: Object,
    default: {}
  },
  methods: {
    changePrice(val, type) {
      if (isNaN(val) || !val) {
        this.$nextTick(() => {
          this.form[type] = ''
        })
      }
    }
  }
}
</script>
<style lang="less">
.api-tips {
  color: #409eff;
  font-size: 16px;
  margin-left: 20px;
}
.api-setting {
  .title {
    width: 72%;
    text-align: center;
    margin-bottom: 22px;
  }
}
</style>
