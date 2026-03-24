import { RepositoryCreatePage } from "@pages/repository";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function repositoryCreateRoute() {
  return <RepositoryCreatePage />
}
