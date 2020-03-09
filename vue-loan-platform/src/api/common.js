import base from './base'
import request from '@/utils/request'

// 获取图像驗證碼
const imageCode = () =>
    request({
        url: `${base.url}/imageCode`,
        method: 'post'
    })

// 获取手机驗證碼
const getMobileCode = (data, type) =>
    request({
        url: `${base.url}/sms/${data}/${type}/getCode`,
        method: 'get'
    })

// 获取是否显示手机驗證碼
const openStatus = () =>
    request({
        url: `${base.url}/openCodeStatus`,
        method: 'post'
    })

// 登录接口
const login = data =>
    request({
        url: `${base.url}/login`,
        data,
        method: 'post'
    })

// 注册
const register = data =>
    request({
        url: `${base.url}/logUp`,
        data,
        method: 'post'
    })

// 退出
const loginOut = () =>
    request({
        url: `${base.url}/logout`,
        method: 'post'
    })

// 修改密碼
const editPassword = data =>
    request({
        url: `${base.url}/userCenter/password/update`,
        data,
        method: 'post'
    })

// 忘记密碼
const forgetPwd = data =>
    request({
        url: `${base.url}/resetPassword`,
        data,
        method: 'post'
    })

// 借款列表
const loanList = data =>
    request({
        url: `${base.url}/userCenter/loan/list`,
        data,
        method: 'post'
    })
// 借款列表详情
const loanDetail = id =>
    request({
        url: `${base.url}/userCenter/loan/${id}/detail`,
        method: 'post'
    })

// 借款操作
const loan = data =>
    request({
        url: `${base.url}/loan`,
        data,
        method: 'post'
    })

// 还款列表
const repayList = data =>
    request({
        url: `${base.url}/userCenter/repayment/list`,
        data,
        method: 'post'
    })
// 常见问题
const faqList = data =>
    request({
        url: `${base.url}/faq/list`,
        data,
        method: 'post'
    })

// 首页
const home = data =>
    request({
        url: `${base.url}/index`,
        data,
        method: 'post'
    })

// 个人资料信息完善情况
const infoStatus = data =>
    request({
        url: `${base.url}/userCenter/userDetail/status`,
        data,
        method: 'post'
    })

// 修改个人资料信息完善情况
const updateInfo = data =>
    request({
        url: `${base.url}/userCenter/addUserInfo`,
        data,
        method: 'post'
    })
// 获取个人资料信息完善情况
const getInfo = data =>
    request({
        url: `${base.url}/userCenter/userDetail/view`,
        data,
        method: 'post'
    })

// 上載文件
const uploadFile = data =>
    request({
        url: '/common/upload',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

// 上載文件
const uploadFile2 = data =>
    request({
        url: '/common/upload2',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })

const hasUndoneLoan = () =>
    request({
        url: `${base.url}/hasUndoneLoan`,
        method: 'get'
    })

const wallet = () =>
    request({
        url: `${base.url}/wallet/index`,
        method: 'get'
    })

const withdraw = amount =>
    request({
        url: `${base.url}/wallet/withdraw/${amount}`,
        method: 'get'
    })

const withdrawTips = () =>
    request({
        url: `${base.url}/wallet/withdrawTips`,
        method: 'get'
    })
const canWithdraw = () =>
    request({
        url: `${base.url}/wallet/canWithdraw`,
        method: 'get'
    })
const empty = () =>
    request({
        url: `${base.url}/empty`,
        method: 'get'
    })
const template = () =>
    request({
        url: `${base.url}/template`,
        method: 'get'
    })

export default {
    imageCode,
    getMobileCode,
    openStatus,
    login,
    register,
    loginOut,
    editPassword,
    forgetPwd,
    loanList,
    loanDetail,
    loan,
    repayList,
    faqList,
    uploadFile,
    uploadFile2,
    // uploadImage,
    home,
    infoStatus,
    updateInfo,
    getInfo,
    hasUndoneLoan,
    wallet,
    withdraw,
    withdrawTips,
    canWithdraw,
    empty,
    template
}
