<template>
  <div>
    <el-form-item label="站点名称" prop="siteName">
      <el-input v-model="form.siteName"></el-input>
    </el-form-item>
    <el-form-item label="站点标题" prop="siteTitle">
      <el-input v-model="form.siteTitle"></el-input>
    </el-form-item>
    <el-form-item label="站点关键字" prop="siteKeyword">
      <el-input v-model="form.siteKeyword"></el-input>
    </el-form-item>
    <el-form-item label="站点描述" prop="siteDesc">
      <el-input v-model="form.siteDesc"></el-input>
    </el-form-item>
    <el-form-item label="是否关闭网站">
      <el-radio-group v-model="form.closeStatus">
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="网站关闭提示" prop="closedTips">
      <el-input
        type="textarea"
        resize="none"
        :autosize="{ minRows: 4, maxRows: 4 }"
        v-model="form.closedTips"
      ></el-input>
    </el-form-item>
    <el-form-item label="ICP备案证书号" prop="recordInfo">
      <el-input v-model="form.recordInfo"></el-input>
    </el-form-item>
    <el-form-item label="首页底部内容" prop="bottomContent">
      <el-input v-model="form.bottomContent"></el-input>
    </el-form-item>
    <el-form-item label="统计/客服代码调用" prop="statisticalCode">
      <el-input
        type="textarea"
        resize="none"
        :autosize="{ minRows: 4, maxRows: 4 }"
        v-model="form.statisticalCode"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'basic',
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
