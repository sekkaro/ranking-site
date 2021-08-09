import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./pages/admin/authSlice";
import playersReducer from "./pages/player-list/playersSlice";
import leaguesReducer from "./pages/leagues/leaguesSlice";
import teamsReducer from "./pages/teams/teamsSlice";
import positionsReducer from "./pages/positions/positionsSlice";
import playerDetailReducer from "./pages/player/playerDetailSlice";
import playerCreateReducer from "./pages/player-create/playerCreateSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playersReducer,
    playerDetail: playerDetailReducer,
    leagues: leaguesReducer,
    teams: teamsReducer,
    positions: positionsReducer,
    playerCreate: playerCreateReducer,
  },
});

export default store;
