import base from './base'
import request from '@/utils/request'

const loanList = data =>
  request({
    url: `${base.url}/loan/list`,
    data,
    method: 'post'
  })

// 修改
const updateDate = (data, id) =>
  request({
    url: `${base.url}/loan/${id}/update`,
    data,
    method: 'post'
  })

const transferVoucher = (data, id) =>
  request({
    url: `${base.url}/loan/${id}/upload/transferVoucher`,
    data,
    method: 'post'
  })
const sendSms = (data, id) =>
  request({
    url: `${base.url}/loan/${id}/sendSms`,
    data,
    method: 'post'
  })

export default { loanList, updateDate, sendSms, transferVoucher }
