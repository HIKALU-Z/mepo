// core
import Vue from "vue";
import Vuex from "vuex";
// modules
import mepo from "./modules/mepo";
import follow from "./modules/follow";
import recommend from "./modules/recommend";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mepo,
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
