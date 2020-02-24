import base from './base'
import request from '@/utils/request'

const adminList = data =>
  request({
    url: `${base.url}/admin/list`,
    data,
    method: 'post'
  })
const updatePwd = data =>
  request({
    url: `${base.url}/userCenter/update/password`,
    data,
    method: 'post'
  })

const adminUpdate = (data, id) =>
  request({
    url: `${base.url}/admin/update/${id}`,
    data,
    method: 'post'
  })

const adminAdd = data =>
  request({
    url: `${base.url}/admin/add`,
    data,
    method: 'post'
  })

const adminDel = id =>
  request({
    url: `${base.url}/admin/delete/${id}`,
    method: 'post'
  })
export default { adminList, updatePwd, adminUpdate, adminAdd, adminDel }
