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
      .post(`auth/register`, {
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
        console.log(errors);
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

  const handleLoginUser = async (username, password, setFlashMessage) => {
    try {
      const response = await axiosInstance.post("auth/token", {
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

        const { username: jwtUsername, user_id: userId } =
          jwtDecode(accessToken);
        const res = await axiosInstance.get(`profile/profile-pic/${userId}`);
        const profilePic = res.data.profile_pic;
        dispatch(LoginUser(userId, jwtUsername, profilePic));
        navigate("/");
      } else {
        setFlashMessage(() => ["Something went wrong, please try again."]);
      }
    } catch (e) {
      setFlashMessage(() => [e.response.data.detail]);
    }
  };

  const validateToken = async (accessToken) => {
    let state = false;
    try {
      const response = await axiosInstance.post("auth/token/verify", {
        token: accessToken,
      });
      if (response.status === 200) state = true;
    } catch (e) {
      state = false;
    } finally {
      return state;
    }
  };

  const updateToken = async (refreshtoken) => {
    try {
      localStorage.removeItem("jwtTokens");
      const response = await axiosInstance.post("auth/token/refresh", {
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
    } catch (e) {
    } finally {
      if (!localStorage.getItem("jwtTokens")) {
        handleLogoutUser();
      }
    }
  };

  return {
    handleLogoutUser,
    handleLoginUser,
    handleRegisterUser,
    updateToken,
    validateToken,
  };
};

export default useAuth;
