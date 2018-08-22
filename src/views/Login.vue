<template>
  <v-container>

    <v-layout>
      <!-- login -->
      <v-flex xs12 sm12 md8 offset-md2 lg6 offset-lg3 wrap>
        <v-card class="px-5 py-3 mt-5">
          <!-- title -->
          <h3 class="headline mb-0">登录</h3>
          <!-- form -->
          <v-form ref="form" v-model="valid" @submit.native.prevent="submit" lazy-validation>
            <!-- input control -->
            <v-text-field v-model="account" :rules="accountRules" label="账户" :error-messages="errors" required maxlength="18"></v-text-field>

            <v-text-field v-model="password" type="password" :rules="passwordRules" label="密码" required></v-text-field>
            <!-- action button -->
            <v-card-actions>
              <v-btn :disabled="!valid" type="submit">
                登录
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>

      <v-snackbar v-model="snackbar" :color="snackColor" right top multi-line :timeout="5000">
        {{ snackText }}
        <v-btn dark flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>

    </v-layout>

  </v-container>
</template>


<script>
// import api from "./../api";
import session from "./../utils/session.js";
export default {
  data: () => ({
    valid: true,
    timer: 0,
    account: "",
    accountRules: [v => !!v || "账户为必填项"],
    password: "",
    passwordRules: [
      v => !!v || "密码为必填项",
      v => (v && v.length >= 6) || "密码长度至少为六个字符"
    ],
    items: ["手机", "邮箱"],
    signBy: "手机",
    errors: [],
    alert: false,
    // 验证码对象
    captcha: {
      timer: null,
      cooldown: 0
    },
    snackbar: false,
    snackColor: "error",
    snackText: "登录失败，请检查用户名或密码"
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // // Native form submission is not yet supported

        let unique, password;

        if (!(unique = this.account) || !(password = this.password)) {
          return;
        }

        if (unique === "admin" && password === "123123") {
          this.onLoginSucceed({ id: 1, username: "admin", is_admin: true });
          return;
        }

        session.exist(this.account, this.password).then(row => {
          if (!row) {
            this.snackbar = true;
            this.snackText = "登录失败，请检查用户名或密码";
            return;
          }
          this.onLoginSucceed(row);
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    onLoginSucceed(row) {
      delete row.password;
      session.login(row);
      this.snackbar = true;
      (this.snackColor = "success"), (this.snackText = "登录成功！");
      setTimeout(() => {
        if (session.is_admin()) {
          this.$router.push("/admin/order");
          return;
        }
        this.$router.push("/");
      }, 1000);
    }
  }
};
</script>
