<template>
  <div class="free">
    <el-button class="fr" @click="addManager" type="primary" plain
      >添加问题</el-button
    >
    <div style="height:calc(100vh - 260px)">
      <el-table
        :data="tableData"
        height="100%"
        ref="searchTable"
        border
        style="width: 100%"
      >
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="userId"
          width="120"
          label="所属人ID"
        ></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button @click="handleDel(scope.row.id)" type="text"
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
      <el-form ref="form" :rules="rules" :model="form" label-width="60px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4 }"
            v-model="form.content"
          ></el-input>
        </el-form-item>
      </el-form>
    </ComDialog>
  </div>
</template>
<script>
export default {
  name: 'free',
  data() {
    return {
      loading: false,
      total: 0,
      params: {
        pageSize: 20,
        pageNum: 1
      },
      form: {
        name: '',
        content: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      id: '',
      dialogVisible: false,
      comTitle: '添加问题',
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.$api.common
        .faqList(this.params)
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.total
            this.tableData = res.data.list || []
            this.$refs.searchTable.bodyWrapper.scrollTop = 0
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    editData() {
      if (this.id) {
        this.$api.common.updateFaq(this.form, this.id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getData()
            this.$refs.comDialog.buttonLoading = false
          }
        })
      } else {
        this.$api.common.addFaq(this.form).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.getData()
            this.$refs.comDialog.buttonLoading = false
          }
        })
      }
    },
    handleDel(id) {
      this.$confirm('确定要删除该问题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.common.updateFaq({ state: -1 }, id).then(res => {
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
    onSubmit() {
      this.getData()
    },
    addManager() {
      this.comTitle = '添加问题'
      this.dialogVisible = true
    },
    updateData() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$refs.comDialog.buttonLoading = true
          this.editData()
          this.close()
        }
      })
    },
    handleEdit(form) {
      this.comTitle = '修改问题'
      this.dialogVisible = true
      this.id = form.id
      this.form.name = form.name
      this.form.content = form.content
    },
    close() {
      this.form = {
        name: '',
        content: ''
      }
      this.id = ''
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
.free {
  .fr {
    margin-bottom: 22px;
  }
  .el-button {
    display: inline-block;
  }
}
</style>
