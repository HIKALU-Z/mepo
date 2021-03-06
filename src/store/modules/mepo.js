import api from "../../api";
import session from "./../../utils/session";
// initial state

const state = {
  mepoList: [], // 啵啵列表
  total: 0, // 啵啵总数
  mepoNumber: 0, // 某用户下的 mepo 总数
  currentPage: 1, // 当前页
  query: "",
  mepo: {
    content: "",
    user_id: session.his_id()
  }
};

// getters
const getters = {};

// actions
const actions = {
  // 获取 mepo 列表
  getMepoList({ commit }, { where = "", withProp = [] } = {}) {
    api("mepo/read", { where: where, with: withProp }).then(r => {
      let result = r.data || [];
      commit("setMepoList", result);
      commit("setTotal", r.total);
      commit("setCurrentPage", r.current);
    });
  },
  // 简历一条数据
  createMepo({ commit }, { mepo }) {
    api("mepo/create", mepo)
      .then(r => {
        // commit("setMepo", { content: "", user_id: session.his_id() });
        mepo.content = "";
        return r.success;
      })
      .then(success => {
        if (success) {
          api("mepo/read").then(r => {
            let result = r.data || [];
            commit("setMepoList", result);
            commit("setTotal", r.total);
            commit("setCurrentPage", r.current);
          });
        }
      });
  },
  getMepoNumber({ commit }, { self_id } = {}) {
    api("mepo/count", {
      where: { user_id: self_id }
    }).then(r => {
      commit("setMepoNumber", r.data || 0);
    });
  }
};

// mutations
const mutations = {
  // 设置宠物列表数据
  setMepoList(state, list) {
    // console.log(list);
    state.mepoList = list;
  },
  setMepoNumber(state, number) {
    state.mepoNumber = number;
  },
  setTotal(state, total) {
    state.total = total;
  },
  setCurrentPage(state, current) {
    state.currentPage = current;
  },
  setQuery(state, query) {
    state.query = query;
  }
};

const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
