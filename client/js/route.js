import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './components/Main';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

const route = (
	<Route name="Home" path='/' component={Main}>
		<IndexRoute name="Login" component={Login} />
		<Route name="Login" path='/login' component={Login}></Route>
		<Route name="Register" path='/register' component={Register}></Route>
		<Route name="Login Successful" path='/home' component={Landing}></Route>
	</Route>
)

module.exports = { route };
