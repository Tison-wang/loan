<template>
  <div class="person-info">
    <div class="tips info-border">填写真实有效的信息，审核才会通过哦~</div>
    <van-cell-group>
      <van-field
        v-model="form.monthlyIncome"
        label="月收入"
        placeholder="请输入现工作月收入"
      >
        <span slot="right-icon">元</span>
      </van-field>
      <van-field
        v-model="form.currentAddress"
        label="现居住地址"
        placeholder="请输入现居住地址"
      />
    </van-cell-group>
    <div class="tips">直系亲属联系人 ~</div>
    <van-cell-group>
      <van-field
        v-model="form.linkName1"
        label="姓名"
        placeholder="直系亲属姓名"
      />

      <van-field
        v-model="form.mobile1"
        label="手机号"
        placeholder="直系亲属手机号"
      />
      <van-field
        v-model="form.relation1"
        label="关系"
        readonly
        clickable
        placeholder="请选择关系"
        @click="showPicker = true"
      />
    </van-cell-group>

    <div class="tips">其他联系人</div>
    <van-cell-group>
      <van-field
        v-model="form.linkName2"
        label="姓名"
        placeholder="其他联系人姓名"
      />

      <van-field
        v-model="form.mobile2"
        label="手机号"
        placeholder="其他联系人手机号"
      />
      <van-field
        v-model="form.relation2"
        label="关系"
        readonly
        clickable
        placeholder="请选择关系"
        @click="showPicker3 = true"
      />
    </van-cell-group>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="showPicker3" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker3 = false"
        @confirm="onConfirm3"
      />
    </van-popup>
    <!-- <van-popup v-model="showPicker2" position="bottom">
      <van-area
        :area-list="areaList"
        @cancel="showPicker2 = false"
        @confirm="onConfirm2"
      />
    </van-popup>-->

    <van-button type="primary" @click="handleSend" class="loan-button"
      >提交</van-button
    >
  </div>
</template>
<script>
// import area from "./area";
export default {
  name: 'personInfo',
  data() {
    return {
      form: {
        currentAddress: '',
        monthlyIncome: '',
        linkName1: '',
        mobile1: '',
        relation1: '',
        linkName2: '',
        mobile2: '',
        relation2: ''
      },
      // address: "",
      // detail: "",
      showPicker: false,
      // showPicker2: false,
      showPicker3: false,
      columns: ['父母', '同事', '兄妹', '朋友']
      // areaList: area
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$api.common.getInfo().then(res => {
        if (res.code === 200 && res.data) {
          this.form = {
            currentAddress: res.data.currentAddress,
            monthlyIncome: res.data.monthlyIncome,
            linkName1: res.data.linkName1,
            mobile1: res.data.mobile1,
            relation1: res.data.relation1,
            linkName2: res.data.linkName2,
            mobile2: res.data.mobile2,
            relation2: res.data.relation2
          }
        }
      })
    },
    onConfirm(value) {
      this.form.relation1 = value
      this.showPicker = false
    },
    onConfirm3(value) {
      this.form.relation2 = value
      this.showPicker3 = false
    },
    handleSend() {
      if (!this.form.monthlyIncome) {
        this.$toast({
          type: 'warning',
          message: '请输入现工作月收入'
        })
        return false
      } else if (!this.form.currentAddress) {
        this.$toast({
          type: 'warning',
          message: '请输入现居住地址'
        })
        return false
      } else if (!this.form.linkName1) {
        this.$toast({
          type: 'warning',
          message: '请输入直系亲属姓名'
        })
        return false
      } else if (!this.form.mobile1) {
        this.$toast({
          type: 'warning',
          message: '请输入直系亲属手机号'
        })
        return false
      } else if (!/^1[34578]\d{9}$/.test(this.form.mobile1)) {
        this.$toast({
          type: 'warning',
          message: '请输入正确的手机号'
        })
        return false
      } else if (!this.form.relation1) {
        this.$toast({
          type: 'warning',
          message: '请选择直系亲属关系'
        })
        return false
      } else if (!this.form.linkName2) {
        this.$toast({
          type: 'warning',
          message: '请输入其他联系人姓名'
        })
        return false
      } else if (!this.form.mobile2) {
        this.$toast({
          type: 'warning',
          message: '请输入其他联系人手机号'
        })
        return false
      } else if (!/^1[34578]\d{9}$/.test(this.form.mobile2)) {
        this.$toast({
          type: 'warning',
          message: '请输入正确的手机号'
        })
        return false
      } else if (!this.form.relation2) {
        this.$toast({
          type: 'warning',
          message: '请选择其他联系人关系'
        })
        return false
      }
      this.$api.common.updateInfo(this.form).then(res => {
        if (res.code === 200) {
          this.$toast({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push({ name: 'myInfo' })
        }
      })
    }
    // onConfirm2(value) {
    //   console.log(value);
    //   // this.address = value;
    //   this.showPicker2 = false;
    // }
  }
}
</script>
<style lang="less">
.person-info {
  .tips {
    text-align: center;
    padding: 10px 0;
  }
  .info-border {
    border-bottom: 1px solid #eaeaea;
  }
}
</style>
