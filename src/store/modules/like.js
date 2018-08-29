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
  // 获取用户下的点赞列表
  getLikedList({ commit }, { self_id }) {
    // return;
    return api("user/find", {
      id: self_id,
      with: [
        {
          relation: "belongs_to_many",
          model: "mepo"
        }
      ]
    }).then(r => {
      //   console.log(r.data);
      commit("setLikedList", r.data.$mepo || []);
    });
  }
};

// mutations
const mutations = {
  // 设置已关注列表数据
  setLikedList(state, list) {
    state.list = list;
  },
  setTotal(state, total) {
    state.total = total;
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
