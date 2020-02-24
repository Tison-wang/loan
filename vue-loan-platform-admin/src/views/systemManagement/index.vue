<template>
  <div class="system-content">
    <el-form ref="form" :rules="rules" :model="form" label-width="190px">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleTab">
        <el-tab-pane label="常规设置" name="1">
          <basic :form="form" />
        </el-tab-pane>
        <el-tab-pane label="贷款设置" name="2">
          <loanSetting :form="form" />
        </el-tab-pane>
        <el-tab-pane label="接口设置" name="3" v-if="+type === 2">
          <apiSetting :form="form" />
        </el-tab-pane>
        <el-form-item>
          <el-button @click="updateInfo" type="primary" :loading="loading"
            >提交</el-button
          >
        </el-form-item>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Basic from './basic'
import LoanSetting from './loanSetting'
import ApiSetting from './apiSetting'
export default {
  name: 'system',
  components: {
    Basic,
    LoanSetting,
    ApiSetting
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (this.activeName === '1' && !value) {
        callback(new Error('请输入站点名称'))
      } else {
        callback()
      }
    }
    const validateTit = (rule, value, callback) => {
      if (this.activeName === '1' && !value) {
        callback(new Error('请输入站点标题'))
      } else {
        callback()
      }
    }
    const validateKey = (rule, value, callback) => {
      if (this.activeName === '1' && !value) {
        callback(new Error('请输入站点关键字'))
      } else {
        callback()
      }
    }
    const validateDesc = (rule, value, callback) => {
      if (this.activeName === '1' && !value) {
        callback(new Error('请输入站点描述'))
      } else {
        callback()
      }
    }
    const validateTips = (rule, value, callback) => {
      if (this.activeName === '1' && this.form.closeStatus && !value) {
        callback(new Error('请输入网站关闭提示'))
      } else {
        callback()
      }
    }
    const validateRecord = (rule, value, callback) => {
      if (this.activeName === '1' && !value) {
        callback(new Error('请输入ICP备案证书号'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (this.activeName === '1' && !value) {
        callback(new Error('请输入统计/客服代码调用'))
      } else {
        callback()
      }
    }
    const validateService = (rule, value, callback) => {
      if (this.activeName === '2' && !value) {
        callback(new Error('请输入服务费率'))
      } else {
        callback()
      }
    }
    const validateMin = (rule, value, callback) => {
      if (this.activeName === '2' && !value) {
        callback(new Error('请输入贷款最小金额'))
      } else {
        callback()
      }
    }
    const validateMax = (rule, value, callback) => {
      if (this.activeName === '2' && !value) {
        callback(new Error('请输入贷款最大金额'))
      } else {
        callback()
      }
    }
    const validateDefault = (rule, value, callback) => {
      if (this.activeName === '2' && !value) {
        callback(new Error('请输入初始显示金额'))
      } else {
        callback()
      }
    }
    const validateAllow = (rule, value, callback) => {
      if (this.activeName === '2' && value.length === 0) {
        callback(new Error('请选择允许选择月份'))
      } else {
        callback()
      }
    }
    const validateDefaultM = (rule, value, callback) => {
      if (this.activeName === '2' && !value) {
        callback(new Error('请选择初始选择月份'))
      } else {
        callback()
      }
    }
    const validateAudit = (rule, value, callback) => {
      if (this.activeName === '2' && !value) {
        callback(new Error('请输入服务费率'))
      } else {
        callback()
      }
    }
    const validateRepay = (rule, value, callback) => {
      if (this.activeName === '2' && !value) {
        callback(new Error('请选择每月还款日'))
      } else {
        callback()
      }
    }
    const validateSmsUrl = (rule, value, callback) => {
      if (this.activeName === '3' && !value) {
        callback(new Error('请输入验证码短信接口地址'))
      } else {
        callback()
      }
    }
    const validateSmsId = (rule, value, callback) => {
      if (this.activeName === '3' && !value) {
        callback(new Error('请输入验证码短信用户id'))
      } else {
        callback()
      }
    }
    const validateAccount = (rule, value, callback) => {
      if (this.activeName === '3' && !value) {
        callback(new Error('请输入验证码短信账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (this.activeName === '3' && !value) {
        callback(new Error('请输入验证码短信账号的密码'))
      } else {
        callback()
      }
    }
    const validateNotifySmsUrl = (rule, value, callback) => {
      if (this.activeName === '3' && !value) {
        callback(new Error('请输入通知类短信接口地址'))
      } else {
        callback()
      }
    }
    const validateNotifyUserId = (rule, value, callback) => {
      if (this.activeName === '3' && !value) {
        callback(new Error('请输入通知类短信用户id'))
      } else {
        callback()
      }
    }
    const validateNotifyAccount = (rule, value, callback) => {
      if (this.activeName === '3' && !value) {
        callback(new Error('请输入通知类短信账号'))
      } else {
        callback()
      }
    }
    const validateNotifyPassword = (rule, value, callback) => {
      if (this.activeName === '3' && !value) {
        callback(new Error('请输入通知类短信账号的密码'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      activeName: '1',
      form: {
        siteTitle: '',
        siteName: '',
        siteKeyword: '',
        siteDesc: '',
        closeStatus: 0,
        recordInfo: '',
        bottomContent: '',
        closedTips: '',
        minLoan: '',
        maxLoan: '',
        defaultLoan: '',
        allowLoanMonths: '',
        defaultLoanMonth: '',
        serviceChargeRate: '',
        auditExpense: '',
        repaymentDate: '',
        // openCodeStatus: 1,
        codeSmsUrl: '',
        codeSmsUserId: '',
        codeSmsAccount: '',
        codeSmsPassword: '',
        // siteCountLimit: "",
        statisticalCode: '',

        notifySmsUrl: '',
        notifySmsUserId: '',
        notifySmsAccount: '',
        notifySmsPassword: ''
      },
      rules: {
        siteName: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        siteTitle: [
          { required: true, validator: validateTit, trigger: 'blur' }
        ],
        siteKeyword: [
          { required: true, validator: validateKey, trigger: 'blur' }
        ],
        siteDesc: [
          { required: true, validator: validateDesc, trigger: 'blur' }
        ],
        closedTips: [{ validator: validateTips, trigger: 'blur' }],
        recordInfo: [
          { required: true, validator: validateRecord, trigger: 'blur' }
        ],
        statisticalCode: [
          { required: true, validator: validateCode, trigger: 'blur' }
        ],
        minLoan: [{ required: true, validator: validateMin, trigger: 'blur' }],
        maxLoan: [{ required: true, validator: validateMax, trigger: 'blur' }],
        defaultLoan: [
          { required: true, validator: validateDefault, trigger: 'blur' }
        ],
        allowLoanMonths: [
          { required: true, validator: validateAllow, trigger: 'change' }
        ],
        defaultLoanMonth: [
          { required: true, validator: validateDefaultM, trigger: 'change' }
        ],
        serviceChargeRate: [
          { required: true, validator: validateService, trigger: 'blur' }
        ],
        auditExpense: [
          { required: true, validator: validateAudit, trigger: 'blur' }
        ],
        repaymentDate: [
          { required: true, validator: validateRepay, trigger: 'change' }
        ],

        codeSmsUrl: [
          { required: true, validator: validateSmsUrl, trigger: 'blur' }
        ],
        codeSmsUserId: [
          { required: true, validator: validateSmsId, trigger: 'blur' }
        ],
        codeSmsAccount: [
          { required: true, validator: validateAccount, trigger: 'blur' }
        ],
        codeSmsPassword: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        // siteCountLimit: [
        //   { required: true, validator: validateLimit, trigger: "blur" }
        // ],

        notifySmsUrl: [
          { required: true, validator: validateNotifySmsUrl, trigger: 'blur' }
        ],
        notifySmsUserId: [
          { required: true, validator: validateNotifyUserId, trigger: 'blur' }
        ],
        notifySmsAccount: [
          { required: true, validator: validateNotifyAccount, trigger: 'blur' }
        ],
        notifySmsPassword: [
          { required: true, validator: validateNotifyPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['type'])
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$api.common.sysView().then(res => {
        if (res.code === 200) {
          this.form = { ...res.data }
          this.form.closeStatus = res.data && res.data.closeStatus ? 1 : 0
          this.form.allowLoanMonths = this.form.allowLoanMonths
            ? this.form.allowLoanMonths.split(',').map(val => +val)
            : ''
        }
      })
    },
    getWebsiteConfig() {
      this.$api.common.websiteConfig().then(res => {
        if (res.code === 200) {
          this.form = { ...res.data }
          // this.form.openCodeStatus =
          //   res.data && res.data.openCodeStatus ? 1 : 0;
        }
      })
    },
    handleTab(obj) {
      this.$refs.form.clearValidate()
      if (obj.name === '3') {
        this.getWebsiteConfig()
      } else {
        this.getData()
      }
    },
    updateInfo() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          let params = {}
          if (this.activeName === '3') {
            params = {
              // openCodeStatus: 1,
              codeSmsUrl: '',
              codeSmsUserId: '',
              codeSmsAccount: '',
              codeSmsPassword: '',
              // siteCountLimit: "",
              notifySmsUrl: '',
              notifySmsUserId: '',
              notifySmsAccount: '',
              notifySmsPassword: ''
            }
            for (const key in params) {
              params[key] = this.form[key]
            }
            this.$api.common
              .updateWebsiteConfig(params)
              .then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                  this.getWebsiteConfig()
                }
              })
              .finally(() => {
                this.loading = false
              })
          } else {
            params = {
              siteTitle: '',
              siteName: '',
              siteKeyword: '',
              siteDesc: '',
              closeStatus: 0,
              closedTips: '',
              recordInfo: '',
              bottomContent: '',
              minLoan: '',
              maxLoan: '',
              defaultLoan: '',
              allowLoanMonths: '',
              defaultLoanMonth: '',
              serviceChargeRate: '',
              auditExpense: '',
              repaymentDate: '',
              statisticalCode: ''
            }
            for (const key in params) {
              params[key] = this.form[key]
            }
            params.allowLoanMonths = params.allowLoanMonths
              ? params.allowLoanMonths.join(',')
              : ''
            this.$api.common
              .sysUpdate(params)
              .then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                  this.getData()
                }
              })
              .finally(() => {
                this.loading = false
              })
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.system-content {
  .el-tab-pane {
    width: 90%;
    /deep/ .el-select {
      width: 40%;
    }
  }
  /deep/ .el-input {
    width: 60%;
  }
}
</style>
