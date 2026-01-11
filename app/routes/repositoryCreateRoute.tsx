import { RepositoryCreatePage } from "@pages/repository"
import { MainLayout } from "~/layouts"
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function repositoryCreateRoute() {
  return <MainLayout><RepositoryCreatePage /></MainLayout>
}