import base from './base'
import request from '@/utils/request'

// 系统设置
const sysView = () =>
    request({
        url: `${base.url}/sysConfig/view`,
        method: 'post'
    })

// 系统设置更新
const sysUpdate = data =>
    request({
        url: `${base.url}/sysConfig/update`,
        data,
        method: 'post'
    })

// 系统设置-获取接口设置
const websiteConfig = data =>
    request({
        url: `${base.url}/websiteConfig/view`,
        data,
        method: 'get'
    })

// 系统设置-更新接口设置
const updateWebsiteConfig = data =>
    request({
        url: `${base.url}/websiteConfig/update`,
        data,
        method: 'post'
    })

// 用户管理列表
const userList = data =>
    request({
        url: `${base.url}/userManage/list`,
        method: 'post',
        data
    })

// 用户详情
const userView = id =>
    request({
        url: `${base.url}/userManage/${id}/detail/view`,
        method: 'post'
    })

// 更新用户详情
const userUpdate = (data, id) =>
    request({
        url: `${base.url}/userManage/${id}/detail/update`,
        method: 'post',
        data
    })

// 用户删除
const userDel = (data, id) =>
    request({
        url: `${base.url}/userManage/${id}/update`,
        data,
        method: 'post'
    })

// 用户密码修改
const userEditPwd = (data, id) =>
    request({
        url: `${base.url}/userManage/${id}/update`,
        data,
        method: 'post'
    })

// 自由模块
const faqList = data =>
    request({
        url: `${base.url}/faq/list`,
        data,
        method: 'post'
    })

// 添加自由模块
const addFaq = data =>
    request({
        url: `${base.url}/faq/add`,
        data,
        method: 'post'
    })
// 修改自由模块
const updateFaq = (data, id) =>
    request({
        url: `${base.url}/faq/${id}/update `,
        data,
        method: 'post'
    })

// 保存新密碼
const setPassword = data =>
    request({
        url: `${base.url}/login/setPassword`,
        data,
        method: 'post'
    })

// 合同管理内容
const contractList = type =>
    request({
        url: `${base.url}/contract/view/${type}`,
        method: 'post'
    })
// 更新合同管理内容
const updateContract = data =>
    request({
        url: `${base.url}/contract/update`,
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
// 合同管理内容
const siteName = () =>
    request({
        url: `${base.url}/userCenter/getDomain`,
        method: 'get'
    })
// 站点管理列表
const siteList = data =>
    request({
        url: `${base.url}/siteManage/list`,
        method: 'post',
        data
    })
// 站点管理详情
const siteDetail = id =>
    request({
        url: `${base.url}/siteManage/${id}/detail`,
        method: 'post'
    })
// 站点管理修改
const siteUpdate = (data, id) =>
    request({
        url: `${base.url}/siteManage/${id}/update`,
        method: 'post',
        data
    })
// 查看打款图mock
const viewUploadImgDetail = (param) =>
    request({
        url: `${base.url}/siteManage/getUploadImgDetail`,
        method: 'post',
        param
    })
export default {
    sysView,
    sysUpdate,
    websiteConfig,
    updateWebsiteConfig,
    userList,
    userView,
    userUpdate,
    userDel,
    userEditPwd,
    faqList,
    addFaq,
    updateFaq,
    setPassword,
    contractList,
    updateContract,
    uploadFile,
    siteName,
    siteList,
    siteDetail,
    siteUpdate,
    viewUploadImgDetail
}
