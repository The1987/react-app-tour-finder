import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Operator from "./pages/Operator";
import Tours from "./pages/Tours";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
// import DropDown from "./components/DropDown";

const App = () =>
  <Router>
    <div>
      <Nav />
      {/* <DropDown /> */}      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/operator" component={Operator} />
        <Route exact path="/operator/:id" component={Detail} />
        <Route exact path="/tours/:id" component={Detail} />
        <Route exact path="/tours" component={Tours} />
        <Route exact path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;

