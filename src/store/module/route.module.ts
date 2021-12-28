import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";

import { routes } from "/@/router/routes";

interface RouteState {
  routes: RouteRecordRaw[];
}

export const useRouteStore = defineStore({
  id: "routeStore",
  state: (): RouteState => ({
    routes: routes,
  }),
  getters: {
    getRoutes(): RouteRecordRaw[] {
      return this.routes;
    },
  },
  actions: {},
});
