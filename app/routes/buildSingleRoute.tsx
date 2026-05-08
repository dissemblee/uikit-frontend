import type { Route } from "../+types/root";
import { BuildSinglePage } from "@pages/build";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function buildSingleRoute() {
  return <BuildSinglePage />
}
