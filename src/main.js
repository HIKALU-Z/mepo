// 转译文件
import "@babel/polyfill";

// 核心文件 Vue
import Vue from "vue";

// 第三方插件
import "./plugins/vuetify";

// 入口文件
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import "./registerServiceWorker";

// 生产环境提示
Vue.config.productionTip = false;

// 生成路由匹配规则
router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next("/error/noexist");
    return;
  }
  next();
});

// Vue 实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
