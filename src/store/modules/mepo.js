import api from "../../api";

// initial state

const state = {
  mepoList: [], // 啵啵列表
  total: 0, // 啵啵总数
  currentPage: 1, // 当前页
  query: ""
};

// getters
const getters = {};

// actions
const actions = {
  // 获取宠物列表
  getMepoList({ commit }) {
    api("mepo/read").then(r => {
      let result = r.data || [];
      commit("setMepoList", result);
      commit("setTotal", r.total);
      commit("setCurrentPage", r.current);
    });
  },
  // 简历一条数据
  createMepo({ commit }, { mepo }) {
    console.log(mepo);
    api("mepo/create", mepo).then(r => {
      console.log(r);
      commit("setMepoList", r.data);
    });
  }
};

// mutations
const mutations = {
  // 设置宠物列表数据
  setMepoList(state, list) {
    state.mepoList = list;
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