import type { Route } from "../+types/root";
import { RepositoryVersionPage } from "@pages/repository";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function repositoryVersionRoute() {
  return <RepositoryVersionPage />
}
