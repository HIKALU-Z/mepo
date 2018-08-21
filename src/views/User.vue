<template>
    <div>
        <ProfileCanopy></ProfileCanopy>
        <v-container grid-list-md fluid class="grey lighten-3">
            <v-layout row wrap>
                <v-flex lg3 md3>
                    {{$route.params.username}}
                </v-flex>
                <v-flex lg6 md6>
                    <TimeLine></TimeLine>
                </v-flex>
                <v-flex lg3 md3>
                    <Sidebar></Sidebar>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import ProfileCanopy from "@/components/common/ProfileCanopy.vue";
import TimeLine from "@/components/TimeLine.vue";
import Sidebar from "@/components/common/Sidebar.vue";
export default {
  components: { ProfileCanopy, TimeLine, Sidebar }
};
</script>


<style lang="scss" scoped>
</style>
