import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "wayn的个人博客",
  description: "vwayn的个人博客，专注后端",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
