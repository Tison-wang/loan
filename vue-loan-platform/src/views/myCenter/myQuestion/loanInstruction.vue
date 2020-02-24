<template>
  <div class="loan-instruction">
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="申请人需要具备什么条件？" name="1">
        答：1.年龄满十八岁，具有稳定收入来源。2.手机实名制，入网满半年以上。
        感谢您对乐分期的关注。
      </van-collapse-item>
      <van-collapse-item title="申请人需要具备什么条件？" name="2">
        答：1.年龄满十八岁，具有稳定收入来源。2.手机实名制，入网满半年以上。
        感谢您对乐分期的关注。
      </van-collapse-item>
      <van-collapse-item title="申请人需要具备什么条件？" name="3">
        答：1.年龄满十八岁，具有稳定收入来源。2.手机实名制，入网满半年以上。
        感谢您对乐分期的关注。
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
export default {
  name: 'loanInstruction',
  data() {
    return {
      activeNames: ['1']
    }
  }
}
</script>
<style lang="less">
.loan-instruction {
}
</style>
