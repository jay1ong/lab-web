import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { routes } from "./routes";

export const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login", "/register", "/home"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next("/login");
//   } else {
//     next();
//   }
//   // 返回 false 以取消导航
//   return false;
// });

router.onError((error) => {
  console.log("🚀 ~ file: index.ts ~ line 30 ~ Router.onError ~ error", error);
});
