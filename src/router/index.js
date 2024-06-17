import Vue from "vue";
import VueRouter from "vue-router";
import MainVue from "../views/main.vue";
import LoginVue from "../views/login.vue";
import UsageVue from "../views/usage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: MainVue,
  },
  {
    path: "/login",
    name: "login",
    component: LoginVue,
    meta: { hideHeader: true }, // Add meta field
  },
  {
    path: "/use",
    name: "Use",
    component: UsageVue,
  },
];

const router = new VueRouter({
  mode: "history", // URL에서 # 제거
  base: process.env.BASE_URL,
  routes,
});

export default router;
