import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewProject from '../components/NewProject'
import ProjectsList from '../components/ProjectsList'

const Router = () => (
	<Switch>
		<Route exact path='/' component={ProjectsList} />
		<Route path='/create' component={NewProject} />
	</Switch>
);
export default Router;
