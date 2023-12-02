import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

import { LoginUser } from "../reducers/users/userSlice";
import useAuth from "../services/authService";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { updateToken } = useAuth();
  const { authToken } = useSelector((state) => state.user);
  const intervalDuration = 4 * 60 * 1000;

  useEffect(
    function () {
      const jwtTokens = localStorage.getItem("jwtTokens");

      if (jwtTokens) {
        const { accessToken } = JSON.parse(jwtTokens);
        const { username: jwtUsername, auth_token } = jwtDecode(accessToken);
        dispatch(LoginUser(jwtUsername, auth_token));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (authToken) {
        const { refreshToken } = JSON.parse(localStorage.getItem("jwtTokens"));
        updateToken(refreshToken);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [authToken, updateToken, intervalDuration]);

  return <>{children}</>;
}

export default AuthProvider;
