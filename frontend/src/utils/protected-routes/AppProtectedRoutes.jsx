import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Spinner from "../../components/Spinner/Spinner";

function AppProtectedRoutes() {
  const { userId, isLoading } = useSelector((state) => state.user);
  if (isLoading) return <Spinner />;

  return userId ? <Outlet /> : <Navigate to="/login" />;
}

export default AppProtectedRoutes;
