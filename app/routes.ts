import { type RouteConfig, index, prefix, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/homeRoute.tsx"),
  route("login", "routes/loginRoute.tsx"),
  route("registration", "routes/registrationRoute.tsx"),

  ...prefix("repositories", [
    index("routes/repositoryListRoute.tsx", {
      id: "repository-list",
    }),

    route(":username", "routes/repositoryListRoute.tsx", {
      id: "repository-user-list",
    }),
  ]),
  ...prefix("components", [
    index("routes/componentListRoute.tsx", {
      id: "component-list",
    }),

    route(":username", "routes/componentListRoute.tsx", {
      id: "component-user-list",
    }),
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
      route("/:service/:buildId", "routes/buildSingleRoute.tsx"),
    ]),
    route("profile/:username", "routes/profileRoute.tsx"),
  ]),
] satisfies RouteConfig;
