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
      <!-- 按钮部分 -->
      <v-card-actions>
        <!-- 转发 -->
        <v-btn flat @click="handleOpenRemepoDialog">
          <v-icon color="teal" size="28">
            mdi-twitter-retweet
          </v-icon>
        </v-btn>
        <!-- 点赞 -->
        <v-btn flat @click="handleClickLike(item.id)">
          <v-icon v-if="wasLiked(item.id,item.$user.id)" left color="red">
            mdi-heart
          </v-icon>
          <v-icon v-else left color="teal">
            mdi-heart-outline
          </v-icon>

          <!-- {{item.$belongsToUsers ? item.$belongsToUsers.length : ''}} -->
          <span v-if="likedCount>0"> {{ likedCount }}</span>

        </v-btn>
        <!-- 评论 -->
        <v-btn flat @click="handleShowComment">
          <v-icon color="teal">
            mdi-comment-processing-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
      <Comment v-if="commentVisible" :mepoId="item.id"></Comment>
    </v-card>
    {{item.$belongsToUsers}}
    <RemepoDialog v-if="remepoDialog" :dialog.sync="remepoDialog" :remepoFrom="item.id">
    </RemepoDialog>
  </div>

</template>

<script>
import Comment from "./common/Comment.vue";
import session from "../utils/session";
import RemepoDialog from "./common/RemepoDialog.vue";
import api from "../api";

export default {
  components: { Comment, RemepoDialog },
  props: {
    item: { default: {} }
  },
  created() {
    this.$store.dispatch("like/getLikedList", { self_id: this.user_id });
    this.getLikeCount(this.item.id);
  },
  data() {
    return {
      dialog: false,
      remepoDialog: false,
      commentVisible: false,
      loading: true,
      user_id: session.his_id(),
      like: false,
      likedCount: ""
    };
  },
  computed: {
    mepoList() {
      return this.$store.state.mepo.mepoList;
    },
    likedList() {
      return this.$store.state.like.list;
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
    /**
     * 点赞按钮点击事件
     * @param id 所点击 mepo id
     * - 如果该 mepo 尚未记录进多对多的表格中，那么执行绑定事件
     * - 否则执行解绑事件
     * - 执行完bind 或者 unbind 事件之后更新 user 下的 like 列表
     */
    handleClickLike(id) {
      let wasLiked = this.wasLiked(id);
      if (wasLiked) {
        api("mepo/unbind", {
          model: "user",
          glue: {
            [this.user_id]: [id]
          }
        }).then(() => {
          this.$store.dispatch("like/getLikedList", { self_id: this.user_id });
          this.getLikeCount(id);
        });
      } else {
        api("mepo/bind", {
          model: "user",
          glue: {
            [this.user_id]: [id]
          }
        }).then(() => {
          this.$store.dispatch("like/getLikedList", { self_id: this.user_id });
          this.getLikeCount(id);
        });
      }
    },
    // 判断 mepo 是否已被点赞
    wasLiked(mepo_id) {
      // console.log(this.likedList)
      if (!this.likedList) {
        return false;
      }
      return !!this.likedList.find(item => {
        return item.id == mepo_id;
      });
    },
    getLikeCount(mepo_id) {
      api("_bind__mepo_user/read", {
        where: {
          mepo_id,
          user_id: this.user_id
        }
      }).then(r => {
        if (!r.total) {
          this.likedCount = "";
        } else {
          this.likedCount = r.total;
        }
      });
    }
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
