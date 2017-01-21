import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
	componentDidUpdate(prevProps) {
		// On page change, close the mobile menu
		if (prevProps.location.pathname != this.props.location.pathname) {
			if ($(".nav-mobile").hasClass('active')) {
				$(".nav-mobile").removeClass('active');
				$(".overlay").removeClass('active');
			}
		}
	}
	toggleMobileMenu() {
		// Toggles the mobile menu and the overlay
		$(".nav-mobile").toggleClass('active');
		$(".overlay").toggleClass('active');
	}
    render() {
        return (
        	<section>
	            <header>
	            	<div className="container">
		            	<div className="nav-wrapper clearfix">
			            	<div className="logo-block">
				                <Link to='/' className="site-logo left">Tigerspike Test</Link>
				                <small className="ml1 left">By Ammar Rayess</small>
				            </div>

				            <ul className="ts-links-list desktop">
				            	<li><a href="#">Buy</a></li>
				            	<li><a href="#">Sell</a></li>
				            	<li><a href="#">About</a></li>
				            	<li><a href="#">Blog</a></li>
				            </ul>

				            <ul className="ts-links-list right desktop">
				            	<li className="pink"><Link to="/register">Sign up</Link></li>
				            	<li className="purple"><Link to="/login">Login</Link></li>
				            </ul>
				            
				            <a className="nav-mobile-link right mobile" onClick={this.toggleMobileMenu.bind(this)}>
				            	<i className="fa fa-bars" aria-hidden="true"></i>
				            </a>
				        </div>
				    </div>
	            </header>

	            <ul className="nav-mobile mobile">
	            	<li><a href="#">Buy</a></li>
	            	<li><a href="#">Sell</a></li>
	            	<li><a href="#">About</a></li>
	            	<li><a href="#">Blog</a></li>
	            	<li><Link to="/register">Sign up</Link></li>
				    <li><Link to="/login">Login</Link></li>
	            </ul>

	            <div className="overlay" onClick={this.toggleMobileMenu.bind(this)}></div>
			</section>
        )
    }
}

module.exports = Header;
