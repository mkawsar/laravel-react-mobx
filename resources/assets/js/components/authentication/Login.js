import axios from 'axios'
import React, { Component } from 'react'
import NotificationStore from 'react-mobx-notification-system'

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				email: '',
				password: '',
			},
			errors: [],
			isLoggedIn: false,
			redirect: props.redirect,
		}
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleSubmitLoginForm = this.handleSubmitLoginForm.bind(this);
	}
	componentWillMount() {
		let state = localStorage["appState"];
		if (state) {
			let AppState = JSON.parse(state);
			this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
		}
	}
	componentDidMount() {
		const { prevLocation } = this.state.redirect || { prevLocation: { pathname: '/' } };
		if (prevLocation && this.state.isLoggedIn) {
			return this.props.history.push(prevLocation);
		}
		document.title = 'Login';
	}

	hasErrorFor(field) {
		return !!this.state.errors[field]
	}

	renderErrorFor(field) {
		if (this.hasErrorFor(field)) {
			return (
				<span className='invalid-feedback'>
					<strong>{this.state.errors[field][0]}</strong>
				</span>
			)
		}
	}

	handleEmail(e) {
		let value = e.target.value;
		this.setState(prevState => ({
			user: {
				...prevState.user, email: value
			}
		}));
	}
	handlePassword(e) {
		let value = e.target.value;
		this.setState(prevState => ({
			user: {
				...prevState.user, password: value
			}
		}));
	}

	handleSubmitLoginForm(e) {
		e.preventDefault();
		var $this = this;
		axios.post('api/login', this.state.user)
			.then(res => {
				if (res.status == 200 && res.data.status == 'error') {
					var errors = res.data.message;
					Object.values(errors).forEach((value, index) => {
						NotificationStore.addNotification({
							title: 'Error',
							message: value[0],
							level: res.data.status,
							position: 'tr'
						});
					})
				}

				if (res.status == 200 && res.data.status == 'success') {
					let userData = {
						id: res.data.data.user.id,
						name: res.data.data.user.name,
						email: res.data.data.user.email,
						access_token: res.data.data.token,
					};
					let appState = {
						isLoggedIn: true,
						user: userData
					};
					localStorage["appState"] = JSON.stringify(appState);
					this.setState({
						isLoggedIn: appState.isLoggedIn,
						user: appState.user,
					});
					location.reload()
				}
			})
			.catch(err => {
				NotificationStore.addNotification({
					title: 'Error',
					message: err.response.data.message,
					level: err.response.data.status,
					position: 'tr'
				});
			})
	}

	render() {
		return (
			<div className='container py-4'>
				<div className='row justify-content-center'>
					<div className='col-md-8'>
						<div className='card'>
							<div className='card-header'>Login Form</div>
							<div className='card-body'>
								<form onSubmit={this.handleSubmitLoginForm}>
									<div className='form-group'>
										<label htmlFor='name'>Email</label>
										<input
											id='email'
											type='email'
											className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
											name='email'
											onChange={this.handleEmail}
										/>
										{this.renderErrorFor('email')}
									</div>
									<div className='form-group'>
										<label htmlFor='name'>Password</label>
										<input
											id='password'
											type='password'
											className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
											name='password'
											onChange={this.handlePassword}
										/>
										{this.renderErrorFor('password')}
									</div>
									<button className='btn btn-primary'>Login</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
