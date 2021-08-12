import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminRoute from "./components/admin-route/AdminRoute";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Leagues from "./pages/leagues/Leagues";
import Login from "./pages/login/Login";
import PlayerCreate from "./pages/player-create/PlayerCreate";
import Players from "./pages/player-list/Players";
import PlayerDetail from "./pages/player/PlayerDetail";
import Positions from "./pages/positions/Positions";
import Teams from "./pages/teams/Teams";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <AdminRoute path="/admin">
            <Admin />
          </AdminRoute>
          <AdminRoute path="/players/:id/edit">
            <PlayerCreate />
          </AdminRoute>
          <AdminRoute path="/players/:id">
            <PlayerDetail />
          </AdminRoute>
          <AdminRoute path="/players">
            <Players />
          </AdminRoute>
          <AdminRoute path="/create-player">
            <PlayerCreate />
          </AdminRoute>
          <AdminRoute path="/leagues">
            <Leagues />
          </AdminRoute>
          <AdminRoute path="/teams">
            <Teams />
          </AdminRoute>
          <AdminRoute path="/positions">
            <Positions />
          </AdminRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
