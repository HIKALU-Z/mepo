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
  getNotificationList({ commit }, { self_id }) {
    api("notification/read", {
      where: { user_id: self_id, status: "unread" }
    }).then(r => {
      // console.log(r);
      commit("setNotification", r.data || []);
    });
  },
  updateNotification({ commit }, { id = "", status = "", self_id = "" } = {}) {
    api("notification/update", { id, status })
      .then(r => {
        console.log(r);
      })
      .then(() => {
        api("notification/read", {
          where: { user_id: self_id, status: "unread" }
        }).then(r => {
          //   console.log(r);
          commit("setNotification", r.data || []);
        });
      });
  }
};

// mutations
const mutations = {
  // 设置消息中心
  setNotification(state, list) {
    state.list = list;
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
