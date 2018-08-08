import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { Row, Container } from "./Grid";
import './SignAuthentication.css';


const SignInPage = ({ history }) =>
  <div className="sign-in-main-div">
    <h1 className="sign-up-h1">Log In</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <Container fluid>
      <Row>
        <div>
        {/* size="md-6" */}
      <form onSubmit={this.onSubmit}>
      <label id="email-sign-in-label" className="authentication-labels">Email:</label>
        <input
          className="authentication-input"
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />

<label className="authentication-labels">Password:</label>
        <input
        className="authentication-input"
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button  className="authentication-button hvr-grow-shadow-2" disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
      </div>
      </Row>
      </Container>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};