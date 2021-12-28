import { unref, defineComponent, reactive, onMounted } from "vue";
import { useRouteStore } from "../../../store/module/route.module";
import { RouteMeta, RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import {
  anyChildrenVisible,
  getMenuVisible,
} from "/@/router/helper/routeHelper";
import { routeExist } from "/@/router/helper/routeHelper";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "Menu",
  setup() {
    const { getRoutes } = useRouteStore();

    let routes: string[] = [];

    const { path } = useRoute();

    const { replace } = useRouter();

    const unrefPath = unref(path);
    let selectedKey = unrefPath;

    if (unrefPath) {
      if (unrefPath.substring(unrefPath.length - 1) === "/") {
        selectedKey = unrefPath.substring(0, unrefPath.length - 1);
      }
    }

    const state = reactive({
      selectedKeys: [selectedKey],
      openKeys: [""],
    });

    onMounted(() => {
      if (unrefPath) {
        const paths = unrefPath.split("/");
        let openKeys = "";
        paths.forEach((element) => {
          if (element) {
            openKeys = openKeys ? openKeys + "/" + element : "/" + element;
            state.openKeys.push(openKeys);
          }
        });
      }
    });

    const handleMenuClick = (item: Recordable) => {
      if (routeExist([item.key], routes)) {
        replace(item.key);
      } else {
        message.error("路由表不存在该路由");
      }
    };

    const renderMenuIcon = (meta: RouteMeta | undefined) => {
      const unrefMeta = unref(meta);
      return unrefMeta && unrefMeta.icon ? (
        <Icon class="iconify" icon={meta?.icon}></Icon>
      ) : null;
    };

    const renderMenuTitle = (meta: RouteMeta | undefined) => {
      return meta && meta.title ? <span>{meta.title}</span> : null;
    };

    const renderSubMenu = (path: string, route: RouteRecordRaw): any => {
      routes.push(path);
      const unrefRoute = unref(route);
      const renderChildren = unrefRoute.children?.map((element) =>
        renderItem(element)
      );
      return (
        <a-sub-menu key={path}>
          {{
            icon: () => renderMenuIcon(unrefRoute.meta),
            title: () => renderMenuTitle(unrefRoute.meta),
            default: () => renderChildren,
          }}
        </a-sub-menu>
      );
    };

    const renderMenuItem = (path: string, route: RouteRecordRaw) => {
      routes.push(path);
      const unrefRoute = unref(route);
      return (
        <a-menu-item key={path}>
          {{
            icon: () => renderMenuIcon(unrefRoute.meta),
            default: () => renderMenuTitle(unrefRoute.meta),
          }}
        </a-menu-item>
      );
    };

    let currentPath: string = "";

    const renderItem = (route: RouteRecordRaw): any => {
      const unrefRoute = unref(route);
      const children = unrefRoute.children;
      // 菜单不显示,递归子孙节点
      if (!getMenuVisible(unrefRoute)) {
        if (children) {
          currentPath = currentPath
            ? currentPath + "/" + unrefRoute.path
            : unrefRoute.path;
          return children.map((element) => {
            return renderItem(element);
          });
        }
      } else {
        currentPath = currentPath
          ? currentPath + "/" + unrefRoute.path
          : unrefRoute.path;
        const path = currentPath;
        if (anyChildrenVisible(children)) {
          return renderSubMenu(path, unrefRoute);
        } else {
          currentPath = "";
          return renderMenuItem(path, unrefRoute);
        }
      }
    };

    const renderMenu = () => {
      return (
        <a-menu
          v-models={[
            [state.selectedKeys, "selectedKeys"],
            [state.openKeys, "openKeys"],
          ]}
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
        >
          {unref(getRoutes).map((element) => {
            return renderItem(element);
          })}
        </a-menu>
      );
    };
    return () => renderMenu();
  },
});
