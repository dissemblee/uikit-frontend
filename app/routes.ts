import { type RouteConfig, index, prefix, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/homeRoute.tsx"),
  route("landing", "routes/landingRoute.tsx"),
  route("login", "routes/loginRoute.tsx"),
  route("registration", "routes/registrationRoute.tsx"),

  ...prefix("repositories", [
    route("/", "routes/repositoryListRoute.tsx"),
  ]),
  ...prefix("components", [
    route("/", "routes/componentListRoute.tsx"),
  ]),

  layout("provider/ProtectedRoute.tsx", [
    ...prefix("repositories", [
      route("create", "routes/repositoryCreateRoute.tsx"),
      route("/:username/:name", "routes/repositorySingleRoute.tsx"),
    ]),
    ...prefix("components", [
      route("create", "routes/componentCreateRoute.tsx"),
      route("/:username/:name", "routes/componentSingleRoute.tsx"),
    ]),
    ...prefix("builds", [
      route("/", "routes/buildListRoute.tsx"),
      route("/:buildId", "routes/buildSingleRoute.tsx"),
    ]),
    route("profile/:username", "routes/profileRoute.tsx"),
  ]),
] satisfies RouteConfig;
