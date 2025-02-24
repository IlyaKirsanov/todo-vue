import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homePage",
    component: Home
  },
  {
    path: "/login",
    name: "loginPage",
    component: Login
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
