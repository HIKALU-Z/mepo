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
// import api from "./../api";
export default {
  components: { MePoInput, MePo },
  created() {
    this.getMePoList();
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 获取 mepo 列表
     */
    getMePoList() {
      this.$store.dispatch("mepo/getMepoList");
    }
  },
  computed: {
    // mepolist
    mepoList() {
      return this.$store.state.mepo.mepoList;
    }
  }
};
</script>



<style scoped>
</style>
