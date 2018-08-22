<template>
  <v-layout column>
    <v-flex>
      <MePoInput></MePoInput>
      <MePo v-for="item in mepoList" :key="item.id" :item="item"></MePo>
    </v-flex>
  </v-layout>
</template>

<script>
import MePoInput from "@/components/MePoInput.vue";
import MePo from "@/components/MePo.vue";
import session from "../utils/session";

export default {
  components: { MePoInput, MePo },
  created() {
    this.user_id = session.his_id();
    this.getFollowedList().then(() => {
      this.getMePoList();
    });
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 获取 mepo 列表
     */
    getMePoList() {
      let where = [["user_id", "in", this.pluck(this.followedList, "id")]];
      // console.log(where);
      this.$store.dispatch("mepo/getMepoList", {
        where: where,
        withProp: ["has_one:user"]
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



<style scoped>
</style>
