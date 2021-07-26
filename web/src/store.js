import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./pages/admin/authSlice";
import playersReducer from "./pages/player-list/playersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playersReducer,
  },
});

export default store;
