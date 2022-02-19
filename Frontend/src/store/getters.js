/*
 * @Description: 
 * @Author: MorantJY
 * @Date: 2022-02-16 13:24:40
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-16 16:39:50
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userID: state => state.user.userID
}
export default getters
