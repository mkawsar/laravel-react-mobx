import axios from 'axios'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import NotificationStore from 'react-mobx-notification-system'

@inject('ProjectStore')
@withRouter
@observer

export default class NewProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			errors: []
		};
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleNewProjectSubmit = this.handleNewProjectSubmit.bind(this);
	}

	handleChangeProjectName = e => this.props.ProjectStore.setProjectName(e.target.value);
	handleChangeProjectDescription = e => this.props.ProjectStore.setProjectDescription(e.target.value);

	componentDidMount() {
		document.title = this.props.ProjectStore.name;
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

	handleNewProjectSubmit(e) {
		var $this = this;
		e.preventDefault();
		const project = {
			name: this.props.ProjectStore.getProjectName,
			description: this.props.ProjectStore.getProjectDescription
		}

		axios.post('api/projects', project)
			.then(res => {
				if (res.status === 200) {
					NotificationStore.addNotification({
						title: 'Success',
						message: 'Created a new project',
						level: 'success',
						position: 'br'
					});
					$this.props.history.replace('/')
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<div className='container py-4'>
				<div className='row justify-content-center'>
					<div className='col-md-6'>
						<div className='card'>
							<div className='card-header'>Create new project</div>
							<div className='card-body'>
								<form onSubmit={this.handleNewProjectSubmit}>
									<div className='form-group'>
										<label htmlFor='name'>Project name</label>
										<input
											id='name'
											type='text'
											className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
											name='name'
											onChange={this.handleChangeProjectName}
										/>
										{this.renderErrorFor('name')}
									</div>
									<div className='form-group'>
										<label htmlFor='description'>Project description</label>
										<textarea
											id='description'
											className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
											name='description'
											rows='10'
											onChange={this.handleChangeProjectDescription}
										/>
										{this.renderErrorFor('description')}
									</div>
									<button className='btn btn-primary'>Create</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
