<template>
  <div>
    <div class="text-xs-center">
      <v-dialog v-model="visible" max-width="640">
        <v-card>
          <v-card-title class="headline">转给这个世界？</v-card-title>

          <v-card-text>
            <v-textarea v-model="remepoContent" box label="说说你的观点" clearable ref="commentInput" :height="80" value="" no-resize></v-textarea>
            <div>
              {{this.oldMepo.content}}
            </div>
          </v-card-text>

          <v-card-text>

          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="handleCloseDialog">
              不了，我在想想
            </v-btn>

            <v-btn color="blue" dark @click="handleRemepo">
              啵一下
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import session from "../../utils/session";
export default {
  props: {
    dialog: Boolean,
    remepoFrom: Number
  },
  data() {
    return {
      remepoContent: "",
      oldMepo: {}
    };
  },
  mounted() {
    this.user_id = session.his_id();
    this.getMepoInfo();
  },
  computed: {
    visible: {
      get: function() {
        return this.dialog;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:dialog", newValue);
        // return;
      }
    }
  },
  methods: {
    getMepoInfo() {
      api("mepo/find", { id: this.remepoFrom }).then(r => {
        this.oldMepo = r.data;
      });
    },
    handleCloseDialog() {
      this.$emit("update:dialog", false);
    },
    // 转发推特
    handleRemepo() {
      const remepo = {
        content: this.remepoContent || "转发米啵",
        pic: this.oldMepo.pic,
        user_id: this.user_id,
        remepo_from: this.oldMepo.id
      };
      api("mepo/create", remepo).then(() => {
        this.$store.dispatch("mepo/getMepoList");
        this.$emit("update:dialog", false);
      });
    }
  }
};
</script>

<style scoped>
</style>
