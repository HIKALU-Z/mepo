<template>
    <div>
        <section class="background">
            <v-avatar :size="180" color="grey lighten-4 user-avatar">
                <img src="../../assets/ddyz.png" alt="avatar">
            </v-avatar>
        </section>
        <v-card class="white">
            <v-container fluid class="py-0">
                <v-layout row align-center>
                    <v-flex xs12 md6 offset-md3 sm6 offset-sm3 lg6 offset-lg3>
                        <div>
                            <router-link to="" tag="div" class="py-2 px-3 dib nav-item" v-for="(item, index) in 4" :key="index">
                                <div class="nav-title">正在关注</div>
                                <div class="nav-subtitle">{{index}}</div>
                            </router-link>
                        </div>
                    </v-flex>
                    <v-spacer></v-spacer>

                    <v-btn round class="primary">
                        follow
                    </v-btn>
                    <v-menu>
                        <v-btn slot="activator" icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>

                        <v-list>
                            <v-list-tile v-for="(item, i) in 4" :key="i" @click="some">
                                <v-list-tile-title>{{ i }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>

                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>



<script>
export default {
  methods: {
    some() {}
  }
};
</script>
<style lang="scss" scoped>
.background {
  height: 240px;
  background: teal;
  .user-avatar {
    position: relative;
    top: 160px;
    left: 60px;
    z-index: 1;
    img {
      border: 5px solid #ffffff;
    }
  }
}

.subnav {
  border-bottom: 1px solid #f0f0f0 !important;
}
.dib {
  display: inline-block;
}
.nav-item {
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: border 0.3s ease-in-out;
  &:hover {
    border-bottom: 3px solid blueviolet;
    .nav-subtitle {
      color: blue;
    }
  }
  div {
    text-align: center;
  }
  .nav-title {
    font-size: 1rem;
    font-weight: 300;
    color: #333;
  }
  .nav-subtitle {
    font-size: 1.3rem;
    font-weight: bold;
  }
}
</style>
