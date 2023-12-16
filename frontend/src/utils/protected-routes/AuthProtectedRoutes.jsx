import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Spinner from "../../components/Spinner/Spinner";

function AuthProtectedRoutes() {
  const { userId, isLoading } = useSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) return <Spinner />;
  return userId ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default AuthProtectedRoutes;
