import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/tours'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);

            })
    }

    render() {

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (

                <Container fluid>
                    <Row>
                        <Col size="md-12">
                            <Jumbotron>
                                <h1>Login</h1>
                            </Jumbotron>

                            <div>
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <div className="col-1 col-ml-auto">
                                            <label className="form-label" htmlFor="username"></label>
                                        </div>
                                        <div className="col-3 col-mr-auto">
                                            <input className="form-input"
                                                type="text"
                                                id="username"
                                                name="username"
                                                placeholder="Username"
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-1 col-ml-auto">
                                            <label className="form-label" htmlFor="password"></label>
                                        </div>
                                        <div className="col-3 col-mr-auto">
                                            <input className="form-input"
                                                placeholder="Password"
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <div className="col-7"></div>
                                        <button
                                            className="btn btn-primary btn-md col-mr-auto"

                                            onClick={this.handleSubmit}
                                            type="submit">Login</button>
                                    </div>
                                </form>
                            </div>

                        </Col>
                    </Row>
                </Container>
            )
        }
    }


}




export default Login;
