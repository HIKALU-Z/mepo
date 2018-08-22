import api from "../../api";
// import session from "./../../utils/session";

// initial state
const state = {
  list: [
    // {
    //   avatar_url: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    //   title: "Brunch this weekend?",
    //   subtitle:
    //     "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
    // },
    // // { divider: true, inset: true },
    // {
    //   avatar_url: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    //   title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
    //   subtitle:
    //     "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
    // },
    // // { divider: true, inset: true },
    // {
    //   avatar_url: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    //   title: "Oui oui",
    //   subtitle:
    //     "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
    // }
  ]
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
