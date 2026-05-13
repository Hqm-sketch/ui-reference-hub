import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UI Reference Hub - AI 驱动的 UI 组件参考库",
    short_name: "UI Ref Hub",
    description: "200+ UI 组件参考，覆盖桌面端和移动端，专为 AI 设计和开发优化",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#18181b",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
