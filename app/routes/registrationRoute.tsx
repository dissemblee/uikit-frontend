import type { Route } from "./+types/home";
import { RegistrationPage } from "@pages/registration/RegistrationPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function registrationRoute() {
  return <RegistrationPage />;
}
