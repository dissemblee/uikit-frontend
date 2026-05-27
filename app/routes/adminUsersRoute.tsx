import { AdminUsersPage } from "@pages/admin";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Управление пользователями" }];
}

export default function AdminUsersRoute() {
  return <AdminUsersPage />;
}
