/**
 * api接口的统一出口
 */

import common from './common'
import loan from './loan'
import admin from './admin'
import * as user from './user'
export default {
  common,
  loan,
  admin,
  user
}
