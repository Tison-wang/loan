<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="50px">
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'editPwd',
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value && (value.length < 6 || value.length > 16)) {
        callback(new Error('请输入6-16位密码'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: ''
      },
      rules: {
        password: [{ required: true, validator: validatePass, trigger: 'blur' }]
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
