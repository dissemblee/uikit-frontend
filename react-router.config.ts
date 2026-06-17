import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  async prerender() {
    const static_routes = [
      "/",
      "/login",
      "/registration",
      "/components",
      "/repositories",
    ];

    return static_routes;
  },
} satisfies Config;
