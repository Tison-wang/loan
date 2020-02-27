<template>
    <div class="loan-manager">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input
                        v-model="params.searchName"
                        placeholder="订单号/用户名/姓名"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
        <div style="height:calc(100vh - 260px)">
            <el-table
                    v-loading="loading"
                    height="100%"
                    :data="tableData"
                    ref="searchTable"
                    border
                    style="width: 100%"
            >
                <el-table-column label="ID" fixed width="50">
                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column
                        prop="ownerId"
                        label="推荐人ID"
                        width="80"
                        fixed
                ></el-table-column>
                <el-table-column
                        prop="no"
                        fixed
                        label="订单号"
                        width="100px"
                ></el-table-column>
                <el-table-column
                        fixed
                        prop="userInfo.userName"
                        label="用户名"
                ></el-table-column>
                <el-table-column
                        width="60px"
                        prop="userInfo.detail.name"
                        label="姓名"
                ></el-table-column>
                <el-table-column label="借款金额">
                    <template slot-scope="scope">
                        {{ scope.row.amount }}
                        <el-button
                                type="text"
                                :disabled="scope.row.state >= 11"
                                @click="editAmount(scope.row.id)"
                        >修改
                        </el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="每月还款">
                    <template slot-scope="scope">
                        {{ scope.row.repayAmountOfMonth }}
                        <el-button
                                type="text"
                                :disabled="scope.row.state >= 11"
                                @click="editRepay(scope.row.id)"
                        >修改
                        </el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="借款期限(月)" width="110px">
                    <template slot-scope="scope">
                        {{ scope.row.loanTerm }}
                        <el-button
                                type="text"
                                :disabled="scope.row.state >= 11"
                                @click="editLoanTerm(scope.row.id)"
                        >修改
                        </el-button
                        >
                    </template>
                </el-table-column>

                <el-table-column label="累计提现金额" width="110px">
                    <template slot-scope="scope">{{
                        scope.row.totalWithdrawAmount
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="当前提现金额" width="110px">
                    <template slot-scope="scope">
                        {{ scope.row.currentWithdrawAmount }}
                        <el-button
                                type="text"
                                :disabled="scope.row.state >= 11"
                                @click="editdraw(scope.row.id)"
                        >修改
                        </el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column prop="useFor" label="贷款用途"></el-table-column>

                <el-table-column label="管理员备注" width="100px">
                    <template slot-scope="scope">
            <span class="ellipsis" :title="scope.row.comment">{{
              scope.row.comment
            }}</span>
                        <el-button type="text" @click="editComment(scope.row.id)"
                        >修改
                        </el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column width="150px" label="创建日期">
                    <template slot-scope="scope">{{
                        formatDate(scope.row.createTime)
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="状态" min-width="100px">
                    <template slot-scope="scope">
                        {{ status(scope.row.state) }}
                        <el-button
                                type="text"
                                @click="againSend(scope.row.id, scope.row.stateDesc)"
                        >重发短信
                        </el-button
                        >
                    </template>
                </el-table-column>

                <el-table-column width="110px" fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleOrder(scope.row)"
                        >修改订单状态
                        </el-button
                        >
                        <a
                                v-if="scope.row.transferVoucher"
                                class="el-link el-link--primary"
                                target="_blank"
                                :href="`${url}/common/download/${scope.row.transferVoucher}`"
                        >查看打款图</a
                        >
                        <el-button type="text" @click="handleUploadImg(scope.row.id)" v-else
                        >查看打款图
                        </el-button
                        >
                        <el-button type="text" @click="handleLook(scope.row.userId)"
                        >查看资料
                        </el-button
                        >
                        <el-button @click="handleDel(scope.row.id)" type="text"
                        >删除订单
                        </el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <pagination
                    :total="total"
                    :limit="params.pageSize"
                    :page="params.pageNum"
                    @current-change="currentChange"
                    @size-change="sizeChange"
            ></pagination>
        </div>
        <ComDialog
                ref="comDialog"
                :setClass="isSetClass"
                :comWidth="comWidth"
                :dialogVisible="dialogVisible"
                :comTitle="comTitle"
                @updateData="updateData"
                @close="dialogVisible = false"
        >
            <component
                    :is="componentName"
                    :comTitle="comTitle"
                    @validate="validate"
                    ref="inputData"
            ></component>
        </ComDialog>
    </div>
</template>
<script>
    import LookInfo from '@/components/LookInfo'
    import EditAmount from './editAmount'
    import EditComment from './editComment'
    import EditOrder from './editOrder'
    import UploadImg from './uploadImg'

    export default {
        name: 'manager',
        components: {
            LookInfo,
            EditAmount,
            EditComment,
            EditOrder,
            UploadImg
        },
        computed: {
            url() {
                return process.env.VUE_APP_BASE_API
            }
        },
        data() {
            return {
                loading: false,
                comWidth: '460px',
                total: 0,
                params: {
                    pageSize: 20,
                    pageNum: 1,
                    searchName: ''
                },
                dialogVisible: false,
                comTitle: '请输入借款金额',
                componentName: 'EditAmount',
                id: '',
                type: 1,
                tableData: [],
                isSetClass: false
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            validate(val) {
                this.$refs.inputData.form.validate = val
            },
            status(state) {
                let result = ''
                switch (state) {
                    case 0:
                        result = '贷款申请'
                        break
                    case 1:
                        result = '正在审核'
                        break
                    case 2:
                        result = '审核不通过'
                        break
                    case 3:
                        result = '审核通过'
                        break
                    case 4:
                        result = '授权码失效'
                        break
                    case 5:
                        result = '收取保险费'
                        break
                    case 6:
                        result = '预付前1期费用'
                        break
                    case 7:
                        result = '预付前2期费用'
                        break
                    case 8:
                        result = '预付前3期费用'
                        break
                    case 9:
                        result = '订单取消'
                        break
                    case 10:
                        result = '申请退款'
                        break
                    case 11:
                        result = '放款成功'
                        break
                    case 12:
                        result = '打款中'
                        break
                    case 13:
                        result = '信用流水'
                        break
                    case 14:
                        result = '银行卡异常'
                        break
                    case 15:
                        result = '解冻'
                        break
                    case 16:
                        result = '冻结'
                        break
                    case 17:
                        result = '解冻成功,需回档'
                        break
                }
                return result
            },
            getData() {
                this.loading = true
                this.$api.loan
                    .loanList(this.params)
                    .then(res => {
                        if (res.code === 200) {
                            this.total = res.data.total
                            this.tableData = res.data.list || []
                            this.$refs.searchTable.bodyWrapper.scrollTop = 0
                            this.loading = false
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },
            onSubmit() {
                this.getData()
            },
            updateState(params, id) {
                this.$refs.inputData.form.validate(valid => {
                    if (valid) {
                        if (this.type !== 7) {
                            this.$refs.comDialog.buttonLoading = true
                            this.$api.loan
                                .updateDate(params, id)
                                .then(res => {
                                    if (res.code === 200) {
                                        this.$message({
                                            type: 'success',
                                            message: '修改成功'
                                        })
                                        this.getData()
                                    }
                                })
                                .finally(() => {
                                    this.$refs.comDialog.buttonLoading = false
                                    this.dialogVisible = false
                                })
                        } else {
                            this.$confirm('确定要修改该资料信息?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.$refs.comDialog.buttonLoading = true
                                this.$api.common
                                    .userUpdate(params, id)
                                    .then(res => {
                                        if (res.code === 200) {
                                            this.$message({
                                                type: 'success',
                                                message: '修改成功'
                                            })
                                        }
                                    })
                                    .finally(() => {
                                        this.$refs.comDialog.buttonLoading = false
                                        this.dialogVisible = false
                                    })
                            })
                        }
                    }
                })
            },
            comConstruct(id, title) {
                this.id = id
                this.comTitle = title
                this.isSetClass = false
                this.dialogVisible = true
            },
            // 修改借款金额
            editAmount(id) {
                this.type = 1
                this.comWidth = '460px'
                this.componentName = 'EditAmount'
                this.comConstruct(id, '请输入借款金额')
            },
            // 修改每月还款金额
            editRepay(id) {
                this.type = 2
                this.comWidth = '460px'
                this.componentName = 'EditAmount'
                this.comConstruct(id, '请输入每月还款金额')
            },
            // 修改借款期限
            editLoanTerm(id) {
                this.type = 3
                this.comWidth = '460px'
                this.componentName = 'EditAmount'
                this.comConstruct(id, '请输入借款期限')
            },
            // 修改提款金额
            editdraw(id) {
                this.type = 6
                this.comWidth = '460px'
                this.componentName = 'EditAmount'
                this.comConstruct(id, '请输入提款金额')
            },
            // 修改备注
            editComment(id) {
                this.type = 4
                this.comWidth = '460px'
                this.componentName = 'EditComment'
                this.comConstruct(id, '请输入备注')
            },
            againSend(id, statusDesc) {
                this.type = 9
                this.comWidth = '460px'
                this.componentName = 'EditComment'
                this.comConstruct(id, '请输入短信信息')
                this.$nextTick(() => {
                    this.$refs.inputData.form.comment = statusDesc
                })
            },
            // 修改订单状态
            handleOrder(obj) {
                this.type = 5
                this.id = obj.id
                this.isSetClass = false
                this.comWidth = '870px'
                this.componentName = 'EditOrder'
                this.comTitle = '修改订单状态'
                this.dialogVisible = true

                this.$nextTick(() => {
                    this.$refs.inputData.order = obj.no
                    this.$refs.inputData.form.state = obj.state
                    this.$refs.inputData.form.stateDesc = obj.stateDesc
                    this.$refs.inputData.saveState = obj.state
                })
            },
            handleDel(id) {
                this.$confirm('确定要删除该订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.loan.updateDate({state: -1}, id).then(res => {
                        if (res.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.getData()
                        }
                    })
                })
            },
            // 查看打款图
            handleUploadImg(id) {
                let routeUrl = this.$router.resolve({
                    path: "/loanManagement/viewUploadImg",
                    query: {id: id}
                });
                window.open(routeUrl.href, '_blank');
            },
            submitImg() {
                if (!this.$refs.inputData.file) {
                    this.$message({
                        type: 'warning',
                        message: '请上传打款图'
                    })
                    return false
                }
                this.$refs.comDialog.buttonLoading = true
                this.$api.loan
                    .transferVoucher(this.$refs.inputData.file, this.id)
                    .then(res => {
                        if (res.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '上传成功'
                            })
                            this.getData()
                        }
                    })
                    .finally(() => {
                        this.$refs.comDialog.buttonLoading = false
                        this.dialogVisible = false
                    })
            },
            send() {
                this.$refs.comDialog.buttonLoading = true
                this.$api.loan
                    .sendSms({content: this.$refs.inputData.form.comment}, this.id)
                    .then(res => {
                        if (res.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '发送成功'
                            })
                        }
                    })
                    .finally(() => {
                        this.$refs.comDialog.buttonLoading = false
                        this.dialogVisible = false
                    })
            },
            updateData() {
                let params = {}
                switch (this.type) {
                    case 1:
                        params = {amount: this.$refs.inputData.form.amount}
                        break
                    case 2:
                        params = {repayAmountOfMonth: this.$refs.inputData.form.amount}
                        break
                    case 3:
                        params = {loanTerm: this.$refs.inputData.form.amount}
                        break
                    case 4:
                        params = {comment: this.$refs.inputData.form.comment}
                        break
                    case 5:
                        params = this.$refs.inputData.form
                        break
                    case 6:
                        params = {currentWithdrawAmount: this.$refs.inputData.form.amount}
                        break
                    case 7:
                        params = {...this.$refs.inputData.form}
                        break
                    case 8:
                        this.submitImg()
                        break
                    case 9:
                        this.send()
                        break
                    default:
                        break
                }
                if (this.type !== 8 && this.type !== 9) {
                    this.updateState(params, this.id)
                }
            },
            handleLook(id) {
                this.id = id
                this.type = 7
                this.isSetClass = true
                this.comWidth = '790px'
                this.comTitle = '基本资料'
                this.componentName = 'LookInfo'
                this.$api.common.userView(id).then(res => {
                    if (res.code === 200) {
                        this.dialogVisible = true
                        if (res.data && res.data.detail) {
                            this.$nextTick(() => {
                                this.$refs.inputData.form = {
                                    userName: res.data.userName,
                                    bankCardNumber: res.data.detail.bankCardNumber,
                                    bankName: res.data.detail.bankName,
                                    currentAddress: res.data.detail.currentAddress,
                                    idCardFrontImage: res.data.detail.idCardFrontImage,
                                    idCardHoldImage: res.data.detail.idCardHoldImage,
                                    idCardNumber: res.data.detail.idCardNumber,
                                    idCardReverseImage: res.data.detail.idCardReverseImage,
                                    linkName1: res.data.detail.linkName1,
                                    linkName2: res.data.detail.linkName2,
                                    mobile1: res.data.detail.mobile1,
                                    mobile2: res.data.detail.mobile2,
                                    monthlyIncome: res.data.detail.monthlyIncome,
                                    name: res.data.detail.name,
                                    relation1: res.data.detail.relation1,
                                    relation2: res.data.detail.relation2
                                }
                            })
                        }
                    }
                })
            },
            close() {
                this.dialogVisible = false
            },
            // 切换頁码
            currentChange(cpage) {
                this.params.pageNum = cpage
                this.getData()
            },
            // 切换每頁条數
            sizeChange(csize) {
                this.params.pageNum = 1
                this.params.pageSize = csize
                this.getData()
            }
        }
    }
</script>
<style scoped lang="less">
    .loan-manager {
        .el-button--text {
            padding: 5px 0;
        }
    }
</style>
