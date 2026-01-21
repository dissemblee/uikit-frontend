import type { Route } from "./+types/home";
import { ComponentListPage } from "@pages/components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function ComponentListRoute() {
  return <ComponentListPage />
}