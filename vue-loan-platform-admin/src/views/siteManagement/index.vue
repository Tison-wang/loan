<template>
  <div class="site-management">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="params.searchKey"
          placeholder="业务员/站点名称/域名"
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
        <el-table-column label="编号" width="100">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="admin" label="业务员"></el-table-column>
        <el-table-column prop="siteName" label="站点名称"></el-table-column>
        <el-table-column prop="domain" label="域名"></el-table-column>
        <el-table-column prop="smsSign" label="短信签名"></el-table-column>
        <el-table-column
          prop="costSmsCount"
          label="已使用短信条数"
        ></el-table-column>
        <el-table-column
          prop="totalSmsCount"
          label="总短信条数"
        ></el-table-column>
        <el-table-column
          prop="indexTemplate"
          label="首页模板"
        ></el-table-column>
        <el-table-column prop="siteClosedStatus" label="是否关闭站点">
          <template slot-scope="scope">
            {{ scope.row.siteClosedStatus ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row.systemConfigId)"
              >编辑</el-button
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
      comWidth="670px"
      :dialogVisible="dialogVisible"
      comTitle="修改信息"
      :setClass="true"
      @updateData="updateData"
      @close="close"
    >
      <el-form
        ref="form"
        class="site-dialog"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="业务员" prop="admin">
          <el-input v-model="form.admin" disabled></el-input>
        </el-form-item>
        <el-form-item label="站点名称" prop="siteName">
          <el-input
            v-model="form.siteName"
            placeholder="请输入站点名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="域名" prop="domain">
          <el-input v-model="form.domain" placeholder="请输入域名"></el-input>
        </el-form-item>
        <el-form-item label="短信签名" prop="smsSign">
          <el-input
            v-model="form.smsSign"
            placeholder="请输入短信签名"
          ></el-input>
        </el-form-item>
        <el-form-item label="已使用短信条数" prop="costSmsCount">
          <el-input
            disabled
            v-model="form.costSmsCount"
            placeholder="请输入已使用短信条数"
          ></el-input>
        </el-form-item>
        <el-form-item label="总短信条数" prop="totalSmsCount">
          <el-input
            @input="changePrice(form.totalSmsCount, 'totalSmsCount')"
            v-model="form.totalSmsCount"
            placeholder="请输入总短信条数"
          ></el-input>
        </el-form-item>
        <el-form-item label="首页模板" class="temp">
          <el-radio-group v-model="form.indexTemplate">
            <el-radio label="template_1">
              <img src="../../assets/images/1.jpg" />
              <div class="top10">template_1</div>
            </el-radio>
            <el-radio label="template_2">
              <img src="../../assets/images/2.jpg" />
              <div class="top10">template_2</div>
            </el-radio>
            <el-radio label="template_3">
              <img src="../../assets/images/3.jpg" />
              <div class="top10">template_3</div>
            </el-radio>
            <el-radio label="template_4">
              <img src="../../assets/images/4.jpg" />
              <div class="top10">template_4</div>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否关闭站点">
          <el-radio-group v-model="form.siteClosedStatus">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </ComDialog>
  </div>
</template>
<script>
export default {
  name: 'siteManagement',
  data() {
    const validateCount = (rule, value, callback) => {
      if (!value || value === '0') {
        callback(new Error('请输入短信总条数'))
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
        searchKey: ''
      },
      form: {
        admin: '',
        siteName: '',
        domain: '',
        smsSign: '',
        costSmsCount: '',
        totalSmsCount: '',
        indexTemplate: 'template_1',
        siteClosedStatus: false
      },
      rules: {
        userName: [
          { required: true, message: '请输入站点名称', trigger: 'blur' }
        ],
        domain: [{ required: true, message: '请输入域名', trigger: 'blur' }],
        smsSign: [
          { required: true, message: '请输入短信签名', trigger: 'blur' }
        ],
        totalSmsCount: [
          {
            required: true,
            validator: validateCount,
            trigger: 'blur'
          }
        ]
      },
      dialogVisible: false,
      tableData: [],
      id: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    changePrice(val, type) {
      if (isNaN(val) || !val) {
        this.$nextTick(() => {
          this.form[type] = ''
        })
      }
    },
    getData() {
      this.loading = true
      this.$api.common
        .siteList(this.params)
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
    onSubmit() {
      this.getData()
    },
    updateData() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$refs.comDialog.buttonLoading = true
          this.$confirm('确定要修改该资料信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.common
              .siteUpdate(this.form, this.id)
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
          })
        }
      })
    },
    handleEdit(id) {
      this.id = id
      this.dialogVisible = true
      this.$api.common.siteDetail(id).then(res => {
        if (res.code === 200) {
          this.form = { ...res.data }
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
<style lang="less">
.site-dialog {
  width: 95%;
  .temp {
    .el-radio {
      width: 85px;
      img {
        height: 100px;
      }
    }
    .top10 {
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
