<template>
  <v-container fluid grid-list-md class="grey lighten-4">
    <!-- <v-slide-y-transition mode="out-in"> -->
    <v-layout row wrap>
      <!-- personal info -->
      <v-flex xs3 v-if="$vuetify.breakpoint.lgAndUp">
        <DashBoard></DashBoard>
      </v-flex>
      <!-- main content -->
      <v-flex xs12 md9 lg6>
        <TimeLine></TimeLine>
      </v-flex>
      <!-- side bar -->
      <v-flex xs12 md3>
        <Sidebar/>
      </v-flex>
    </v-layout>
    <!-- </v-slide-y-transition> -->
  </v-container>
</template>

<script>
import TimeLine from "@/components/TimeLine.vue";
import Sidebar from "@/components/common/Sidebar.vue";
import DashBoard from "@/components/common/DashBoard.vue";
export default {
  components: {
    DashBoard,
    TimeLine,
    Sidebar
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
