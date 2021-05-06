import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { globalContext } from "./context/Provider";

import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Question from "./components/Questions/Questions";
import CertainQuestion from "./components/CertainQuestion/CertainQuestion";
import Profile from "./components/Profile/Profile";
import Topics from "./components/Topics/Topics";
import Topic from "./components/Topic/Topic";
import Search from "./components/Search/Search";
import About from "./components/About/About";
import Signup from "./components/Signup/Signup";
import Forgot from "./components/Forgot/Forgot";
import Reset from "./components/Reset/Reset";

const App = () => {
  console.log("app");

  return (
    <Router>
      <div className="layer">
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/topic/:topicid">
            <Topic />
          </Route>
          <Route path="/questions">
            <Question />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forgot">
            <Forgot />
          </Route>
          <Route path="/reset/:randamtoken">
            <Reset />
          </Route>
          <Route path="/profile/:personid">
            <Profile />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/:questionid">
            <CertainQuestion />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
