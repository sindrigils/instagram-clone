import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AppProtectedRoutes() {
  const { authToken } = useSelector((state) => state.user);
  return authToken ? <Outlet /> : <Navigate to="/login" />;
}

export default AppProtectedRoutes;
