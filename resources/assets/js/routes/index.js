import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewProject from '../components/NewProject'
import ProjectsList from '../components/ProjectsList'
import SingleProject from '../components/SingleProject'

const Router = () => (
	<Switch>
		<Route exact path='/' component={ProjectsList} />
		<Route path='/create' component={NewProject} />
		<Route path='/project/:projectID' component={SingleProject} />
	</Switch>
);
export default Router;
