<template>
  <v-app>
    <Nav/>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <Footer/>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top right multi-line :timeout="3000">
      {{ snackbar.text }}
      <v-btn dark flat @click="handleSnackBarClose">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Nav,
    Footer
  },
  methods: {
    handleSnackBarClose() {
      this.$store.dispatch("hideSnackBar");
    }
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
