import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/users/userSlice";
import profileReducer from "./reducers/profile/profileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
