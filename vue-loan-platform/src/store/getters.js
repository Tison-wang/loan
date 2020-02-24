const getters = {
  name: state => state.user.name,
  home: state => state.home.home,
  token: state => state.user.token
}
export default getters
