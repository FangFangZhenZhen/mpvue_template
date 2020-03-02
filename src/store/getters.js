// 监听modules中state值的变化，返回计算后的结果
const getters = {
  token   : state => state.user.token,
  rootId  : state => state.user.rootId,
  orgName : state => state.user.orgName,
  userInfo: state => state.user.userInfo,
  newPhone: state => state.person.newPhone
}
export default getters
