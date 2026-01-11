import { Welcome } from "@pages/welcome";
import type { Route } from "./+types/home";
import { MainLayout } from "~/layouts/layouts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <MainLayout><Welcome /></MainLayout>;
}
