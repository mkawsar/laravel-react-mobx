import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './private.route'
import { Login } from '../components/authentication'
import NewProject from '../components/NewProject'
import ProjectsList from '../components/ProjectsList'
import SingleProject from '../components/SingleProject'
import NotFound from '../components/views/NotFound'

const Router = () => (
	<Switch>
		<Route path='/login' component={Login} />
		<PrivateRoute exact path='/' component={ProjectsList} />
		<Route path='/create' component={NewProject} />
		<Route path='/project/:projectID' component={SingleProject} />
		<Route component={NotFound} />
	</Switch>
);
export default Router;
