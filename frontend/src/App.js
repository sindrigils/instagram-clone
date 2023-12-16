import { Routes, Route } from "react-router-dom";

import AuthProtectedRoutes from "./utils/protected-routes/AuthProtectedRoutes";
import AppProtectedRoutes from "./utils/protected-routes/AppProtectedRoutes";
import Login from "./pages/Login/Login";
import Home from "./pages/HomePage/HomePage";
import Register from "./pages/Register/Register";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Profilepage from "./pages/ProfilePage/ProfilePage";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<AuthProtectedRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<AppProtectedRoutes />}>
          <Route path="/" element={<Home />} exact />
          <Route path="/:str" element={<Profilepage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
export default App;
