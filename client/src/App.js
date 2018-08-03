// import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Operator from "./pages/Operator";
import Tours from "./pages/Tours";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import BookNow from "./pages/BookNow";
// import Profile from "./pages/Profile";

// PassPort
import React, { Component } from 'react';
import axios from 'axios'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      // console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">

        <Router>
          <div>
            <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} />

            {/* greet user if logged in: */}
            {this.state.loggedIn &&
              <p>Join the party, {this.state.username}!</p>
            }
            <Switch>
              {/* <Route exact path="/user" component={Home} /> */}
              <Route exact path="/" component={Home} />
              <Route exact path="/operator" component={Operator} />
              <Route exact path="/operator/:id" component={Detail} />
              <Route exact path="/tours/:id" component={Detail} />
              <Route exact path="/tours" component={Tours} />
              <Route exact path="/tours/book-now/:id" component={BookNow} />
              <Route exact path="login" component={Login} updateUser={this.updateUser} />
              <Route exact path="/signup" component={Signup} />
              {/* <Route exact path="/profile" component={Profile} /> */}
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </div>
        </Router>;

      </div>
    );
  }
}

export default App;

