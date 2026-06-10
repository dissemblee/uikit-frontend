import { Navigate, Outlet } from "react-router"
import { useAuthContext } from "@app/provider/AuthProvider"

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return <Outlet />
}
