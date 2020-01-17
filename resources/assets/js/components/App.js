import Header from './Header'
import Router from '../routes'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ProjectStore } from '../stores'
import NotificationSystem from 'react-mobx-notification-system'

const stores = {
	ProjectStore,
}

window._____APP_STATE_____ = stores;

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<Router />
					<NotificationSystem />
				</div>
			</BrowserRouter>
		)
	}
}

ReactDOM.render(<Provider {...stores}><App /></Provider>, document.getElementById('app'));
