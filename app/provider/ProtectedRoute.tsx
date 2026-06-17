import { Navigate, Outlet } from "react-router"
import { useAuthContext } from "@app/provider/AuthProvider"

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) return <div>Загрузка</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute
