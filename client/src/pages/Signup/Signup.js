import React, { Component } from 'react'
import axios from 'axios'
import { Col, Row, Container } from "../../components/Grid";
// import Jumbotron from "../../components/Jumbotron";
import './Signup.css'


class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',

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
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	return (

		<Container fluid>
		
		<Row>
			<Col size="sm-12 md-6">
				<div>
					
				</div>

		<div className="SignupForm">
		<h1 className="sign-up-h1">Sign Up</h1>
			<form className="form-horizontal">
				<div className="form-group">
					<div className="col-1">
						<label className="form-label text-white" htmlFor="username">Username:</label>
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
						<label className="form-label text-white" htmlFor="password">Password:</label>
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
						id="sign-in-button-id"
						className="btn btn-primary btn-block col-mr-auto hvr-grow-shadow-2"
						onClick={this.handleSubmit}
						type="submit"
					>Sign Up</button>
				</div>
			</form>
		</div>

		   </Col>
                    </Row>
                </Container>

	)
}
}

export default Signup;