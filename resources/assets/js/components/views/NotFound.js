import React, { Component } from 'react'

export default class NotFound extends Component {
	render() {
		return (
			<div className='container py-4'>
				<div className='row justify-content-center'>
					<div className='col-md-6'>
						<div className='card'>
							<div className='card-header'>Back to home</div>
							<div className='card-body'>
								<p>Opos! Not Found</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
