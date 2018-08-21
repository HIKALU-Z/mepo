<template>
    <v-layout column wrap>
        <v-flex>
            <div class="card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quo harum. Impedit, est? Repellat animi distinctio incidunt, nam iure eveniet totam aperiam quas ipsum sequi corporis facere blanditiis. Iusto, maiores?
            </div>
        </v-flex>
        <v-flex>
            <v-card>
                <v-list>
                    <v-list-tile v-for="(item, index) in items" :key="index" @click="handleMenuClick(item.path)">
                        <v-list-tile-action>
                            <v-icon>
                                {{ item.action }}
                            </v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-spacer>
                            <v-icon>
                                mdi-chevron-right
                            </v-icon>
                        </v-spacer>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          action: "mdi-account",
          title: "账户信息",
          path: "/setting/account"
        },
        {
          action: "mdi-security-account",
          title: "隐私安全",
          path: "/setting/security"
        },
        {
          action: "mdi-lock-question",
          title: "修改密码",
          path: "/setting/password"
        },
        {
          action: "mdi-bell",
          title: "消息通知",
          path: "/setting/notifications_timeline"
        },
        {
          action: "mdi-chart-bar",
          title: "数据分析",
          path: "/setting/analysis"
        }
      ]
    };
  },

  methods: {
    handleMenuClick(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
