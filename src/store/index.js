// core
import Vue from "vue";
import Vuex from "vuex";
// modules
import mepo from "./modules/mepo"; // 微博数据中心
import like from "./modules/like"; // 点赞mepo数据中心
import follow from "./modules/follow"; // 关注列表数据中心
import recommend from "./modules/recommend"; // 推荐列表数据中心

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mepo,
    like,
    follow,
    recommend
  },
  state: {
    snackbar: {
      show: false,
      text: "something wrong",
      color: "success"
    }
  },
  mutations: {
    hideSnackBar(state) {
      state.snackbar.show = false;
    },
    showSnackBar(state, { text, color }) {
      console.log(text, color);
      state.snackbar.show = true;
      state.snackbar.text = text || "";
      state.snackbar.color = color || "error";
    }
  },
  actions: {
    hideSnackBar({ commit }) {
      commit("hideSnackBar");
    },
    showSnackBar({ commit }, { text, color }) {
      commit("showSnackBar", { text, color });
    }
  }
});
