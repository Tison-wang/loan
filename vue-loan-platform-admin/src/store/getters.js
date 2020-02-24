const getters = {
  opened: state => {
    if (state.app.opened === 'false') {
      return false
    } else if (state.app.opened === 'true') {
      return true
    }
  },
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  type: state => state.user.type,
  accessToken: state => state.user.accessToken,
  routes: state => state.permission.route
}
export default getters
