<template>
  <v-app>
    <AppHeader v-if="showHeader" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "./components/Header.vue";
import { mapActions } from "vuex";

export default {
  components: { AppHeader },
  data() {
    return {
      showHeader: true,
    };
  },
  created() {
    this.fetchImagesHair();
    this.fetchImagesColor();
    this.showHeader = !this.$route.meta.hideHeader;
  },
  watch: {
    $route(to) {
      this.showHeader = !to.meta.hideHeader;
    },
  },
  methods: {
    ...mapActions(["fetchImagesHair", "fetchImagesColor"]),
  },
};
</script>
