import api from "../../api";
// import session from "./../../utils/session";

// initial state
const state = {
  list: []
};

// getters
const getters = {};

// actions
const actions = {
  // 获取推荐关注列表
  getRecommendationList({ commit }, { self_id }) {
    api("user/read", { limit: 3, where: [["id", "!=", self_id]] }).then(r => {
      let result = r.data || [];
      commit("setRecommendationList", result);
      commit("setTotal", r.total);
      commit("setCurrentPage", r.current);
    });
  }
};

// mutations
const mutations = {
  // 设置推荐关注列表数据
  setRecommendationList(state, list) {
    state.list = list;
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

// namespace
const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
