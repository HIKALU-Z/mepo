<template>
    <v-layout column wrap>
        <v-flex>
            <v-card class="text-xs-center">
                <v-card-media src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" height="120px"></v-card-media>

                <v-card-title primary-title class="text-xs-center">
                    <div style="width:100%">
                        <h3 class="headline mb-0">HIKALU</h3>
                        <div>若你以柔情封起信封</div>
                    </div>
                </v-card-title>
                <hr class="card-divider">
                <div class="profile-info">
                    <ul>
                        <li>
                            <h4>关注</h4>
                            <span class="number">331</span>
                        </li>
                        <li>
                            <h4>粉丝</h4>
                            <span class="number">123</span>
                        </li>
                        <li>
                            <h4>啵文</h4>
                            <span class="number">1024</span>
                        </li>
                    </ul>
                </div>
            </v-card>
        </v-flex>
        <v-flex>
            <div class="card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quo harum. Impedit, est? Repellat animi distinctio incidunt, nam iure eveniet totam aperiam quas ipsum sequi corporis facere blanditiis. Iusto, maiores?
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  background: white;
  padding: 10px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}
.card-divider {
  border: 0;
  border-bottom: 1px solid #e8eaec;
}
.profile-info {
  display: block;
  ul {
    -webkit-padding-start: 0;
  }
  li {
    width: 33.33%;
    padding: 10px 0;
    display: inline-block;
    position: relative;
    cursor: pointer;
    // border-right: 1px solid #cccccc;
    &:hover {
      color: blueviolet;
      font-weight: 500;
    }
    &::after {
      content: "|";
      position: absolute;
      height: 20px;
      color: #e8eaec;
      font-size: 3.2rem;
      font-weight: 100;
      top: -7px;
      left: 95px;
    }
    &:last-child {
      border: none;
      &::after {
        display: none;
      }
    }
    .number {
      color: blueviolet;
    }
  }
}
</style>
