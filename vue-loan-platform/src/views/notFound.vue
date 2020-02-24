<template>
  <section class="no-found">
    <div>
      <img src="../assets/images/fail_1b698b6.png" class="fail-icon" />
      <div class="msg">
        <h1>不小心就把页面丢了！</h1>
        <p>您要查看的页面不存在或已删除</p>
      </div>
      <div class="operates">
        <a href="javascript:history.go(-1);">
          <img src="../assets/images/back_dc0965f.png" /> 返回
        </a>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'notFound'
}
</script>
<style lang="less">
.no-found {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  text-align: center;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
  }
  img.fail-icon {
    margin-bottom: 15px;
  }
  .msg {
    h1 {
      font-size: 18px;
      font-weight: 500;
      line-height: 40px;
    }
    p {
      font-size: 14px;
    }
  }
  .operates {
    margin-top: 20px;
    font-size: 14px;
    img {
      display: block;
      height: 40px;
      margin-bottom: 5px;
    }
  }
}
</style>
