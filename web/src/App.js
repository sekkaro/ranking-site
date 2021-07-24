import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminRoute from "./components/admin-route/AdminRoute";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
