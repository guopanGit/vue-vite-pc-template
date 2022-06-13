import {loginApi, getInfoApi, loginOutApi} from "@/api/user";

const state = () => ({
  menuSwitch: true,
  token: "", // 登录token
  info: {
    name: ""
  },  // 用户信息
  path: {}
});

// getters
const getters = {
  token(state) {
    return state.token;
  }
};

// mutations
const mutations = {
  menuSwitch(state, params) {
    state.menuSwitch = params;
  },
  tokenChange(state, token) {
    state.token = token;
  },
  infoChange(state, info) {
    state.info = info;
  },
  path(state, mate) {
    state.path = mate;
  }
};

// actions
const actions = {
  // 侧边导航开关
  menuSwitch({commit, dispatch}, params) {
    commit("menuSwitch", params);
  },
  // 侧边导航开关
  darkness({commit, dispatch}, params) {
    commit("darkness", params);
  },
  // 登录
  login({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      loginApi(params)
        .then(res => {
          commit("tokenChange", params.password);
          commit("infoChange", {name: params.name});
          setTimeout(() => {
            resolve(res);
          }, 2000);

        });
    });
  },

  // 退出登录
  loginOut({commit}) {
    commit("tokenChange", '');
    commit("infoChange", {});
    return new Promise((resolve) => {
      resolve('ok')
    })
  },

  // 保存当前路由
  setPath({commit}, params) {
    commit("path", params);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
