<template>
  <div>
    <el-form-item label="贷款最小金额" prop="minLoan">
      <el-input
        maxlength="10"
        @input="changePrice(form.minLoan, 'minLoan')"
        v-model="form.minLoan"
      >
        <span slot="suffix">元</span>
      </el-input>
    </el-form-item>
    <el-form-item label="贷款最大金额" prop="maxLoan">
      <el-input
        maxlength="10"
        @input="changePrice(form.minLoan, 'maxLoan')"
        v-model="form.maxLoan"
      >
        <span slot="suffix">元</span>
      </el-input>
    </el-form-item>
    <el-form-item label="初始显示金额" prop="defaultLoan">
      <el-input
        maxlength="10"
        @input="changePrice(form.minLoan, 'defaultLoan')"
        v-model="form.defaultLoan"
      >
        <span slot="suffix">元</span>
      </el-input>
    </el-form-item>
    <el-form-item label="允许选择月份" prop="allowLoanMonths">
      <el-select v-model="form.allowLoanMonths" multiple>
        <el-option
          v-for="(item, index) in [3, 6, 12, 24, 36]"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="初始选择月份" prop="defaultLoanMonth">
      <el-select v-model="form.defaultLoanMonth">
        <el-option
          v-for="(item, index) in [3, 6, 12, 24, 36]"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="服务费率" prop="serviceChargeRate">
      <el-input
        v-model="form.serviceChargeRate"
        @input="changePrice(form.serviceChargeRate, 'serviceChargeRate')"
      ></el-input>
    </el-form-item>
    <el-form-item label="每月还款日" prop="repaymentDate">
      <el-select v-model="form.repaymentDate">
        <el-option
          v-for="(item, index) in 30"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="是否自动拒绝">
      <el-radio-group v-model="form.resource">
        <el-radio label="否"></el-radio>
        <el-radio label="是"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="自动拒绝天数">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="拒绝提交等待天数">
      <el-input v-model="form.title"></el-input>
    </el-form-item>-->
  </div>
</template>
<script>
export default {
  name: 'loanSetting',
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
