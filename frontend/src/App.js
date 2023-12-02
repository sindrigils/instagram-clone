import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProtectedRoutes from "./utils/protected-routes/AuthProtectedRoutes";
import AppProtectedRoutes from "./utils/protected-routes/AppProtectedRoutes";
import Login from "./pages/Login/Login";
import Home from "./pages/Homepage/Homepage";
import Register from "./pages/Register/Register";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppProtectedRoutes />}>
            <Route path="/" exact element={<Home />} />
          </Route>

          <Route element={<AuthProtectedRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
