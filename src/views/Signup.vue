<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm12 md8 offset-md2 lg6 offset-lg3 wrap>
        <v-card class="px-5 py-3 mt-5">

          <h3 class="headline mb-0">注册</h3>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-alert :value="alert" type="error" dismissible transition="scale-transition">
              {{signBy}}号为必填项
            </v-alert>
            <!-- input control -->
            <v-text-field v-model="username" :rules="usernameRules" :counter="18" label="用户名" :error-messages="errors" required maxlength="18"></v-text-field>
            <!-- verify code -->
            <v-layout row wrap>

              <v-flex v-if="signBy!='邮箱'" lg9 md9 sm6 xs12>
                <v-text-field v-model="phone" :rules="phoneRules" label="手机号" required></v-text-field>
              </v-flex>
              <v-flex v-else lg9 md9 sm6 xs12>
                <v-text-field v-model="mail" :rules="mailRules" label="邮箱号" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3 lg3 d-flex>
                <v-select :items="items" label="注册方式" placeholder="点此切换" v-model="signBy" @change="handleSignByChange"></v-select>
              </v-flex>
              <v-flex lg9 sm6 md6 xs12>
                <v-text-field v-model="verifyCode" :rules="verifyCodeRules" label="验证码" required></v-text-field>
              </v-flex>
              <v-flex lg3 sm6 md6 xs12>
                <v-btn block @click="handleGetVerifyCode" :disabled="captcha.cooldown != 0">
                  <span v-if="captcha.cooldown">{{captcha.cooldown}}</span>
                  <span v-else>发送验证码</span>
                </v-btn>
              </v-flex>
            </v-layout>

            <v-text-field v-model="password" type="password" :rules="passwordRules" label="密码" required></v-text-field>
            <!-- action button -->
            <v-card-actions>
              <v-btn :disabled="!valid" @click="submit">
                注册
              </v-btn>
              <v-btn @click="clear">清空</v-btn>
            </v-card-actions>

          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import api from "./../api";
import { clearTimeout, setTimeout } from "timers";

export default {
  data: () => ({
    valid: true,
    timer: 0,
    username: "",
    usernameRules: [
      v => !!v || "用户名为必填项",
      v => (v && v.length <= 10) || "用户名不得超过十个字"
    ],
    mail: "",
    mailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    phone: "",
    phoneRules: [
      v => !!v || "手机号为必填项",
      v => (v && v.length == 11) || "请输入合法的手机号码"
    ],
    password: "",
    passwordRules: [
      v => !!v || "密码为必填项",
      v => (v && v.length >= 6) || "密码长度至少为六个字符"
    ],
    verifyCode: "",
    verifyCodeRules: [
      v => !!v || "验证码为必填项",
      v => (v && v.length == 6) || "密码长度为六个字符"
    ],
    items: ["手机", "邮箱"],
    signBy: "手机",
    errors: [],
    alert: false,
    // 验证码对象
    captcha: {
      timer: null,
      cooldown: 0
    }
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // // Native form submission is not yet supported
        api("user/create", {
          username: this.username,
          mail: this.mail,
          phone: this.phone,
          password: this.password
        }).then(r => {
          if (r.success) {
            this.$router.push("/");
          }
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    handleSignByChange(item) {
      this.signBy = item;
    },
    // 获取验证码
    handleGetVerifyCode() {
      // 如果仍然在计时中，那么退出。否则继续
      if (this.captcha.cooldown) return;
      // 如果未填写手机号，那么退出，否则继续
      if (!this.phone) {
        this.alert = true;
        return;
      }

      let action, byMail;
      // 默认验证方式为手机
      action = "sms";
      // 如果使用邮箱验证，那么切换验证 api
      if ((byMail = this.signup_by == "mail")) action = "mail";
      // 不论选何种验证方式,验证的号码都为必填项
      if ((byMail && !this.mail) || (!byMail && !this.phone)) {
        this.alert = true;
        return;
      }

      this.captcha.cooldown = 60;

      this.captcha.timer = setInterval(() => {
        if (this.captcha.cooldown == 0) {
          clearInterval(this.captcha.timer);
          return;
        }
        // this.captcha.cooldown = this.captcha.cooldown - 1;
        this.$set(this.captcha, "cooldown", this.captcha.cooldown - 1);
      }, 1000);

      api(`captcha/${action}`, {
        phone: this.phone,
        mail: this.mail
      }).then(r => {
        this.code = atob(r.data.result);
      });
    }
  },
  watch: {
    username() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (!this.username) {
          return;
        }
        api("user/read", { where: { username: this.username } })
          .then(r => {
            return r.data;
          })
          .then(hasUser => {
            this.errors = hasUser ? ["用户名已存在"] : [];
          });
      }, 700);
    }
  }
};
</script>
