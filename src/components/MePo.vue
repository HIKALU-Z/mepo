<template>
    <v-card class="mb-2">
        <div class="pa-3">
            <v-layout row wrap>
                <v-flex xs1>
                    <v-avatar :size="40" color="grey lighten-4">
                        <img src="../assets/avatar.jpg" alt="avatar">
                    </v-avatar>
                </v-flex>
                <v-flex xs10 class="pl-2">
                    <h4>HIKALU</h4>
                    <span>{{item.user_id}}</span>
                    <span>123123</span>
                </v-flex>
                <v-flex xs1>
                    <v-btn small icon>
                        <v-icon>
                            mdi-chevron-down
                        </v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs12>
                    {{item.content}}
                </v-flex>
            </v-layout>
        </div>

        <v-card-actions>
            <v-btn flat>
                <v-icon color="teal">
                    mdi-share-outline
                </v-icon>
            </v-btn>
            <v-btn flat>
                <v-icon left color="teal">
                    mdi-heart-outline
                </v-icon>
                123
            </v-btn>
            <v-btn flat>
                <v-icon color="teal">
                    mdi-comment-processing-outline
                </v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  props: {
    item: { default: 1 }
  }
};
</script>

<style scoped>
</style>
