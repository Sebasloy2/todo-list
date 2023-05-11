import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/user/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    axios
      .get("/api/user/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {currentUser ? (
              <HomePage currentUser={currentUser} onLogout={handleLogout} />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )}
          </Route>
          <Route path="/register">
            <RegisterPage onLogin={handleLogin} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
