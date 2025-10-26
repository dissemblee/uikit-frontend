import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/homeRoute.tsx"), route("landing", "routes/landingRoute.tsx"),] satisfies RouteConfig;
