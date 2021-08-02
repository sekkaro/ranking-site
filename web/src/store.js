import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./pages/admin/authSlice";
import playersReducer from "./pages/player-list/playersSlice";
import leaguesReducer from "./pages/leagues/leaguesSlice";
import playerDetailReducer from "./pages/player/playerDetailSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playersReducer,
    playerDetail: playerDetailReducer,
    leagues: leaguesReducer,
  },
});

export default store;
