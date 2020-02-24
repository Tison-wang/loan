<template>
  <div class="manager">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="params.searchName"
          placeholder="用户名或姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
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
        <el-table-column label="ID" width="80">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="ownerId"
          label="推荐人ID"
          width="100"
        ></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column
          prop="detail.bankCardNumber"
          label="银行卡"
        ></el-table-column>
        <el-table-column prop="detail.name" label="姓名"></el-table-column>
        <el-table-column prop="state" width="100" label="状态">
          <template slot-scope="scope">
            {{ scope.row.state === 1 ? '允许登录' : '禁止登录' }}
          </template>
        </el-table-column>
        <el-table-column label="注册日期" width="160">
          <template slot-scope="scope">{{
            formatDate(scope.row.createTime)
          }}</template>
        </el-table-column>
        <el-table-column prop="address" label="用户信息" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLook(scope.row.id)"
              >查看资料</el-button
            >
          </template>
        </el-table-column>

        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleIsLogin(scope.row)">
              {{ scope.row.state === 1 ? '禁止登录' : '允许登录' }}
            </el-button>
            <el-button @click="handleEditPwd(scope.row.id)" type="text"
              >修改密码</el-button
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
    <!-- <update-info
      :dialogVisible="dialogVisible"
      @close="close"
      @updateData="updateData"
    ></update-info>-->

    <ComDialog
      ref="comDialog"
      :comWidth="comWidth"
      :setClass="isSetClass"
      :dialogVisible="dialogVisible"
      :comTitle="comTitle"
      @updateData="updateData"
      @close="dialogVisible = false"
    >
      <component
        :is="componentName"
        ref="inputData"
        @validate="validate"
      ></component>
    </ComDialog>
  </div>
</template>
<script>
import LookInfo from '@/components/LookInfo'
import EditPwd from './editPwd'
export default {
  name: 'manager',
  components: {
    LookInfo,
    EditPwd
  },
  data() {
    return {
      loading: false,
      isSetClass: false,
      comTitle: '输入新密码，并确定',
      total: 0,
      comWidth: '460px',
      params: {
        pageSize: 20,
        pageNum: 1,
        searchName: ''
      },
      dialogVisible: false,
      tableData: [],
      componentName: 'EditPwd',
      id: '',
      isDetail: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    validate(val) {
      this.$refs.inputData.form.validate = val
    },
    getData() {
      this.loading = true
      this.$api.common
        .userList(this.params)
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.total
            this.tableData = res.data.list || []
            this.$refs.searchTable.bodyWrapper.scrollTop = 0
            this.loading = true
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSubmit() {
      this.getData()
    },
    updataState(state, id) {
      this.$api.common.userDel({ state: state }, id).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: state === -1 ? '删除成功' : '修改成功'
          })
          this.getData()
        }
      })
    },
    handleDel(id) {
      this.$confirm('确定要删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updataState(-1, id)
      })
    },
    handleIsLogin(row) {
      const state = row.state === 1 ? 0 : 1
      this.updataState(state, row.id)
    },
    handleEditPwd(id) {
      this.isDetail = false
      this.id = id
      this.comTitle = '输入新密码，并确定'
      this.componentName = 'EditPwd'
      this.comWidth = '460px'
      this.isSetClass = false
      this.dialogVisible = true
    },
    updateData() {
      this.$refs.inputData.form.validate(valid => {
        if (valid) {
          if (this.isDetail) {
            this.$confirm('确定要修改该资料信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$refs.comDialog.buttonLoading = true
              this.$api.common
                .userUpdate(this.$refs.inputData.form, this.id)
                .then(res => {
                  if (res.code === 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                  }
                })
                .finally(() => {
                  this.$refs.comDialog.buttonLoading = false
                  this.dialogVisible = false
                })
            })
          } else {
            this.$refs.comDialog.buttonLoading = true
            this.$api.common
              .userEditPwd(this.$refs.inputData.form, this.id)
              .then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                }
              })
              .finally(() => {
                this.$refs.comDialog.buttonLoading = false
                this.dialogVisible = false
              })
          }
        }
      })
    },
    handleLook(id) {
      this.id = id
      this.isDetail = true
      this.comWidth = '790px'
      this.isSetClass = true
      this.comTitle = '基本资料'
      this.componentName = 'LookInfo'
      this.$api.common.userView(id).then(res => {
        if (res.code === 200) {
          this.dialogVisible = true
          if (res.data && res.data.detail) {
            this.$nextTick(() => {
              this.$refs.inputData.form = {
                userName: res.data.userName,
                bankCardNumber: res.data.detail.bankCardNumber,
                bankName: res.data.detail.bankName,
                currentAddress: res.data.detail.currentAddress,
                idCardFrontImage: res.data.detail.idCardFrontImage,
                idCardHoldImage: res.data.detail.idCardHoldImage,
                idCardNumber: res.data.detail.idCardNumber,
                idCardReverseImage: res.data.detail.idCardReverseImage,
                linkName1: res.data.detail.linkName1,
                linkName2: res.data.detail.linkName2,
                mobile1: res.data.detail.mobile1,
                mobile2: res.data.detail.mobile2,
                monthlyIncome: res.data.detail.monthlyIncome,
                name: res.data.detail.name,
                relation1: res.data.detail.relation1,
                relation2: res.data.detail.relation2
              }
            })
          }
        }
      })
    },
    close() {
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
<style scoped lang="less"></style>
