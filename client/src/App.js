// import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Operator from "./pages/Operator";
import Tours from "./pages/Tours";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// PassPort
import React, { Component } from 'react';
import axios from 'axios'
// import { Route, Link } from 'react-router-dom' // might conflict
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
// import Home from './components/home'






// const App = () =>
//   <Router>
//     <div>
//       <Nav/>    
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/operator" component={Operator} />
//         <Route exact path="/operator/:id" component={Detail} />
//         <Route exact path="/tours/:id" component={Detail} />
//         <Route exact path="/tours" component={Tours} />
//         <Route exact path="/login" component={Login} />
//         <Route component={NoMatch} />
//       </Switch>
//       <Footer/>
//     </div>
//   </Router>;

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

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
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
       <Nav/>    
       <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/operator" component={Operator} />
         <Route exact path="/operator/:id" component={Detail} />
        <Route exact path="/tours/:id" component={Detail} />
         <Route exact path="/tours" component={Tours} />
         <Route exact path="/login" component={Login} />
         <Route component={NoMatch} />
       </Switch>
       <Footer/>
     </div>
   </Router>;
   
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />

      </div>
    );
  }
}

export default App;

