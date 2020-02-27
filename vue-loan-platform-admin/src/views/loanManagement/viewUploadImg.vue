<template>
    <!-- 查看打款图 -->
    <div class="view-upload-img">
        <el-tooltip class="item" effect="light" :content="'您好，' + siteName" placement="top-start">
            <div class="site-name">您好，{{siteName}}</div>
        </el-tooltip>
        <el-row>
            <el-form
                    :model="form"
                    ref="form"
                    label-width="200px"
                    size="mini">
                <el-form-item label="转账批次号：">
                    <el-input v-model="form.batchNumber"></el-input>
                </el-form-item>
                <el-form-item label="转出单位：">
                    <el-input v-model="form.transferCompany"></el-input>
                </el-form-item>
                <el-form-item label="转出账户：">
                    <el-input v-model="form.transferAccount"></el-input>
                </el-form-item>
                <el-form-item label="转出账号地区：">
                    <el-input v-model="form.transferArea"></el-input>
                </el-form-item>
                <el-form-item label="收款人姓名：">
                    <el-input v-model="form.receiptName"></el-input>
                </el-form-item>
                <el-form-item label="收款银行：">
                    <el-input v-model="form.receiptBank"></el-input>
                </el-form-item>
                <el-form-item label="收款账户：">
                    <el-input v-model="form.receiptBankAccount"></el-input>
                </el-form-item>
                <el-form-item label="币种：">
                    <el-input v-model="form.currency"></el-input>
                </el-form-item>
                <el-form-item label="转账金额：">
                    <el-input v-model="form.transferAmount"></el-input>
                </el-form-item>
                <el-form-item label="转账时间：">
                    <el-input v-model="form.transferDate"></el-input>
                </el-form-item>
                <el-form-item label="转账类型：">
                    <el-input v-model="form.transferType"></el-input>
                </el-form-item>
                <el-form-item label="执行方式：">
                    <el-input v-model="form.executeWay"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-input class="status" v-model="form.status"></el-input>
                </el-form-item>
                <el-form-item label="银行备注：">
                    <el-input v-model="form.bankRemark"></el-input>
                </el-form-item>
                <el-form-item label="处理结果：">
                    <el-input class="deal-result" v-model="form.dealResult"></el-input>
                </el-form-item>
                <el-form-item label="用户备注：">
                    <el-input v-model="form.customRemark"></el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-button size="mini">打印</el-button>
        </el-row>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'editOrder',
        computed: {
            ...mapGetters(['userId', 'userName'])
        },
        data() {
            return {
                form: {
                    /**
                     * 转账批次号
                     */
                    batchNumber: '',
                    /**
                     * 转出单位
                     */
                    transferCompany: '',
                    /**
                     * 转出账户
                     */
                    transferAccount: '',
                    /**
                     * 转出账号地区
                     */
                    transferArea: '',
                    /**
                     * 收款人姓名
                     */
                    receiptName: '',
                    /**
                     * 收款银行
                     */
                    receiptBank: '',
                    /**
                     * 收款账户
                     */
                    receiptBankAccount: '',
                    /**
                     * 币种
                     */
                    currency: '',
                    /**
                     * 转账金额
                     */
                    transferAmount: '',
                    /**
                     * 转账时间
                     */
                    transferDate: '',
                    /**
                     * 转账类型
                     */
                    transferType: '',
                    /**
                     * 执行方式
                     */
                    executeWay: '',
                    /**
                     * 状态
                     */
                    status: '',
                    /**
                     * 银行备注
                     */
                    bankRemark: '',
                    /**
                     * 处理结果
                     */
                    dealResult: '',
                    /**
                     * 用户备注
                     */
                    customRemark: '',
                },
                siteName: '', //站点名称
            }
        },
        mounted() {
            this.$api.common.viewUploadImgDetail(null)
                .then(res => {
                    if (res.code === 200) {
                        this.form = res.data;
                    }
                });
            this.$api.common.siteList({
                pageSize: 1,
                pageNum: 1,
                searchKey: document.domain
            }).then(res => {
                if (res.code === 200) {
                    this.siteName = res.data.list[0].siteName;
                }
            })
        },
        methods: {}
    }
</script>
<style lang="less">
    .view-upload-img {
        height: 826px;
        width: 1010px;
        background: url(../../assets/images/viewUploadImgBg.jpg) no-repeat center center;
        overflow: hidden;
        margin: 0px auto;

        .site-name {
            top: 40px;
            left: 410px;
            width: 110px;
            position: relative;
            font-size: 13px;
            color: #000000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .el-form {
            width: 500px;
            margin: 176px 30% 0px;

            .el-form-item {
                margin-bottom: 2px;

                .el-input__inner {
                    border: none;
                    color: #000000;
                    font-size: 14px;
                    padding: 0px 2px;
                }

                .status > .el-input__inner {
                    color: green;
                }

                .deal-result > .el-input__inner {
                    color: red;
                }
            }
        }

        .el-button {
            width: 54px;
            height: 26px;
            margin-top: 20px;
            margin-left: 50%;
            color: #FFFFFF;
            background: url(../../assets/images/printBg.png);
        }
    }
</style>
