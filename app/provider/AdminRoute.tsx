import { Navigate, Outlet } from "react-router"
import { useUserInfo } from "@shared/hooks/useUserInfo"
import { useAuthContext } from "@app/provider/AuthProvider"

const AdminRoute = () => {
  const { isAuthenticated } = useAuthContext()
  const { role } = useUserInfo()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (role !== "ADMIN") return <Navigate to="/" replace />

  return <Outlet />
}

export default AdminRoute;
