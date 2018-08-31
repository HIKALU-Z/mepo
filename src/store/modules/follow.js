import api from "../../api";
// initial state

const state = {
  list: [], // 已关注列表
  followerNumber: 0, // 关注的人数
  fansNumber: 0 // 粉丝的人数
};

// getters
const getters = {};

// actions
const actions = {
  // 获取关注列表
  getFollowedList({ commit }, { self_id }) {
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
  },
  // 获取关注的人的数量
  getFollowerNumber({ commit }, { self_id }) {
    return api("_bind__user_user/read", {
      where: { follower_id: self_id }
    }).then(r => {
      let number = r.data.length;
      commit("setFollowerNumber", number || 0);
    });
  },
  // 获取粉丝数
  getFansNumber({ commit }, { self_id }) {
    return api("_bind__user_user/read", {
      where: { target_id: self_id }
    }).then(r => {
      let number = r.data.length;
      commit("setFansNumber", number || 0);
    });
  }
};

// mutations
const mutations = {
  // 设置已关注列表数据
  setFollowedList(state, list) {
    state.list = list;
  },
  // 设置关注人数
  setFollowerNumber(state, number) {
    state.followerNumber = number;
  },
  // 设置粉丝数量
  setFansNumber(state, number) {
    state.fansNumber = number;
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
