import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/homeRoute.tsx"),
  route("landing", "routes/landingRoute.tsx"),
  route("login", "routes/loginRoute.tsx"),
  route("registration", "routes/registrationRoute.tsx"),
  route("create", "routes/CreateRepositoryRoute.tsx")
] satisfies RouteConfig;