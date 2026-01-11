import { RepositoryListPage } from "@pages/repository"
import { MainLayout } from "~/layouts"
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function RepositoryListRoute() {
  return <MainLayout><RepositoryListPage /></MainLayout>
}