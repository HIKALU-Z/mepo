import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
// import "bulma";

Vue.use(Vuetify, {
  theme: {
    primary: "#ee44aa",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  }
  // iconfont: "mdi"
  // icons: {
  //   product: "mdi-dropbox",
  //   support: "mdi-lifebuoy",
  //   steam: "mdi-steambox",
  //   pc: "mdi-desktop-classic",
  //   xbox: "mdi-xbox",
  //   playstation: "mdi-playstation",
  //   switch: "mdi-nintendo-switch",
  //   facebook: "mdi-faceboox-box"
  // }
});

// Vue.use(Helpers);
