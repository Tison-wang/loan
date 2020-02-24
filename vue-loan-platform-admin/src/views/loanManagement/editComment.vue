<template>
  <el-form :model="form" ref="form" :rules="rules">
    <el-form-item prop="comment">
      <el-input
        type="textarea"
        resize="none"
        :placeholder="comTitle"
        :autosize="{ minRows: 4, maxRows: 4 }"
        v-model="form.comment"
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
    return {
      form: {
        comment: ''
      },
      rules: {
        comment: [{ required: true, message: this.comTitle, trigger: 'blur' }]
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
