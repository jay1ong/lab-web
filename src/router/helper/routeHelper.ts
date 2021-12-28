import { RouteRecordRaw } from "vue-router";

export const routeExist = (routes: string[], sysRoutes: string[]): boolean => {
  let routeExist = false;
  routeExist = routes.some((route) => {
    return (routeExist = sysRoutes.some((sysRoute) => {
      return route === sysRoute;
    }));
  });
  return routeExist;
};

export const anyChildrenVisible = (
  children: RouteRecordRaw[] | undefined
): any => {
  return (
    children &&
    children.length &&
    children.some((element) => {
      return (
        (element.meta && !element.meta.hideMenu) ||
        anyChildrenVisible(element.children)
      );
    })
  );
};

export const getMenuVisible = (route: RouteRecordRaw): boolean => {
  return route.meta !== undefined && !route.meta.hideMenu;
};


