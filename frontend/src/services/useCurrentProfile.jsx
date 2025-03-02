import { useDispatch } from "react-redux";
import { axiosInstance } from "../axios";
import { SetProfile } from "../reducers/users/userSlice";

const useCurrentProfile = () => {
  const dispatch = useDispatch();

  const fetchProfile = async (id) => {
    try {
      const res = await axiosInstance.get(`profile/profile-details/${id}`);
      const { profile_pic: profilePic, bio } = res.data;

      dispatch(SetProfile(profilePic, bio));
    } catch (error) {
      console.error("Error fetching current profile:", error);
    }
  };

  const setProfile = async (id, formData) => {
    try {
      const res = await axiosInstance.post(
        "profile/update-profile/1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from the backend:", res.data);
      fetchProfile(id);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return { fetchProfile, setProfile };
};
export default useCurrentProfile;
