import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Operator from "./pages/Operator";
import Tours from "./pages/Tours";
import Detail from "./pages/Detail";
import BookNow from "./pages/BookNow";
import NoMatch from "./pages/NoMatch";

import Navigation from "./components/Nav";
import Footer from "./components/Footer";
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import * as routes from '../src/constants/routes';
import { firebase } from './firebase';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }
  
    render() {
      return (
          <Router>
            <div>
            <Navigation authUser={this.state.authUser} />

            <Switch>
              
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path={routes.HOME} component={Home} />
            
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          
            <Route exact path="/operator" component={Operator} />
            <Route exact path="/operator/:id" component={Detail} />
            <Route exact path="/tours/:id" component={Detail} />
            <Route exact path="/tours" component={Tours} />
            <Route exact path="/tours/book-now/:id" component={BookNow} />
            <Route component={NoMatch} />
            
            </Switch>
            <Footer />
            </div>
          </Router>
          ); 
    }
  }

export default App