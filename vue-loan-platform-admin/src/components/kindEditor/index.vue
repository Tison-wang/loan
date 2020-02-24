<template>
  <div class="kind-editor">
    <editor
      id="editor_id"
      height="450px"
      width="100%"
      :content="content"
      pluginsPath="/kindeditor/plugins/"
      :resizeType="0"
      :loadStyleMode="false"
      :allowImageUpload="false"
      :allowFlashUpload="false"
      :allowMediaUpload="false"
      :allowFileUpload="false"
      :allowFileManager="false"
      @on-content-change="onContentChange"
    ></editor>
  </div>
</template>
<script>
export default {
  name: 'kindEditor',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    onContentChange(val) {
      this.content = val
    }
  }
}
</script>
<style lang="less">
.kind-editor {
}
</style>
