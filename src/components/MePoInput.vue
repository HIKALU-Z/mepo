<template>
    <v-card class="mb-2">
        <!-- <h2>Any Thing Intresting?</h2> -->
        <div>
            <v-textarea counter maxlength="140" outline label="和世界啵一下" single-line v-model="mepo.content">
            </v-textarea>
        </div>
        <!-- {{mepo.content}} -->
        <v-layout>
            <!-- <v-flex> -->
            <v-btn icon>
                <v-icon color="teal lighten-1">
                    face
                </v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon color="teal lighten-1">
                    image
                </v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon color="teal lighten-1">
                    mdi-video
                </v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon color="teal lighten-1">
                    mdi-google-analytics
                </v-icon>
            </v-btn>
            <!-- </v-flex> -->
            <v-spacer></v-spacer>

            <v-btn round dark color="blue" class="mr-3" @click="handleSubmit">
                啵一个
            </v-btn>
            <!-- </v-flex> -->
        </v-layout>

    </v-card>
</template>



<script>
// import api from "./../api";
import session from "./../utils/session";
export default {
  data() {
    return {
      mepo: {
        content: "",
        user_id: null
      }
    };
  },
  mounted() {
    this.mepo.user_id = session.his_id();
  },
  methods: {
    /**
     * 创建一条 mepo
     */
    handleSubmit() {
      this.$store.dispatch("mepo/createMepo", { mepo: this.mepo });
    }
  }
};
</script>


<style scoped>
</style>
