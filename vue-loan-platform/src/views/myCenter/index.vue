<template>
  <div class="my-center">
    <div class="my-img">
      <img src="../../assets/images/photo.png" />
      <p>{{ name }}</p>
    </div>
    <van-cell-group class="center-list">
      <van-cell title="我的资料" is-link to="my-info">
        <van-icon slot="icon" class-prefix="loan" name="info" />
      </van-cell>
      <van-cell title="我的借款" is-link to="my-loan">
        <van-icon slot="icon" class-prefix="loan" name="my-loan" />
      </van-cell>
      <van-cell title="我的还款" is-link to="my-repay">
        <van-icon slot="icon" class-prefix="loan" name="repayment" />
      </van-cell>
    </van-cell-group>
    <van-cell-group class="center-list">
      <van-cell title="常见问题" icon="question-o" is-link to="my-question">
      </van-cell>
      <van-cell title="修改密码" is-link to="edit-pwd">
        <van-icon slot="icon" class-prefix="loan" name="edit-pwd" />
      </van-cell>
      <van-cell title="退出登录" is-link @click="_loginOut">
        <van-icon slot="icon" class-prefix="loan" name="logout" />
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'myCenter',
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    _loginOut() {
      this.$dialog
        .confirm({
          message: '确定要退出当前账号？'
        })
        .then(() => {
          this.$store.dispatch('user/_loginOut')
        })
    }
  }
}
</script>
<style scoped lang="less">
.my-center {
  .loan {
    margin-right: 10px;
  }
  .my-img {
    background: #1989fa;
    text-align: center;
    padding: 30px 0 20px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
    p {
      color: #fff;
      font-size: 16px;
      margin-top: 5px;
    }
  }
  .center-list {
    margin-top: 10px;
  }
}
</style>
