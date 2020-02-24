<template>
  <el-form
    :model="form"
    ref="form"
    label-width="80px"
    class="edit-order"
    :rules="rules"
  >
    <el-form-item label="订单号">{{ order }}</el-form-item>
    <el-form-item label="状态" prop="state">
      <!-- :disabled="saveState >= item.value" -->
      <el-radio-group v-model="form.state" @change="handleChange">
        <el-radio
          v-for="(item, index) in optionList"
          :key="index"
          :label="item.value"
          >{{ item.label }}</el-radio
        >
      </el-radio-group>
      <span style="position: absolute; left: 210px; bottom: 0; color: #ff0000;"
        >【状态修改成功会自动发送提醒短信】</span
      >
    </el-form-item>
    <el-form-item label="状态描述" prop="stateDesc">
      <el-input
        type="textarea"
        resize="none"
        :autosize="{ minRows: 6, maxRows: 6 }"
        v-model="form.stateDesc"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'editOrder',
  data() {
    return {
      optionList: [
        {
          label: '正在审核',
          value: 1,
          info:
            '尊敬的客户，你的申请自动评估中，请留意短信结果通知！需要了解更多请联系客服。'
        },
        {
          label: '审核不通过',
          value: 2,
          info: '很抱歉，由于您未能通过系统评估，感谢您的支持！'
        },
        {
          label: '审核通过',
          value: 3,
          info: '尊敬的客户，您的申请已被批准，感谢您的支持！'
        },
        {
          label: '授权码失效',
          value: 4,
          info: '编码01，您本次的验证码已失效。'
        },
        {
          label: '收取保险费',
          value: 5,
          info:
            '尊敬的客户，您的会员费未支付，暂时无法提供到账服务，如您还有疑问，请联系客服。'
        },
        {
          label: '预付前1期费用',
          value: 6,
          info:
            '系统评估结果：由于您未达到系统第一次综合评估，请您在15分钟内登录系统与我们联系。'
        },
        {
          label: '预付前2期费用',
          value: 7,
          info:
            '系统评估结果：由于您未达到系统第二次综合评估，请您在15分钟内登录系统与我们联系。'
        },
        {
          label: '预付前3期费用',
          value: 8,
          info:
            '系统评估结果：由于您未达到系统第三次综合评估，请您在15分钟内登录系统与我们联系。'
        },
        {
          label: '订单取消',
          value: 9,
          info: '尊敬的客户，您的申请已取消，感谢您的支持！'
        },
        {
          label: '申请退款',
          value: 10,
          info: '尊敬的客户，您的退款申请已受理，如您还有疑问，请联系客服。'
        },
        {
          label: '放款成功',
          value: 11,
          info:
            '尊敬的客户，您的申请已完成，请登录系统到个人中心菜单进行操作，如您还有疑问，请联系客服。'
        },
        {
          label: '打款中',
          value: 12,
          info: '尊敬的客户，我们正在处理您的申请，如您还有疑问，请联系客服。'
        },
        {
          label: '信用流水',
          value: 13,
          info:
            '尊敬的客户，为了您的申请顺利通过请根据系统提示进行下一步操作，如您还有疑问，请联系客服。'
        },
        {
          label: '银行卡异常',
          value: 14,
          info:
            '尊敬的客户，您当前银行卡状态异常，可能未激活、挂失、过期、销户，请咨询银行。'
        },
        {
          label: '解冻',
          value: 15,
          info: '尊敬的客户，您的账户解冻成功，感谢您的支持！'
        },

        {
          label: '冻结',
          value: 16,
          info:
            '很抱歉的通知您，您因违反《系统规则》账户被执行保护措施，您可以进入个人中心根据提示进行操作，如您还有疑问，请联系客服。'
        },
        {
          label: '解冻成功。需回档',
          value: 17,
          info:
            '尊敬的客户，系统侦测到您的账户存在风险并采取保护措施，请登录系统处理，如您还有疑问，请联系客服。'
        }
      ],
      order: '',
      form: {
        state: '',
        stateDesc: ''
      },
      saveState: null,
      rules: {
        state: [
          { required: true, message: '请选择订单状态', trigger: 'change' }
        ],
        stateDesc: [
          { required: true, message: '请输入状态描述', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('validate', this.$refs.form.validate)
    })
  },
  methods: {
    handleChange(val) {
      const content = this.optionList.filter(el => {
        return el.value === val
      })
      this.form.stateDesc = content[0].info
    }
  }
}
</script>
<style lang="less">
.edit-order {
  .el-radio {
    margin: 0 10px 10px 0;
  }
}
</style>
