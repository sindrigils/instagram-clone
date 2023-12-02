import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { LogoutUser, LoginUser } from "../reducers/users/userSlice";
import { axiosInstance } from "../axios";

const useAuth = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisterUser = (
    username,
    email,
    password,
    confirmPassword,
    setFlashMessages
  ) => {
    axiosInstance
      .post(`register`, {
        email,
        username,
        password,
        confirmPassword,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setFlashMessages(() => []);
        const errors = error.response.data;
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            const errorMessage = errors[key][0];
            setFlashMessages((state) => [...state, errorMessage]);
          }
        }
      });
  };

  const handleLogoutUser = () => {
    localStorage.removeItem("jwtTokens");
    dispatch(LogoutUser());
  };

  const handleLoginUser = async (username, password) => {
    const response = await axiosInstance.post("token", {
      username,
      password,
    });

    if (response.status === 200) {
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      localStorage.setItem(
        "jwtTokens",
        JSON.stringify({
          accessToken,
          refreshToken,
        })
      );
      axiosInstance.defaults.headers["Authorization"] = "JWT " + accessToken;

      const { username: jwtUsername, auth_token } = jwtDecode(accessToken);
      dispatch(LoginUser(jwtUsername, auth_token));
      navigate("/");
    }
  };

  const updateToken = async (refreshtoken) => {
    const response = await axiosInstance.post("token/refresh", {
      refresh: refreshtoken,
    });
    if (response.status === 200) {
      localStorage.setItem(
        "jwtTokens",
        JSON.stringify({
          accessToken: response.data.access,
          refreshToken: response.data.refresh,
        })
      );
    }
    if (response.status === 200) {
      localStorage.setItem(
        "jwtTokens",
        JSON.stringify({
          accessToken: response.data.access,
          refreshToken: response.data.refresh,
        })
      );
    } else {
      handleLogoutUser();
    }
  };

  return { handleLogoutUser, handleLoginUser, updateToken, handleRegisterUser };
};

export default useAuth;
