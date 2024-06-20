import Vue from "vue";
import VueRouter from "vue-router";
import MainVue from "../views/main.vue";
import UsageVue from "../views/usage.vue";
import IntroVue from "../views/introduce.vue";
import HistoryVue from "../views/History.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: MainVue,
  },
  {
    path: "/use",
    name: "Use",
    component: UsageVue,
  },
  {
    path: "/introduce",
    name: "Introduce",
    component: IntroVue,
  },
  {
    path: "/history",
    name: "history",
    component: HistoryVue,
  }

];

const router = new VueRouter({
  mode: "history", // URL에서 # 제거
  base: process.env.BASE_URL,
  routes,
});

export default router;
