<template>
    <div>
        <ProfileCanopy></ProfileCanopy>
        <v-container grid-list-md fluid class="grey lighten-3">
            <v-layout row wrap>
                <v-flex lg3 md3 v-if="$vuetify.breakpoint.lgAndUp">
                    {{$route.params.username}}
                </v-flex>
                <v-flex lg6 md9 sm12>
                    <MePo v-for="item in mepoList" :key="item.id" :item="item"></MePo>
                </v-flex>
                <v-flex lg3 md3>
                    <Sidebar></Sidebar>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import ProfileCanopy from "@/components/common/ProfileCanopy.vue";

import Sidebar from "@/components/common/Sidebar.vue";
import MePo from "../components/MePo.vue";
export default {
  components: { ProfileCanopy, Sidebar, MePo },
  created() {
    this.getMepoList();
    // console.log(this.mepoList);
  },
  computed: {
    mepoList() {
      return this.$store.state.mepo.mepoList;
    }
  },
  methods: {
    getMepoList() {
      const where = { user_id: 1 };
      const withProp = ["has_one:user"];
      this.$store.dispatch("mepo/getMepoList", { where, withProp });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
