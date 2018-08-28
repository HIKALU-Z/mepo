<template>
  <v-container fluid grid-list-md class="grey lighten-4">
    <v-layout row wrap>
      <!-- personal info -->
      <v-flex xs3 v-if="$vuetify.breakpoint.lgAndUp">
        <DashBoard></DashBoard>
      </v-flex>
      <!-- main content -->
      <v-flex xs12 md9 lg6>
        <!-- <TimeLine></TimeLine> -->
        <MePoInput></MePoInput>
        <MePo v-for="item in mepoList" :key="item.id" :item="item"></MePo>
      </v-flex>
      <!-- side bar -->
      <v-flex xs12 md3>
        <Sidebar/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Sidebar from "@/components/common/Sidebar.vue";
import DashBoard from "@/components/common/DashBoard.vue";
import MePo from "../components/MePo.vue";
import MePoInput from "../components/MePoInput.vue";
import session from "../utils/session";
export default {
  components: {
    DashBoard,
    MePo,
    MePoInput,
    Sidebar
  },
  created() {
    this.user_id = session.his_id();
    this.getFollowedList().then(() => {
      this.getMepoList();
    });
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 获取 mepo 列表
     */
    getMepoList() {
      const where = [["user_id", "in", this.pluck(this.followedList, "id")]];
      const withProp = [
        { relation: "has_one", model: "user" },
        { relation: "belongs_to_many", model: "user", as: "belongsToUsers" }
      ];
      // console.log(where);
      this.$store.dispatch("mepo/getMepoList", {
        where,
        withProp
      });
    },
    // 抽取数组中的键值
    pluck(arr, key) {
      const result = [];

      arr.forEach(it => {
        result.push(it[key]);
      });

      return result;
    },
    getFollowedList() {
      return this.$store.dispatch("follow/getFollowedList", {
        self_id: this.user_id
      });
    }
  },
  computed: {
    followedList() {
      return this.$store.state.follow.list;
    },
    // mepolist
    mepoList() {
      return this.$store.state.mepo.mepoList;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
