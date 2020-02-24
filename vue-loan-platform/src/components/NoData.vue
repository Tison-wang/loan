<template>
  <div class="no-data">
    <img src="../assets/images/p_01.png" />
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'noData'
}
</script>
<style scoped lang="less">
.no-data {
  text-align: center;
  font-size: 17px;
  img {
    max-width: 35%;
    margin: 60px 0 30px;
  }
  p {
    line-height: 30px;
    color: #666;
  }
}
</style>
