import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import LandingPage from "@pages/landing/LandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function landingRoute() {
  return <LandingPage />;
}
