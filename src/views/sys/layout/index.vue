<template>
  <a-layout class="h-full">
    <a-layout-sider class="h-full">
      <div class="flex flex-col">
        <div class="flex items-center justify-center p-1.5">
          <img class="max-w-12 max-h-12" src="/assets/logo-blue(已去底).png" />
          <span class="text-2xl ml-1 mt-2 text-white text-opacity-98">Lab</span>
        </div>
        <MenuVue class="h-full mt-5" />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <HeaderVue />
      </a-layout-header>
      <a-divider class="!my-0" />
      <a-layout-content class="mt-5">
        <RouterView>
          <template #default="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </template>
        </RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
export default {
  name: "Layout",
};
</script>
<script lang="ts" setup>
import { onMounted } from "vue";
import HeaderVue from "./Header.vue";
import MenuVue from "./Menu";

onMounted(() => {});
</script>
<style scoped>
.ant-layout {
  background: transparent;
}
.ant-layout-header {
  background: transparent;
}
.ant-layout-footer {
  background: transparent;
}
</style>
