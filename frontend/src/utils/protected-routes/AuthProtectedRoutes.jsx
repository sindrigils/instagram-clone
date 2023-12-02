import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthProtectedRoutes() {
  const { authToken } = useSelector((state) => state.user);
  return authToken ? <Navigate to="/" /> : <Outlet />;
}

export default AuthProtectedRoutes;
