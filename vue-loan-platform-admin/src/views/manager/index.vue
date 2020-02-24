<template>
  <div class="manager">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="params.searchName"
          placeholder="管理员名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>

      <el-button class="fr" @click="addManager" type="primary" plain
        >添加管理员</el-button
      >
    </el-form>
    <div style="height:calc(100vh - 260px)">
      <el-table
        v-loading="loading"
        :data="tableData"
        height="100%"
        ref="searchTable"
        border
        style="width: 100%"
      >
        <el-table-column label="编号" width="100">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="userName" label="管理员名称"></el-table-column>
        <el-table-column prop="createTime" label="添加时间">
          <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginTime" label="最后登录时间">
          <template slot-scope="scope">
            {{ formatDate(scope.row.lastLoginTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="state" width="120" label="状态">
          <template slot-scope="scope">{{
            scope.row.state === 1 ? '正常' : '禁止'
          }}</template>
        </el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.type !== 2"
              @click="handleDel(scope.row.id)"
              type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="total"
        :limit="params.pageSize"
        :page="params.pageNum"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></pagination>
    </div>
    <ComDialog
      ref="comDialog"
      :dialogVisible="dialogVisible"
      :comTitle="comTitle"
      @updateData="updateData"
      @close="close"
    >
      <el-form
        ref="form"
        class="margin-dialog"
        :rules="rules"
        :model="form"
        label-width="95px"
      >
        <el-form-item label="管理员名称" prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入管理员名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入6-16位密码"
            v-model="form.password"
          ></el-input>
          <el-tooltip
            v-if="id"
            effect="dark"
            content="如不修改请留空"
            placement="left-end"
          >
            <i class="api-tips el-icon-warning"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            placeholder="请输入6-16位密码"
            v-model="form.confirmPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.state">
            <el-radio :label="0">禁止</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </ComDialog>
  </div>
</template>
<script>
export default {
  name: 'manager',
  data() {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入管理员名称'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      total: 0,
      params: {
        pageSize: 20,
        pageNum: 1,
        searchName: ''
      },
      form: {
        userName: '',
        password: '',
        confirmPassword: '',
        state: 1
      },
      rules: {
        userName: [{ required: true, validator: validateName, trigger: 'blur' }]
      },
      dialogVisible: false,
      comTitle: '添加管理员',
      tableData: [],
      id: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.$api.admin
        .adminList(this.params)
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.total
            this.tableData = res.data.list || []
            this.$refs.searchTable.bodyWrapper.scrollTop = 0
            this.loading = false
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSubmit() {
      this.getData()
    },
    handleDel(id) {
      this.$confirm('确定要删除该管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.admin.adminDel(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getData()
          }
        })
      })
    },
    addManager() {
      this.id = ''
      this.comTitle = '添加管理员'
      this.dialogVisible = true
    },
    updateData() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$refs.comDialog.buttonLoading = true
          if (this.id) {
            this.$api.admin
              .adminUpdate(this.form, this.id)
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
                this.$refs.comDialog.buttonLoading = false
                this.close()
              })
          } else {
            this.$api.admin
              .adminAdd(this.form)
              .then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '添加成功'
                  })
                  this.getData()
                }
              })
              .finally(() => {
                this.$refs.comDialog.buttonLoading = false
                this.close()
              })
          }
        }
      })
    },
    handleEdit(obj) {
      this.comTitle = '修改管理员'
      this.form = {
        userName: obj.userName,
        password: obj.password,
        confirmPassword: obj.password,
        state: obj.state
      }
      this.id = obj.id
      this.dialogVisible = true
    },
    close() {
      this.form = {
        userName: '',
        password: '',
        confirmPassword: '',
        state: 1
      }
      this.dialogVisible = false
    },
    // 切换頁码
    currentChange(cpage) {
      this.params.pageNum = cpage
      this.getData()
    },
    // 切换每頁条數
    sizeChange(csize) {
      this.params.pageNum = 1
      this.params.pageSize = csize
      this.getData()
    }
  }
}
</script>
<style scoped lang="less">
.manager {
  .el-button--text {
    display: inline;
  }
}
.margin-dialog {
  .el-input {
    width: 92%;
  }
  .el-tooltip {
    margin-left: 10px;
  }
}
</style>
