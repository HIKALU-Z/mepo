<template>
    <v-container fluid grid-list-md class="grey lighten-3" style="min-height:75vh">
        <v-layout>
            <v-flex xs6 lg3>
                <DashBoard></DashBoard>
            </v-flex>
            <v-flex xs6 lg6>
                <router-view></router-view>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Dashboard from "./../../components/setting/DashBoard";
export default {
  components: { Dashboard }
};
</script>

<style lang="scss" scoped>
</style>
