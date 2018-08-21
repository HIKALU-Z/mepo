import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () =>
        import(/* webpackChunkName: "signup" */ "./views/Signup.vue")
    },
    {
      path: "/setting",
      name: "setting",
      component: () =>
        import(/* webpackChunkName: "setting" */ "./views/setting/SettingBase.vue"),
      children: [
        {
          path: "account",
          name: "account",
          component: () =>
            import(/* webpackChunkName: "setting" */ "./views/setting/Account.vue")
        },
        {
          path: "password",
          name: "password",
          component: () =>
            import(/* webpackChunkName: "setting" */ "./views/setting/Password.vue")
        },
        {
          path: "security",
          name: "security",
          component: () =>
            import(/* webpackChunkName: "setting" */ "./views/setting/Security.vue")
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/error/noexist",
      name: "404",
      component: () =>
        import(/* webpackChunkName: "google" */ "./views/404.vue")
    },
    {
      path: "/:username",
      name: "user",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/User.vue")
    }
  ]
});
