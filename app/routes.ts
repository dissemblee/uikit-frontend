import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/homeRoute.tsx"),
  route("landing", "routes/landingRoute.tsx"),
  route("login", "routes/loginRoute.tsx"),
  route("registration", "routes/registrationRoute.tsx"),
  ...prefix("repositories", [
    route("/", "routes/RepositoryListRoute.tsx"),
    route("create", "routes/repositoryCreateRoute.tsx"),
  ]),
  ...prefix("components", [
    route("create", "routes/createRepositoryRoute.tsx")
  ])
] satisfies RouteConfig;