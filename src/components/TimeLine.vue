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
import api from "./../api";
export default {
  components: { MePoInput, MePo },
  mounted() {
    this.getMePoList();
  },
  data() {
    return {
      mepoList: []
    };
  },
  methods: {
    // methods
    getMePoList() {
      api("mepo/read").then(r => {
        this.mepoList = r.data || [];
      });
    }
  }
};
</script>



<style scoped>
</style>
