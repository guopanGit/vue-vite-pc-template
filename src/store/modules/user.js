import { loginApi, getInfoApi, loginOutApi } from '@/api/user'

const state = () => ({
  token: '', // 登录token
  info: {},  // 用户信息
})

// getters
const getters = {
  token(state) {
    return state.token
  }
}

// mutations
const mutations = {
  tokenChange(state, token) {
    state.token = token
  },
  infoChange(state, info) {
    state.info = info
  }
}

// actions
const actions = {
  // 登录
  login({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      loginApi(params)
        .then(res => {
          console.log(res);
          commit('tokenChange', res)
          dispatch('getInfo', { token: res})
            .then(infoRes => {
              resolve(res)
            })
        })
    })
  },
  // 获取用户信息
  getInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      getInfoApi(params)
        .then(res => {
          commit('infoChange', res)
          resolve(res)
        })
    })
  },

  // 退出登录
  loginOut({ commit }) {
    loginOutApi()
      .then(res => {

      })
      .catch(error => {

      })
      .finally(() => {

        location.reload()
      })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}