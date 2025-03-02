import { axiosInstance } from "../axios";

const usePosts = () => {
  const fetchPost = async (id) => {
    try {
      const res = await axiosInstance.get(`posts/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async (id) => {
    try {
      const res = null;
    } catch (error) {}
  };

  return { fetchPost };
};

export default usePosts;
