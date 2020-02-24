<template>
  <div>
    <el-table :data="tableData" ref="searchTable" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="120"></el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        min-width="150"
      ></el-table-column>
      <el-table-column min-width="120" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.id)" type="text"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <ComDialog
      ref="comDialog"
      comWidth="790px"
      :setClass="true"
      :dialogVisible="dialogVisible"
      :comTitle="comTitle"
      @updateData="updateData"
      @close="close"
    >
      <kindEditor ref="getConent"></kindEditor>
    </ComDialog>
  </div>
</template>
<script>
import kindEditor from '@/components/kindEditor'
export default {
  name: 'contractManagement',
  components: {
    kindEditor
  },
  data() {
    return {
      dialogVisible: false,
      id: '',
      comTitle: '编辑',
      tableData: [
        {
          id: 1,
          name: '合同管理'
        },
        {
          id: 2,
          name: '支付页面'
        }
      ]
    }
  },
  methods: {
    getList(id) {
      this.$api.common.contractList(id).then(res => {
        if (res.code === 200) {
          this.$refs.getConent.content = res.data ? res.data.content : ''
        }
      })
    },
    updateData() {
      if (!this.$refs.getConent.content) {
        this.$message({
          type: 'warning',
          message: '请输入内容'
        })
        return false
      }
      this.$api.common
        .updateContract({
          type: this.id,
          content: this.$refs.getConent.content
        })
        .then(res => {
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
      this.$refs.comDialog.buttonLoading = false
      this.dialogVisible = false
    },
    handleEdit(id) {
      this.id = id
      this.getList(id)
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped lang="less"></style>
