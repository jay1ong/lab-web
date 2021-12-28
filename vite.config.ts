import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import WindiCSS from "vite-plugin-windicss";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import PurgeIcons from "vite-plugin-purge-icons";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
    host: "0.0.0.0",
    port: 3000,
    // 反向代理
    proxy: {
      "/api": {
        target: "http://localhost:11001/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "/@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: /\/@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  plugins: [
    vue(),
    Components({
      dts: true,
      extensions: ["vue"],
      resolvers: [AntDesignVueResolver()],
    }),
    WindiCSS({
      safelist: "prose prose-sm m-auto text-left",
    }),
    PurgeIcons({
      /* PurgeIcons Options */
    }),
    vueJsx(),
  ],
  optimizeDeps: {
    // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
    include: [
      "@iconify/iconify",
      "ant-design-vue/es/locale/zh_CN",
      "ant-design-vue/es/locale/en_US",
    ],
    exclude: ["vue"],
  },
  build: {
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
