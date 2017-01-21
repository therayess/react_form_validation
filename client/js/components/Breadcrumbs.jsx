import React from 'react';
import { Link } from 'react-router';

class Breadcrumbs extends React.Component {
	render() {
		// I render the breadcrumbs by fetching the app's react-router routes object which
		// has all the info i need to render the breadcrumbs (i.e.: path and name)
		const routes = this.props.routes;
		return (
			<div className="breadcrumbs-bar">
				<div className="container">
					{routes.map((route, index) => (
						<span className="breadcrumb" key={index}>
							{index < routes.length -1 ? <span><Link to={route.path}>{route.name}</Link> > </span> : `${route.name}`}
						</span>
					))}
				</div>
			</div>
		)
	}
}

module.exports = Breadcrumbs;
