import { useSelector } from "react-redux";

import useAuth from "../../services/authService";

function Home() {
  const { handleLogoutUser } = useAuth();
  const {
    currentUser: { username },
    authToken,
  } = useSelector((state) => state.user);

  return (
    <div>
      Home from {username}
      {authToken ? "You are logged in with token" : "You are not logged in"}
      <button onClick={handleLogoutUser}>Click me to restart state</button>
    </div>
  );
}

export default Home;
