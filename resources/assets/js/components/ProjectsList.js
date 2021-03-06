import axios from 'axios';
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

export default class ProjectList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [],
			title: 'Project List'
		}
	}

	componentWillMount() {
		document.title = this.state.title;
	}


	componentDidMount() {
		let state = localStorage["appState"];
		let AppState = JSON.parse(state);
		axios.get('/api/projects', {
			headers: {
				'Authorization': `Bearer ${AppState.user.access_token}`
			}
		})
			.then(response => {
				this.setState({
					projects: response.data
				});
			});
	}
	render() {
		const { projects } = this.state;
		return (
			<div className='container py-4'>
				<div className='row justify-content-center'>
					<div className='col-md-8'>
						<div className='card'>
							<div className='card-header'>All projects</div>
							<div className='card-body'>
								<Link className='btn btn-primary btn-sm mb-3' to='/create'>
									Create new projects
                   				 </Link>
								<ul className='list-group list-group-flush'>
									{projects.map(project => (
										<Link
											className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
											to={`/project/${project.id}`}
											key={project.id}
										>
											{project.name}
											<span className='badge badge-primary badge-pill'>
												{project.tasks_count}
											</span>
										</Link>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
