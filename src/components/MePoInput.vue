<template>
    <form @submit.prevent="handleSubmit">
        <v-card class="mb-2">
            <!-- <h2>Any Thing Intresting?</h2> -->
            <div>
                <v-textarea counter maxlength="140" outline label="和世界啵一下" single-line v-model="mepo.content">
                </v-textarea>
            </div>

            <v-layout>
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
                <v-spacer></v-spacer>
                <v-btn round dark color="blue" class="mr-3" type="submit">
                    啵一个
                </v-btn>
                <!-- </v-flex> -->
            </v-layout>
        </v-card>
    </form>
</template>

<script>
// import api from "./../api";
import session from "./../utils/session";
export default {
  data() {
    return {};
  },
  mounted() {
    this.mepo.user_id = session.his_id();
  },
  methods: {
    /**
     * 创建一条 mepo
     */
    handleSubmit() {
      if (!this.mepo.user_id) {
        this.$store.dispatch("showSnackBar", {
          text: `尚未登录，请先登录再和世界啵一下吧~`,
          color: "success"
        });
        return;
      }
      this.$store.dispatch("mepo/createMepo", { mepo: this.mepo });
      //   this.mepo.content = "";
    }
  },
  computed: {
    mepo() {
      return this.$store.state.mepo.mepo;
    }
  }
};
</script>


<style scoped>
</style>
