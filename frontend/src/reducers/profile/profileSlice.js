const initialState = {
  isLoading: true,
  followers: "",
  following: "",
  bio: "",
  postsAmount: "",
  profilePic: "",
  posts: [],
  ownProfile: false,
  isFollowing: false,
  invalidUser: false,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case "profile/setProfileDetails":
      return {
        ...state,
        followers: action.payload.followers,
        following: action.payload.following,
        bio: action.payload.bio,
        postsAmount: action.payload.postsAmount,
        profilePic: action.payload.profilePic,
        posts: action.payload.posts,
        ownProfile: action.payload.ownProfile,
        isFollowing: action.payload.isFollowing,
        isLoading: false,
      };

    case "profile/setLoadingToFalse":
      return { ...state, isLoading: false };

    case "profile/invalidUser":
      return { ...state, invalidUser: true };
    default:
      return { ...state };
  }
}

export function setProfileDetails(
  followers,
  following,
  bio,
  profilePic,
  posts,
  ownProfile,
  isFollowing
) {
  const postsAmount = posts.length;
  return {
    type: "profile/setProfileDetails",
    payload: {
      followers,
      following,
      bio,
      postsAmount,
      profilePic,
      posts,
      ownProfile,
      isFollowing,
    },
  };
}

export function setLoadingToFalse() {
  return {
    type: "profile/setLoadingToFalse",
  };
}

export function setInvalidUser() {
  return { type: "profile/invalidUser" };
}
