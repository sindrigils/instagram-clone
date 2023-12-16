// useUser.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../axios";
import {
  setProfileDetails,
  setLoadingToFalse,
  setInvalidUser,
} from "../reducers/profile/profileSlice";

const useUserProfile = (paramsUsername, username) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`profile/${paramsUsername}`);

        const [
          { posts },
          { following_count: followingCount },
          { followers_count: followersCount },
          { bio },
          { profile_pic: profilePic },
          { is_following: isFollowing },
        ] = res.data;

        if (res.status === 200) {
          dispatch(
            setProfileDetails(
              followersCount,
              followingCount,
              bio,
              profilePic,
              posts,
              username === paramsUsername,
              isFollowing
            )
          );
        }
      } catch (error) {
        dispatch(setInvalidUser());
      } finally {
        dispatch(setLoadingToFalse());
      }
    };

    fetchProfile();
  }, [paramsUsername, username, dispatch]);

  return;
};

export default useUserProfile;
