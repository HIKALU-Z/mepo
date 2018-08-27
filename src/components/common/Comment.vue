<template>
  <transition name="fade" mode="out-in">
    <div v-if="loading" class="loading py-3">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else class="comment">
      <v-layout class="pa-3" row wrap>
        <!--  commennt form -->
        <v-flex xs12>
          <v-textarea v-model="newComment" box label="说出你的故事" clearable ref="commentInput" :height="80" value="" :prepend-inner-icon="'mdi-send'" no-resize @click:prepend-inner="handleCreateComment"></v-textarea>
        </v-flex>

        <!-- comment list -->
        <v-flex xs12 v-for="(item, index) in commentList" :key="`comment${index}`" class="comment-item">
          <v-layout>
            <v-flex xs2>
              <v-avatar :tile="true" :size="64" color="grey lighten-4">
                <img src="../../assets/ddyz.png" alt="avatar">
              </v-avatar>
            </v-flex>

            <v-flex xs10>
              <!-- 评论布局 -->
              <v-layout row wrap>
                <v-flex xs12>
                  <h3>{{item.$user ? (item.$user.username||'已注销') :'-' }}</h3>
                  <span v-if="item.reply_to">回复了。。。{{item.reply_to | replyTarget(commentList)}}</span>
                </v-flex>
                <v-flex xs12>
                  {{item.content}}
                </v-flex>

                <v-flex xs12 class="toolbar" v-if="!comment.reply_to">
                  <v-layout justify-end>
                    <span v-if="item.reply_to" class="toolbar-item" @click="handleViewConversation(item.id)">
                      <v-icon :size="16 ">mdi-forum</v-icon>
                      查看对话
                    </span>
                    <span class="toolbar-item" @click="handleReplay(item.id)">
                      <v-icon :size="16 ">mdi-reply</v-icon>
                      回复
                    </span>
                    <span class="toolbar-item ">
                      <v-icon :size="16 ">mdi-thumb-up</v-icon>
                      点赞
                    </span>
                  </v-layout>
                </v-flex>
                <!-- {{item}} -->
                <v-flex xs12 v-if="item.id == comment.reply_to">
                  <v-textarea v-model="reply" box label="愉快的聊天" type="text" no-resize :height="80" :prepend-inner-icon="'mdi-send'" :append-icon="'mdi-close-circle'" @click:prepend-inner="handleCreateComment" @click:append="handleCancleReply"></v-textarea>
                </v-flex>

              </v-layout>

            </v-flex>
          </v-layout>
          <v-divider :inset="false " class="my-1 " v-if="index+1<listLength"></v-divider>
        </v-flex>

      </v-layout>
      <ConversationDialog v-if="conversationVisible"></ConversationDialog>
    </div>
  </transition>
</template>

<script>
import api from "../../api";
import session from "../../utils/session";
import ConversationDialog from "./ConversationDialog.vue";
export default {
  components: {
    ConversationDialog
  },
  props: {
    mepoId: {
      type: Number,
      default: () => {
        return 1;
      }
    }
  },
  data() {
    return {
      loading: true,
      comment: {
        content: null,
        user_id: session.his_id(),
        mepo_id: this.mepoId,
        reply_to: null
      },
      newComment: "", //新的评论
      reply: "", // 回复评论
      commentList: [], // 评论列表
      conversationVisible: false // 是否显示对话线
    };
  },
  computed: {
    listLength() {
      return this.commentList.length;
    }
  },
  created() {
    this.getCommentList();
  },
  watch: {
    reply(newValue) {
      this.comment.content = newValue;
    },
    newComment(newValue) {
      this.comment.content = newValue;
    }
  },
  methods: {
    // 获取评论列表
    getCommentList() {
      this.loading = true;
      api("comment/read", {
        where: {
          mepo_id: this.mepoId
        },
        with: [
          {
            relation: "belongs_to",
            model: "user"
          }
        ]
        // key_by: "reply_to"
      }).then(r => {
        // console.log(r.data);
        this.commentList = r.data || [];
        this.loading = false;
      });
    },
    // 初始化评论表单
    initCommentForm() {
      this.newComment = ""; // 清空新建回复
      this.reply = ""; // 清空回复
      // 清空comment 对象
      this.comment = {
        content: null,
        user_id: session.his_id(),
        mepo_id: this.mepoId,
        reply_to: null
      };
      // 让评论框失焦
      this.$refs.commentInput.blur();
    },
    // 侦测创建回复事件
    handleCreateComment() {
      // 如果评论内容为空则退出
      if (!this.comment.content) return;

      api("comment/create", this.comment)
        .then(() => {
          this.initCommentForm();
          // this.commentList.unshift(r.data);
        })
        .then(() => {
          this.getCommentList();
        });
    },
    // 点击回复按钮
    handleReplay(id) {
      // console.log(id);
      this.comment.reply_to = id;
    },
    // 取消回复
    handleCancleReply() {
      this.comment.reply_to = "";
      this.reply = "";
    },
    // 查看会话
    handleViewConversation() {
      this.conversationVisible = true;
    }
  },
  filters: {
    replyTarget: function(value, list) {
      if (!value) return "已注销";
      let result = "";
      // console.log(list);
      // return false;
      let arr = list.find(item => {
        return item.id == value;
      });
      result = arr.$user && arr.$user.username;
      return result;
    }
  }
};
</script>

<style lang='scss' scoped>
.comment-item {
  &:hover {
    background-color: rgba($color: #c4d7f5, $alpha: 0.1);
  }
}
.toolbar {
  .toolbar-item {
    display: inline-block;
    padding: 0 8px;
    color: #aaaaaa;
    cursor: pointer;
    &:hover {
      i {
        color: #2c50f1;
      }
      color: #2c50f1;
    }
  }
}
</style>
