<template>
  <div class="my-question">
    <div class="time-tips">电话咨询：9:00 - 18:00，QQ咨询：9:00 - 18:00</div>
    <van-collapse v-model="activeName" accordion @change="handleChange">
      <van-collapse-item
        v-for="(item, index) in list"
        :key="index"
        :name="index"
        :title="item.name"
      >
        <span v-html="item.content"></span>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
export default {
  name: 'myQuestion',
  data() {
    return {
      list: [],
      activeName: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleChange(val) {
      this.activeName = val
    },
    getList() {
      this.$api.common.faqList().then(res => {
        if (res.code === 200) {
          this.list = res.data.list || []
        }
      })
    }
  }
}
</script>
<style lang="less">
.my-question {
  .time-tips {
    background: #fff1d8;
    color: #fb6f00;
    font-size: 14px;
    padding: 10px 0;
    text-align: center;
  }
  .question-item {
    display: flex;
    .item-left {
      text-align: center;
      flex-basis: 95px;
      background: #fff;
      border-right: 1px solid #ebedf0;
      border-bottom: 1px solid #ebedf0;
      .van-icon {
        font-size: 32px;
        margin-top: 25px;
      }
      p {
        font-size: 14px;
        line-height: 30px;
      }
      span {
        font-size: 12px;
        color: #999;
      }
      .van-icon-comment-circle {
        color: #3397f5;
      }
      .van-icon-info {
        color: #f13224;
      }
      .van-icon-question {
        color: #f3df29;
      }
    }
    .van-cell-group {
      flex: 1;
      .van-cell {
        padding-right: 0;
      }
    }
    &:last-child {
      .item-left {
        border-bottom: 0;
      }
    }
  }
}
</style>
