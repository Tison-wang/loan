<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="''"
      :http-request="upload"
      :show-file-list="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'uploadImg',
  computed: {
    path() {
      return process.env.VUE_APP_BASE_API
    }
  },
  data() {
    return {
      imageUrl: '',
      file: ''
    }
  },
  methods: {
    upload(e) {
      this.file = new FormData()
      this.file.append('file', e.file)
      this.$api.common.uploadFile(this.file).then(res => {
        if (res.code === 200) {
          this.imageUrl = `${process.env.VUE_APP_BASE_API}/common/download/${res.data}`
        }
      })
    }
  }
}
</script>
<style lang="less">
.avatar-uploader {
  text-align: center;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .el-upload {
    text-align: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: auto;
    height: 178px;
    display: block;
  }
}
</style>
