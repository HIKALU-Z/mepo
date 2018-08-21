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
            <v-btn flat>
                <v-icon left>
                    mdi-bell
                </v-icon>
                通知
            </v-btn>
            <v-menu offset-y bottom open-on-hover>
                <v-btn flat slot="activator">
                    <v-avatar :tile="tile" :size="36" color="grey lighten-4">
                        <img src="../assets/avatar.jpg" alt="avatar">
                    </v-avatar>
                </v-btn>
                <v-list>
                    <template v-for="(item, index) in items">
                        <v-divider v-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                        <v-list-tile v-else :key="index" @click="handleMenuClick(item.path)">
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                    </template>

                </v-list>
            </v-menu>

        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
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
        { title: "登出", path: "login" }
      ],
      title: "MePo",
      tile: false
    };
  },
  methods: {
    handleMenuClick(params) {
      this.$router.push(`/${params}`);
    }
  }
};
</script>

<style scoped>
</style>
