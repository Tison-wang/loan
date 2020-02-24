<template>
  <div>
    <el-dropdown class="userDd" trigger="click">
      <div class="userDrop">
        <span class="userDrop_text">
          {{ userName }}
          <i class="el-icon-caret-bottom"></i>
        </span>
      </div>
      <el-dropdown-menu solt="dropdown">
        <el-dropdown-item>
          <a class="block" @click="updataPwd()">
            <i class="el-icon-lock"></i>修改密码
          </a>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <a class="block" @click="_loginOut()">
            <i class="el-icon-switch-button"></i>登出
          </a>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <ComDialog
      :dialogVisible="dialogVisible"
      comTitle="修改密码"
      @updateData="updateData"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="密码">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
      </el-form>
    </ComDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userId', 'userName'])
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    updataPwd() {
      this.dialogVisible = true
      this.form.userName = this.userName
    },
    updateData() {
      this.$api.admin.updatePwd(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
      this.close()
    },
    close() {
      this.dialogVisible = false
    },
    _loginOut() {
      this.$store.dispatch('user/loginOut')
    }
  }
}
</script>
