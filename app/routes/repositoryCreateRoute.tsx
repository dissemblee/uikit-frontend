import type { Route } from "./+types/home";
import { CreateRepositoryPage } from "@pages/createRepository";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function repositoryCreateRoute() {
  return <CreateRepositoryPage />
}
