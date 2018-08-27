<template>
  <!-- <v-container fluid grid-list-lg app> -->
  <v-layout column>
    <v-flex xs12 lg12>
      <v-card>
        <v-card-title primary-title>
          <h4>
            推荐关注
          </h4>
        </v-card-title>

        <v-list two-line>
          <template v-for="(item, index) in recommendationList">
            <v-divider v-if="index!=0" :inset="true" :key="`d${index}`"></v-divider>

            <v-list-tile :key="item.title" avatar @click="handleListClick">
              <v-list-tile-avatar>
                <img v-if="item.avatar_url" :src="item.avatar_url" alt="用户头像">
                <img v-else src="../../assets/ddyz.png" alt="默认头像">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-if="item.nickname" v-text="item.nickname"></v-list-tile-title>
                <!-- <v-list-tile-title v-else> -->
                <h4 class="mt-1" v-if="item.nickname" v-text="item.nickname"></h4>
                <h4 class="mt-1" v-else v-text="item.username"></h4>
                <!-- </v-list-tile-title> -->

                <!-- actions -->
                <v-list-tile-action>
                  <v-btn v-if="hasFollowed(item.id)" round small dark class="primary ml-2" @click="handleUnFollow(item.id)">
                    取消关注
                  </v-btn>
                  <v-btn v-else round small dark class="cyan ml-2" @click="handleFollow(item.id)">
                    关注
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile-content>

            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 lg12>
      <v-card>
        <v-card-media src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535357618492&di=847b27311e6400a17a651a5dd0b625fd&imgtype=0&src=http%3A%2F%2Fimglf1.ph.126.net%2FRNvHEbXyQ8WSjCpzXoW6yg%3D%3D%2F6619117173816208528.jpg" height="200px"></v-card-media>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  <!-- </v-container> -->

</template>

<script>
import api from "../../api";
import session from "../../utils/session";
export default {
  // created 生命周期钩子
  created() {
    this.user_id = session.his_id();
    if (this.user_id) {
      this.$store.dispatch("recommend/getRecommendationList", {
        self_id: this.user_id
      });
      this.getFollowedList();
    }
  },
  data() {
    return {
      user_id: null
    };
  },
  methods: {
    handleListClick() {
      //TODO: 点击list跳转至相关用户的界面
    },
    // 点击关注按钮触发关注事件
    handleFollow(id) {
      if (!this.user_id) {
        this.$store.dispatch("showSnackBar", { text: "尚未登录，请先登录" });
        return;
      }

      api("user/bind", {
        model: "user",
        glue: {
          [this.user_id]: id
        }
      }).then(() => {
        this.getFollowedList();
      });
    },
    // 点击关注按钮触发解绑事件
    handleUnFollow(id) {
      api("user/unbind", {
        model: "user",
        glue: {
          [this.user_id]: id
        }
      }).then(() => {
        this.getFollowedList();
      });
    },
    // 获取关注列表
    getFollowedList() {
      return this.$store.dispatch("follow/getFollowedList", {
        self_id: this.user_id
      });
    },
    getTimeLine() {},
    /**
     * 判断是否已关注
     * @param id {Number} 对象 id
     */
    hasFollowed(id) {
      //   console.log(this.followedList);
      if (!this.followedList) {
        return false;
      }
      return !!this.followedList.find(item => {
        return item.id == id;
      });
    }
  },
  computed: {
    recommendationList() {
      return this.$store.state.recommend.list;
    },
    followedList() {
      return this.$store.state.follow.list;
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  border: 1px solid #7286a5;
  box-shadow: 0 2px 3px 2px grey;
  box-sizing: border-box;
  background-color: white;
  padding: 5px 20px; /* 50/50 on both sides */
  margin: 0 auto; /* center container in the middle of the body*/
}

img {
  width: 100%;
  border: 1px solid #7286a5;
  box-sizing: border-box;
}

.description {
  width: 100%;
  border: 1px solid #7286a5;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0 10px;
  margin: 5px 0;
}

p {
  text-align: justify;
  font-weight: lighter;
}

.detail {
  font-weight: bolder;
}

h3 {
  font-size: 1.5em;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

a:link {
  color: #e6005c;
}

a:hover {
  color: #937e30;
}
</style>
