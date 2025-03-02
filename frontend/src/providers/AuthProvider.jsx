import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

import { LoginUser, LogoutUser } from "../reducers/users/userSlice";
import useAuth from "../services/useAuth";
import { axiosInstance } from "../axios";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { updateToken, validateToken } = useAuth();
  const intervalDuration = 4 * 60 * 1000;

  useEffect(() => {
    const { accessToken } =
      JSON.parse(localStorage.getItem("jwtTokens") || "{}") || {};
    const checkAuthentication = async () => {
      const isValidToken = await validateToken(accessToken);
      if (isValidToken) {
        const { user_id: userId, username } = jwtDecode(accessToken);
        const res = await axiosInstance.get(
          `profile/profile-details/${userId}`
        );
        const profilePic = res.data.profile_pic;
        const bio = res.data.bio;
        dispatch(LoginUser(userId, username, profilePic, bio));
      } else {
        localStorage.removeItem("jwtTokens");
        dispatch(LogoutUser());
      }
    };

    checkAuthentication();
  }, [dispatch, validateToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { refreshToken } =
        JSON.parse(localStorage.getItem("jwtTokens") || {}) || {};
      updateToken(refreshToken);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [updateToken, intervalDuration]);

  return <>{children}</>;
}

export default AuthProvider;
