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
                    <template v-for="(item, index) in items">
                        <v-subheader v-if="item.header" :key="item.header">
                            {{ item.header }}
                        </v-subheader>

                        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

                        <v-list-tile v-else :key="item.title" avatar @click="handleListClick">
                            <v-list-tile-avatar>
                                <img :src="item.avatar">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-action>
                                    <v-btn round small class="primary">
                                        Follow
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile-content>
                            <!-- <v-list-tile-action>
                                <v-list-tile-action-text>follow</v-list-tile-action-text>
                                <v-icon v-if="selected.indexOf(index) < 0" color="grey lighten-1">
                                    star_border
                                </v-icon>
                                <v-btn small flat icon class="primary">
                                    <v-icon color="yellow darken-2">
                                        star
                                    </v-icon>
                                </v-btn>

                            </v-list-tile-action> -->
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
        <v-flex xs12 lg12>
            <v-card>
                <v-card-media src=" http://static5.uk.businessinsider.com/image/58c55bcbdd0895f2478b4d67-480/christmas-mog-sainsburys.jpg" height="200px"></v-card-media>

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
export default {
  data() {
    return {
      items: [
        // { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ]
    };
  },
  methods: {
    handleListClick() {}
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
