import api from "../../api";
// initial state

const state = {
  list: [] // 已关注列表
  //   self_id: session.his_id() || null
};

// getters
const getters = {};

// actions
const actions = {
  // 获取关注列表
  getFollowedList({ commit }, { self_id }) {
    // console.log(self_id);
    // return;
    return api("user/find", {
      id: self_id,
      with: [
        {
          relation: "belongs_to_many",
          model: "user"
        }
      ]
    }).then(r => {
      commit("setFollowedList", r.data.$user || []);
    });
  }
  //   followToTarget({ commit }) {}
};

// mutations
const mutations = {
  // 设置宠物列表数据
  setFollowedList(state, list) {
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

const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
