<template>
  <el-form :model="form" ref="form" :rules="rules">
    <el-form-item prop="amount">
      <el-input
        v-model.number="form.amount"
        maxlength="10"
        :placeholder="comTitle"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'editAmount',
  props: {
    comTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    const validateAmount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.comTitle))
      } else if (!/^[0-9]+$/.test(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      form: {
        amount: ''
      },
      rules: {
        amount: [{ required: true, validator: validateAmount, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('validate', this.$refs.form.validate)
    })
  }
}
</script>
<style lang="less"></style>
