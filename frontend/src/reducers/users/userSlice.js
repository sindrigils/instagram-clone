const initialStateUser = {
  userId: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  profilePic: "",
  bio: "",
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
        bio: action.payload.bio,
        isLoading: false,
      };

    case "user/logoutUser":
      return { ...initialStateUser, isLoading: false };

    case "user/setProfile":
      return {
        ...state,
        profilePic: action.payload.profilePic,
        bio: action.payload.bio,
      };

    default:
      return { ...state };
  }
}

export function LoginUser(user_id, username, profilePic, bio) {
  return {
    type: "user/loginUser",
    payload: { user_id, username, profilePic, bio },
  };
}

export function LogoutUser() {
  return {
    type: "user/logoutUser",
  };
}

export function SetProfile(profilePic, bio) {
  return { type: "user/setProfile", payload: { profilePic, bio } };
}
