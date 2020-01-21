import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotificationStore from 'react-mobx-notification-system'

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			isLoggedIn: false,
			redirect: props.redirect,
		}
		this.handleOnClickLogut = this.handleOnClickLogut.bind(this);
	}

	componentWillMount() {
		let state = localStorage["appState"];
		if (state) {
			let AppState = JSON.parse(state);
			this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
		}
	}

	handleOnClickLogut(e) {
		let state = localStorage["appState"];
		let AppState = JSON.parse(state);
		axios.get('api/logout', {
			headers: {
				'Authorization': `Bearer ${AppState.user.access_token}`
			}
		})
			.then(res => {
				if (res.status == 200 && res.data.message == 'User successfully logged out.') {
					NotificationStore.addNotification({
						title: res.statusText,
						message: res.data.message,
						level: 'success',
						position: 'tr'
					});
					let appState = {
						isLoggedIn: false,
						user: {}
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
				if (err.response.status == 401) {
					if (err.response.data.message == 'Token has expired' || err.response.data.message == 'The token has been blacklisted') {
						let appState = {
							isLoggedIn: false,
							user: {}
						};
						localStorage["appState"] = JSON.stringify(appState);
						console.log(appState)
						this.setState({
							isLoggedIn: appState.isLoggedIn,
							user: appState.user,
						});
						location.reload()
					}
					NotificationStore.addNotification({
						title: err.response.statusText,
						message: err.response.data.message,
						level: 'error',
						position: 'tr'
					});
				}
			})
	}


	render() {
		const isLoggedIn = this.state.isLoggedIn;
		return (
			<nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
				<div className='container'>
					<Link className='navbar-brand' to='/'>Tasksman</Link>
					{isLoggedIn == false ? null : <a href="#" className='navbar-brand' onClick={this.handleOnClickLogut}>Logout</a>}
				</div>
			</nav>
		)
	}
}
