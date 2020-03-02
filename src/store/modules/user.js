import {login} from '@/api/login'
import md5 from 'js-md5'
// import router from '../../router'

import {
  setToken,
  getToken,
  removeToken,
  getRootId,
  setRootId,
  removeRootId,
  setOrgName,
  getOrgName
} from '@/utils/auth'
// import {
//   setStore
// } from '@/utils'
const user = {
  state: {
    token   : getToken(),
    rootId  : getRootId(),
    userInfo: {},
    orgName : getOrgName()
  },
  // 修改state值的方法函数（组件中：this.$store.commit("SET_TOKEN")）
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token  //更新vuex中的token值
      console.log(token)
      setToken(token) ////更新storage中的token值
    },
    SET_USER_INFO: (state, data) => {
      console.log(data)
      state.userInfo = data
    },
    SET_ROOT_ID: (state, rootInfo) => {
      state.rootId  = rootInfo.rootId || ''
      state.orgName = rootInfo.name || ''
      setRootId(rootInfo.rootId || '')
      setOrgName(rootInfo.name)
      // console.log(state, getOrgName())
    }
  },
  //类似于vue中的methods方法，间接调用mutations中的函数(组件中：this.$store.dispatch("Login"))
  actions: {
    // 登录
    Login ({commit}, params) {
      params.username = params.username.trim()
      if (params.password) {
        params.password = md5(params.password).toUpperCase()
      }
      return new Promise((resolve, reject) => {
        login(params).then(response => {
          commit('SET_USER_INFO', response.data) //调用mutations中的函数
          commit('SET_TOKEN', response.data.accesstoken)
          // 判断是否有所属机构
          if (response.data.organizeList && response.data.organizeList.length > 0) {
            // 如果登录之前已经设置了rootId(eg.收到邀请时) 则登录后进入指定机构
            let targetOrg = null
            let rootId    = getRootId()
            console.log('> 设置的rootId:', rootId)
            if (rootId) {
              targetOrg = response.data.organizeList.filter(item => item.organizeId === parseInt(rootId))[0]
            } else {
              targetOrg = response.data.organizeList[0]
            }
            console.log(targetOrg)
            commit('SET_ROOT_ID', targetOrg)
          } else {
            // 没有所属机构 跳转机构绑定页
            // router.push('/person/bindOrganize')
            // commit('SET_TOKEN', '')
            // removeToken()
            // commit('SET_ROOT_ID', {})
            // removeRootId()
            // window.location.reload()
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        // getInfo().then(response => {
        //   commit('SET_USERINFO', response.data)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    LogOut ({commit, state}) {
      // return new Promise((resolve, reject) => {
      //   logout().then(() => {
      //     commit('SET_NAME', '')
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 前端 登出
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        removeToken()
        removeRootId()
        commit('SET_ROOT_ID', {})
        resolve()
      })
    }
  }
}

export default user
