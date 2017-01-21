import React from 'react';
import Breadcrumbs from './Breadcrumbs';

class Landing extends React.Component {
	render() {
		return (
			<section>
				<Breadcrumbs {...this.props} />

				<div className="container">
					<h1 className="my3">
						Hurrah!
						<small>You're in.</small>
					</h1>
				</div>
			</section>
		)
	}
}

module.exports = Landing;
