<template>
    <div class="mepo">
        <v-card class="mb-2 mepo-card">
            <div class="pa-3">
                <v-layout row wrap>
                    <v-flex xs1>
                        <v-avatar :size="40" color="grey lighten-4">
                            <img src="../assets/avatar.jpg" alt="avatar">
                        </v-avatar>
                    </v-flex>
                    <v-flex xs10 class="pl-2">
                        <h4>{{item.$user ? item.$user.username : '已注销'}}</h4>
                        <span>{{item.user_id}}</span>
                        <span>123123</span>
                    </v-flex>
                    <v-flex xs1>
                        <v-btn small icon>
                            <v-icon>
                                mdi-chevron-down
                            </v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12>
                        {{item.content}}
                    </v-flex>
                    <v-flex v-if="item.remepo_from" xs12 class="remepo">
                        {{item.remepo_from | reMepoContent(mepoList)}}
                    </v-flex>
                </v-layout>
            </div>

            <v-card-actions>
                <!-- <v-btn color="primary" dark>
                    Open Dialog
                </v-btn> -->
                <v-btn flat @click="handleOpenRemepoDialog">
                    <v-icon color="teal" size="28">
                        mdi-twitter-retweet
                    </v-icon>
                </v-btn>
                <v-btn flat @click="handleLikeClick">
                    <v-icon left color="teal">
                        mdi-heart-outline
                    </v-icon>
                    123
                </v-btn>
                <v-btn flat @click="handleShowComment">
                    <v-icon color="teal">
                        mdi-comment-processing-outline
                    </v-icon>
                </v-btn>
            </v-card-actions>
            <Comment v-if="commentVisible" :mepoId="item.id"></Comment>
        </v-card>
        <!-- <div class="text-xs-center">
            <v-dialog v-model="dialog" max-width="640">
                <v-card>
                    <v-card-title class="headline">{{item.$user.username}}</v-card-title>

                    <v-card-text>
                        {{item.content}}
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                            Disagree
                        </v-btn>

                        <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                            Agree
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div> -->
        <RemepoDialog v-if="remepoDialog" :dialog.sync="remepoDialog" :remepoFrom="item.id">
        </RemepoDialog>
    </div>

</template>

<script>
import Comment from "./common/Comment.vue";
// import api from "../api";
import session from "../utils/session";
import RemepoDialog from "./common/RemepoDialog.vue";

export default {
  components: { Comment, RemepoDialog },
  props: {
    item: { default: {} }
  },
  data() {
    return {
      dialog: false,
      remepoDialog: false,
      commentVisible: false,
      loading: true,
      user_id: session.his_id()
    };
  },
  computed: {
    mepoList() {
      return this.$store.state.mepo.mepoList;
    }
  },
  methods: {
    handleMepoClick() {
      this.dialog = true;
    },
    // 显示评论
    handleShowComment() {
      this.commentVisible = !this.commentVisible;
    },
    // 打开转发弹框
    handleOpenRemepoDialog() {
      this.remepoDialog = true;
    },
    // 触发点赞事件
    handleLikeClick() {}
  },
  filters: {
    reMepoContent(value, list) {
      let result = list.find(item => {
        return item.id == value;
      });
      return (result && result.content) || "-";
    }
  }
};
</script>

<style lang='scss' scoped>
.loading {
  text-align: center;
}
.mepo {
  //   cursor: pointer;
  //   height: 180px;
  .mepo-card {
    // height: ;
    transition: all 0.7s ease-in-out;
  }
}
.remepo {
  background-color: #f2f2f5;
}
.comment {
  background-color: #f2f2f5;
}
</style>
