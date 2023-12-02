const initialStateUser = {
  currentUser: {
    username: "SindriGils",
    firstName: "",
    lastName: "",
    email: "",
  },
  authToken: "",
};

export default function userReducer(state = initialStateUser, action) {
  switch (action.type) {
    case "user/loginUser":
      return {
        ...state,
        currentUser: { username: action.payload.username },
        authToken: action.payload.authToken,
      };

    case "user/retrieveToken":
      return {};

    case "user/logoutUser":
      return initialStateUser;
    default:
      return { ...state };
  }
}

export function LoginUser(username, authToken) {
  return {
    type: "user/loginUser",
    payload: { username, authToken },
  };
}

export function LogoutUser() {
  return {
    type: "user/logoutUser",
  };
}
