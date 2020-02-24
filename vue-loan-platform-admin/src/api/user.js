import base from './base'
import request from '@/utils/request'

const login = data =>
  request({
    url: `${base.url}/login`,
    data,
    method: 'post'
  })

const loginOut = data =>
  request({
    url: `${base.url}/logout`,
    data,
    method: 'post'
  })

export { login, loginOut }
