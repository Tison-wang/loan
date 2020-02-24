<template>
  <el-dialog
    v-if="dialogVisible"
    :custom-class="setClass ? 'autoHeight com-dialog' : 'com-dialog'"
    :title="comTitle"
    :visible="dialogVisible"
    :width="comWidth"
    append-to-body
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button @click="updateDialog" :loading="buttonLoading" type="primary"
        >确定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'comDialog',
  props: {
    comTitle: {
      type: String,
      default: '提示'
    },
    comWidth: {
      type: String,
      default: '460px'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    setClass: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buttonLoading: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close', false)
    },
    updateDialog() {
      // this.buttonLoading = true;
      this.$emit('updateData')
    }
  }
}
</script>
<style lang="less">
.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.el-dialog.com-dialog {
  margin: 0 !important;
  .el-dialog__header {
    border-bottom: 1px solid #dcdfe6;
  }
  .el-form-item:last-child {
    margin-bottom: 0;
  }
  &.autoHeight .el-dialog__body {
    height: calc(100vh - 240px);
    overflow-y: auto;
  }
  .el-dialog__footer {
    padding: 15px 20px;
    text-align: center;
    border-top: 1px solid #dcdfe6;
  }
}
</style>
