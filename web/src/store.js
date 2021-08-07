import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./pages/admin/authSlice";
import playersReducer from "./pages/player-list/playersSlice";
import leaguesReducer from "./pages/leagues/leaguesSlice";
import teamsReducer from "./pages/teams/teamsSlice";
import playerDetailReducer from "./pages/player/playerDetailSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playersReducer,
    playerDetail: playerDetailReducer,
    leagues: leaguesReducer,
    teams: teamsReducer,
  },
});

export default store;
