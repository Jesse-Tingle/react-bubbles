import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

import BubblePage from './components/BubblePage';
import ProtectedRoute from "./components/ProtectedRoute";


// const token = window.localStorage.getItem('token');


function App() {
  return (
    <Router>
      <div className="App">

        {/* The home link without the web token sends the user
        to the login component */}
        <Route exact path="/" component={Login} />

        {/* ProtectedRoute will send user to BubblesPage component
        if the user is logged in and the web token is set to localStorage */}
        <ProtectedRoute exact path="/bubblepage" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
