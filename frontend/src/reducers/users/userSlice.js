const initialStateUser = {
  userId: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  profilePic: "",
  isLoading: true,
};

export default function userReducer(state = initialStateUser, action) {
  switch (action.type) {
    case "user/loginUser":
      return {
        ...state,
        userId: action.payload.user_id,
        username: action.payload.username,
        profilePic: action.payload.profilePic,
        isLoading: false,
      };

    case "user/logoutUser":
      return { ...initialStateUser, isLoading: false };

    case "user/updateProfilePic":
      return { ...state, profilePic: action.payload.profilePic };

    default:
      return { ...state };
  }
}

export function LoginUser(user_id, username, profilePic) {
  return {
    type: "user/loginUser",
    payload: { user_id, username, profilePic },
  };
}

export function LogoutUser() {
  return {
    type: "user/logoutUser",
  };
}

export function UpdateProfilePic(profilePic) {
  return { type: "user/updateProfilePic", payload: { profilePic } };
}
