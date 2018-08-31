<template>
    <v-toolbar app color="blue darken-3" dark fixed>
        <v-icon>mdi-twitch</v-icon>
        <v-toolbar-title v-text="title" style="width:100px">

        </v-toolbar-title>

        <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat exact-active-class to="/">
                <v-icon left>
                    home
                </v-icon>
                首页
            </v-btn>
            <v-btn flat>
                <v-icon left>
                    mail
                </v-icon>
                私信
            </v-btn>
            <v-btn flat @click="handleSwitchNotificationModal">
                <v-badge overlap color="orange" class="mr-2">
                    <span slot="badge" dark small v-if="notificationList.length>0">{{notificationList.length}}</span>
                    <v-icon>
                        notifications
                    </v-icon>
                </v-badge>
                通知
            </v-btn>

            <!-- notifications -->
            <div class="noti-container" v-if="notiModal && notificationList.length>0" v-click-outside="handleHideNotiModal">
                <div class="triangle"></div>
                <v-card class="noti-card" elevation-5>
                    <a v-for="(noti, index) in notificationList" :key="index" @click="handleReadNotification(noti.id)">
                        {{noti.params[0].name}}
                    </a>
                </v-card>
            </div>

            <v-menu offset-y bottom open-on-hover>
                <v-btn flat slot="activator">
                    <v-avatar :tile="tile" :size="36" color="grey lighten-4">
                        <img src="../assets/avatar.jpg" alt="avatar">
                    </v-avatar>
                </v-btn>
                <v-list>
                    <template v-for="(item, index) in items">
                        <v-divider v-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                        <v-list-tile v-else :key="index" @click="handleMenuClick(item)">
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                    </template>

                </v-list>
            </v-menu>

        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import session from "../utils/session";
import vClickOutside from "v-click-outside";
export default {
  data: () => {
    return {
      items: [
        {
          title: "个人首页",
          path: "hikalu-z"
        },
        { title: "设置中心", path: "setting/account" },
        { title: "帮助中心" },
        { divider: true, insert: true },
        { title: "登出", path: "login", actions: "logout" }
      ],
      title: "MePo",
      tile: false,
      notiModal: false,
      user_id: session.his_id()
    };
  },
  created() {
    this.getNotificationList();
  },
  computed: {
    notificationList() {
      return this.$store.state.notification.list;
    }
  },
  methods: {
    // 获取通知列表
    getNotificationList() {
      this.$store.dispatch("notification/getNotificationList", {
        self_id: session.his_id()
      });
    },
    // 监听菜单点击事件
    handleMenuClick(params) {
      // 如果有特殊行为，执行特殊行为
      if (params.actions && params.actions === "logout") {
        session.logout("#/login");
      }
      // 如果指定了路由路径，那么路由跳转
      if (params.path) {
        this.$router.push(`/${params.path}`);
      }
    },
    // 切换显示通知
    handleSwitchNotificationModal() {
      this.notiModal = !this.notiModal;
    },
    // 隐藏通知
    handleHideNotiModal() {
      this.notiModal = false;
    },
    // 读取通知
    handleReadNotification(id) {
      console.log(id);
      this.$store.dispatch("notification/updateNotification", {
        id: id,
        status: "read",
        self_id: this.user_id
      });
    }
  },
  directives: { clickOutside: vClickOutside.directive }
};
</script>

<style lang="scss" scoped>
.noti-container {
  position: relative;
  .triangle {
    background: #fff;
    border: 1px solid #e6e6e6;
    -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
    position: absolute;
    height: 14px;
    left: -40px;
    top: 60px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    width: 20px;
    z-index: -1;
  }
}
.noti-card {
  background-color: white;
  width: 300px;
  max-height: 480px;
  overflow-y: auto;
  position: absolute;
  top: 65px;
  right: 0;
  word-wrap: normal;
  &:last-child {
    border-bottom: none;
  }
  a {
    padding: 10px 20px;
    text-decoration: none;
    color: teal;
    display: block;
    border-bottom: 1px solid #f0f0f0;
    &:hover {
      background-color: rgba($color: #86a1f8, $alpha: 0.2);
    }
  }
}
</style>
