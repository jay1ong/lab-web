import { RouteRecordRaw } from "vue-router";
import { getRouterView } from "./helper/routeHelper";
import Layout from "/@/views/sys/layout/index.vue";

import HomePage1 from "../views/pages/Page1.vue";
import HomePage2 from "../views/pages/Page2.vue";
import HomePage3 from "../views/pages/Page3.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    meta: {
      title: "首页",
      icon: "ant-design:home-outlined",
      hideMenu: true,
    },
    component: () => null,
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      icon: "ant-design:home-outlined",
      // hideMenu: true,
    },
    redirect: "/home/page1",
    component: Layout,
    children: [
      {
        path: "page1",
        name: "homePage1",
        meta: {
          title: "页面1",
          icon: "ant-design:idcard-outlined",
        },
        redirect: "/home/page1/page2",
        component: getRouterView(),
        children: [
          {
            path: "page2",
            name: "homePage2",
            meta: {
              title: "页面2",
              icon: "ant-design:hourglass-filled",
              // hideMenu: true,
            },
            redirect: "/home/page1/page2/page3",
            component: getRouterView(),
            children: [
              {
                path: "page3",
                name: "homePage3",
                meta: {
                  title: "页面3",
                  icon: "ant-design:html5-filled",
                },
                component: HomePage3,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/page1",
    name: "page1",
    meta: {
      title: "页面1",
      icon: "ant-design:home-outlined",
      hideMenu: true,
    },
    component: Layout,
    redirect: "/page1/index",
    children: [
      {
        path: "index",
        name: "page1Index",
        meta: {
          title: "页面1",
          icon: "ant-design:idcard-outlined",
        },
        component: HomePage1,
      },
    ],
  },
  {
    path: "/page2",
    name: "page2",
    meta: {
      title: "页面2",
      icon: "ant-design:home-outlined",
      hideMenu: true,
    },
    component: Layout,
    redirect: "/page2/index",
    children: [
      {
        path: "index",
        name: "page2Index",
        meta: {
          title: "页面2",
          icon: "ant-design:idcard-outlined",
        },
        component: HomePage2,
      },
    ],
  },
  {
    path: "/page3",
    name: "page3",
    meta: {
      title: "页面3",
      icon: "ant-design:home-outlined",
      hideMenu: true,
    },
    component: Layout,
    redirect: "/page3/index",
    children: [
      {
        path: "index",
        name: "page3Index",
        meta: {
          title: "页面3",
          icon: "ant-design:idcard-outlined",
        },
        component: HomePage3,
      },
    ],
  },
];
