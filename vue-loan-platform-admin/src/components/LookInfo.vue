<template>
  <div class="pad-overflow-scroll">
    <el-form
      ref="form"
      class="update-info"
      :rules="rules"
      :model="form"
      label-width="130px"
    >
      <el-form-item label="手机号/用户名">
        <el-input
          class="w300"
          placeholder="请输入手机号/用户名"
          disabled
          v-model="form.userName"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          class="w300"
          placeholder="请输入姓名"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="月收入" prop="monthlyIncome">
        <el-input
          class="w300"
          placeholder="请输入月收入"
          v-model="form.monthlyIncome"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCardNumber">
        <el-input
          class="w300"
          placeholder="请输入身份证号"
          v-model="form.idCardNumber"
        ></el-input>
      </el-form-item>

      <el-form-item label="身份证拍照" class="mb0">
        <el-form-item label="身份证正面">
          <a
            class="el-link el-link--primary"
            target="_blank"
            v-if="form.idCardFrontImage"
            :href="`${url}/common/download/${form.idCardFrontImage}`"
            >点击查看</a
          >
          <a class="el-link el-link--primary" v-else href="javascript:;"
            >点击查看</a
          >
        </el-form-item>
        <el-form-item label="身份证反面">
          <a
            class="el-link el-link--primary"
            target="_blank"
            v-if="form.idCardReverseImage"
            :href="`${url}/common/download/${form.idCardReverseImage}`"
            >点击查看</a
          >
          <a class="el-link el-link--primary" v-else href="javascript:;"
            >点击查看</a
          >
        </el-form-item>
        <el-form-item label="手持身份证">
          <a
            class="el-link el-link--primary"
            target="_blank"
            v-if="form.idCardHoldImage"
            :href="`${url}/common/download/${form.idCardHoldImage}`"
            >点击查看</a
          >
          <a class="el-link el-link--primary" v-else href="javascript:;"
            >点击查看</a
          >
        </el-form-item>
      </el-form-item>
      <el-form-item label="现居住地" prop="currentAddress">
        <el-input
          class="w300"
          placeholder="请输入现居住地"
          v-model="form.currentAddress"
        ></el-input>
      </el-form-item>
      <el-form-item label="单位信息" class="mb20">
        <el-form-item label="联系人1：">
          <el-form-item class="w100" prop="relation1">
            <el-select placeholder="关系" v-model="form.relation1">
              <el-option
                v-for="(item, index) in relationList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="w200" prop="linkName1">
            <el-input v-model="form.linkName1" placeholder="联系人"></el-input>
          </el-form-item>
          <el-form-item class="w150" prop="mobile1">
            <el-input v-model="form.mobile1" placeholder="联系方式"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="联系人2：">
          <el-form-item class="w100" prop="relation2">
            <el-select placeholder="关系" v-model="form.relation2">
              <el-option
                v-for="(item, index) in relationList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="w200" prop="linkName2">
            <el-input v-model="form.linkName2" placeholder="联系人"></el-input>
          </el-form-item>
          <el-form-item class="w150" prop="mobile2">
            <el-input v-model="form.mobile2" placeholder="联系方式"></el-input>
          </el-form-item>
        </el-form-item>
      </el-form-item>
      <el-form-item label="银行卡信息">
        <!-- <el-form-item label="贷款用途：">
        <el-input class="w310" disabled v-model="form.pwd"></el-input>
      </el-form-item>-->
        <el-form-item label="银行名称：" prop="bankName">
          <el-select
            class="w310"
            placeholder="请选择银行名称"
            v-model="form.bankName"
          >
            <el-option
              v-for="(item, index) in columns"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行卡号：" prop="bankCardNumber">
          <el-input
            class="w310"
            placeholder="请输入银行卡号"
            v-model="form.bankCardNumber"
          ></el-input>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'lookInfo',
  data() {
    const validateIncome = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入月收入'))
      } else if (!/^[0-9]+$/.test(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    const validateId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号'))
      } else if (!this.idcardReg.test(value)) {
        callback(new Error('请输入正确的身份证'))
      } else {
        callback()
      }
    }
    const validateM = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系方式'))
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validateBank = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入银行卡号'))
      } else if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(value)) {
        callback(new Error('请输入正确的银行卡号'))
      } else {
        callback()
      }
    }
    return {
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
      ],
      relationList: ['父母', '同事', '兄妹', '朋友'],
      idcardReg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
      form: {
        userName: '',
        bankCardNumber: '',
        bankName: '',
        currentAddress: '',
        idCardFrontImage: '',
        idCardHoldImage: '',
        idCardNumber: '',
        idCardReverseImage: '',
        linkName1: '',
        linkName2: '',
        mobile1: '',
        mobile2: '',
        monthlyIncome: '',
        name: '',
        relation1: '',
        relation2: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        monthlyIncome: [
          { required: true, validator: validateIncome, trigger: 'blur' }
        ],
        idCardNumber: [
          { required: true, validator: validateId, trigger: 'blur' }
        ],
        currentAddress: [
          { required: true, message: '请输入现居住地', trigger: 'blur' }
        ],
        relation1: [
          { required: true, message: '请选择关系', trigger: 'change' }
        ],
        linkName1: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        mobile1: [{ required: true, validator: validateM, trigger: 'blur' }],
        relation2: [
          { required: true, message: '请选择关系', trigger: 'change' }
        ],
        linkName2: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        mobile2: [{ required: true, validator: validateM, trigger: 'blur' }],
        bankCardNumber: [
          { required: true, validator: validateBank, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    url() {
      return process.env.VUE_APP_BASE_API
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.validate = this.$refs.form.validate
      this.$emit('validate', this.validate)
    })
  }
}
</script>
<style scoped lang="less">
.update-info {
  .w100 {
    display: inline-block;
    width: 100px;
  }
  .w150 {
    width: 150px;
    margin-left: 10px;
    display: inline-block;
  }
  .w200 {
    width: 200px;
    margin-left: 10px;
    // margin-bottom: 20px;
    display: inline-block;
  }
  .w300 {
    width: 300px;
  }
  .w310 {
    width: 310px;
    // margin-bottom: 10px;
  }
  /deep/ .el-form-item .el-form-item {
    margin-bottom: 20px;
    .el-form-item__label {
      width: 100px !important;
    }
    .el-form-item__content {
      margin-left: 100px !important;
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
  .mb0 {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .mb20 {
    .el-form-item {
      margin-bottom: 12px;
    }
  }
}
</style>
