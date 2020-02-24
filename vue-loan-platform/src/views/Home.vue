<template>
  <div class="home">
    <div class="module1" v-if="type === 'template_1'">
      <div class="title">招联金融</div>
      <div class="mobile">
        <img src="/static/1-1.jpg" />
        <div class="mobile-wrap">
          <van-field
            v-model="mobile"
            type="number"
            class="m-input"
            placeholder="请输入手机号码"
          />
          <van-button round type="info" @click="send"
            >测测你能借多少</van-button
          >
          <div class="login-text">
            已注册用户，请
            <router-link :to="{ name: 'login' }">点击登录</router-link>
          </div>
        </div>
      </div>
      <img src="/static/1-2.jpg" />
      <img src="/static/1-3.jpg" />
      <img src="/static/1-4.jpg" />
      <div class="icp" ref="icp">
        <p>{{ home.bottomContent }}</p>
        <p>{{ home.recordInfo }}</p>
      </div>
    </div>
    <div class="module2" v-if="type === 'template_2'">
      <img src="/static/2-1.jpg" />
      <div class="mobile">
        <img src="/static/2-2.jpg" />
        <div class="mobile-wrap">
          <van-field
            v-model="mobile"
            type="number"
            left-icon="phone-o"
            class="m-input"
            placeholder="请输入手机号码"
          />

          <van-button round type="info" @click="send">立即申请借款</van-button>
          <div class="login-text">
            已注册用户，请
            <router-link :to="{ name: 'login' }">点击登录</router-link>
          </div>
        </div>
      </div>
      <div class="icp" ref="icp">
        <p>{{ home.bottomContent }}</p>
        <p>{{ home.recordInfo }}</p>
        <p>出资银行：招商银行股份有限公司；上海浦东发展银行有限公司等</p>
      </div>
    </div>
    <div class="module3" v-else-if="type === 'template_3'">
      <div class="mobile">
        <img src="/static/3-1.jpg" />
        <van-field
          v-model="mobile"
          type="number"
          class="m-input"
          placeholder="请输入手机号码"
        />
      </div>
      <div class="mobile m2">
        <img src="/static/3-2.jpg" />
        <van-button round @click="send">测测你能借多少</van-button>
        <div class="login-text">
          已注册用户，请
          <router-link :to="{ name: 'login' }">点击登录</router-link>
        </div>
        <div class="icp" ref="icp">
          <p>{{ home.bottomContent }}</p>
          <p>{{ home.recordInfo }}</p>
        </div>
        <div class="footer-tip">
          <p>资金由人人贷平台的出借人提供</p>
          <p style="padding: 0px 20px;">
            贷款有风险，借款需谨慎；请根据个人能力合理贷款，理性消费，避免逾期。
            贷款额度、放款时间以实际审批结果为准。
          </p>
        </div>
      </div>
    </div>
    <div class="module4" v-else-if="type === 'template_4'">
      <img src="/static/4-1.jpg" />
      <div class="m-wrap">
        <img src="/static/4-2.png" />
        <div class="mobile">
          <van-field
            v-model="mobile"
            type="number"
            class="m-input"
            placeholder="请输入手机号码"
          />
          <van-button round type="info" @click="send">查看额度</van-button>
          <div class="login-text">
            已注册用户，请
            <router-link :to="{ name: 'login' }">点击登录</router-link>
          </div>
        </div>
      </div>
      <div class="bottom-img">
        <img src="/static/4-3.jpg" />
        <div class="icp" ref="icp">
          <p>{{ home.bottomContent }}</p>
          <p>{{ home.recordInfo }}</p>
        </div>
        <div class="tips">
          <p>贷款有风险，借款需谨慎</p>
          <p>请根据个人能力合理贷款，理性消费，避免逾期</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {},
  data() {
    return {
      mobile: '',
      type: ''
    }
  },
  computed: {
    ...mapGetters(['home'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$api.common.template().then(res => {
        if (res.code === 200) {
          if (!res.data) {
            this.$router.push({ name: 'applyMoney' })
          }
          this.type = res.data
        }
      })
    },
    send() {
      if (!this.mobile) {
        this.$toast({
          type: 'warning',
          message: '请输入手机号码'
        })
      } else if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.$toast({
          type: 'warning',
          message: '请输入正确的手机号'
        })
      } else {
        this.$router.push({ name: 'register' })
      }
    }
  }
}
</script>
<style scoped lang="less">
.home {
  position: relative;
  background: #fff;
  max-width: 520px;
  text-align: center;
  margin: 0 auto;
  .icp {
    width: 100%;
    font-size: 10px;
    text-align: center;
    padding: 0 10px;
  }
  .login-text {
    color: #fff;
    a {
      color: #1989fa;
      text-decoration: underline;
    }
  }
  img {
    max-width: 100%;
  }
  .m-input {
    width: 85%;
    margin: 0 auto;
    border-radius: 20px;
    padding: 10px 25px;
  }
  .van-button {
    display: block;
    margin: 15px auto 0;
    width: 85%;
    border: 0;
  }
  .user-xy {
    margin: 15px 0 15px 3%;
    span.xy-link {
      color: #1989fa;
    }
  }
  .module1 {
    .title {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
    }
    .mobile {
      position: relative;
    }
    .mobile-wrap {
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
      text-align: center;
    }
    .login-text {
      margin-top: 10px;
      a {
        color: #e2e3ef;
      }
    }
    .icp {
      padding: 10px;
      color: #fff;
      background: #4f63b9;
      p {
        line-height: 20px;
      }
    }
  }
  .module2 {
    .mobile {
      position: relative;
    }
    .mobile-wrap {
      background: transparent;
      position: absolute;
      left: 0;
      top: 35px;
      width: 100%;
      .agree {
        color: #d1d1d1;
        text-align: center;
        font-size: 12px;
        margin-top: 10px;
        span {
          text-decoration: underline;
        }
      }
      .m-input {
        border-radius: 0;
        width: 80%;
        padding: 10px 15px;
      }
      .van-button {
        width: 80%;
        background: #fad581;
        color: #d93a4e;
        font-weight: bold;
        font-size: 18px;
      }
    }
    .login-text {
      margin-top: 10px;
      color: #d1d1d1;
      a {
        color: #fad581;
      }
    }
    .icp {
      background-color: #d7374f;
      padding: 0 10px 40px;
      color: #e0b0ae;
      p {
        line-height: 20px;
      }
    }
  }
  .module3 {
    background: #233757;
    .mobile {
      position: relative;
      .m-input {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 90%;
        transform: translateX(-50%);
      }
      .van-button {
        position: absolute;
        left: 50%;
        top: 0;
        width: 90%;
        transform: translateX(-50%);
        background: #aaa;
        color: #fff;
      }
    }
    .m2 {
      padding: 90px 0 0;
    }
    .login-text {
      position: absolute;
      left: 0;
      top: 75px;
      width: 100%;
    }
    .icp {
      color: #72819a;
      margin-top: 20px;
      p {
        line-height: normal;
        line-height: 20px;
      }
    }
    .footer-tip {
      width: 100%;
      font-size: 10px;
      text-align: center;
      color: #415371;
      margin-top: 30px;
      padding-bottom: 70px;
    }
  }
  .module4 {
    .m-wrap {
      position: relative;
      margin-bottom: 50px;
      img {
        position: absolute;
        left: 0;
        top: -55px;
      }
      .mobile {
        padding-top: 65px;
        .m-input {
          width: 75%;
          border: 1px solid #d3d1d1;
          border-radius: 0;
        }
        .van-button {
          width: 60%;
          font-size: 18px;
          background: #ff6c07;
          margin-top: 20px;
        }
      }
    }
    .login-text {
      position: relative;
      color: #878686;
      margin-top: 10px;
    }
    .bottom-img {
      position: relative;
      color: #878686;
      .icp {
        margin: 20px 0 30px;
        color: #878686;
        p {
          line-height: 18px;
        }
      }
      .tips {
        font-size: 10px;
        padding-bottom: 40px;
      }
    }
  }
}
</style>
