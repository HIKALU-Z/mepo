<template>
    <div>
        <div class="text-xs-center">
            <v-dialog v-model="dialog" max-width="640">
                <v-card>
                    <v-card-title class="headline">123123</v-card-title>

                    <v-card-text>
                       阿斯顿发生的发生
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                            Disagree
                        </v-btn>

                        <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                            Agree
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialog: true
    };
  }
};
</script>

<style scoped>
</style>
