import React from 'react';
import { Link, browserHistory } from 'react-router';
import Breadcrumbs from './Breadcrumbs';
import { InputField } from './FormFields';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formErrors: false,
			submitting: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.signalFormSubmit = this.signalFormSubmit.bind(this);
		this.validateFields = this.validateFields.bind(this);
		this.goToError = this.goToError.bind(this);
	}
	componentDidUpdate(prevProps, prevState) {
		// submitting is the signal used to communicate between the form and fields components;
		// when the fields signal back the form that they have handled the validation; we run 
		// a final check on the state's formErrors and accordingly handle formSubmit
		
		if (prevState.submitting && !this.state.submitting) {
			if (!this.state.formErrors) {
				// No errors, proceed with submitting the form
				browserHistory.push('/home');
			}
			else {
				// Errors! form won't submit
				console.log("errors!");
			}
		}
	}
	handleSubmit(e) {
		// First step when handling the form submission is to let the child fields know that
		// the form submit action has been issued, so they can run their independent validation
		// and signal back the result

		e.preventDefault();

		this.signalFormSubmit();
	}
	signalFormSubmit() {
		// By updating the submitting state field, which is passed as a prop to the FormFields child class,
		// i invoke a signal which serves to let the child class know of the form submitting action and
		// accordingly run a validation on its fields
		this.setState({ submitting: true });
	}
	validateFields() {
		// Callback function passed as prop to the FormFields child class, serves as a notification that the
		// child field has finished running it's validation, hence; i check for the form errors by looking
		// if there are any invalid fields in the form, and accordingly update the state for formErrors and submitting;
		// by updating the state fields formErrors and submitting, the class fires a componentDidUpdate change which is then used
		// to complete form submission if there are no errors

		let isValid = true;

		//  
		if ($('.invalid-field').length > 0) {
			isValid = false;
		}

		this.setState({ formErrors: isValid ? false : true, submitting: false });
	}
	goToError() {
		// Find the first invalid field and focus on it
		$('.invalid-field:eq(0)').focus();
	}
	render() {
		return (
			<section>
				<Breadcrumbs {...this.props} />
				
				<div className="container">
					<h1 className="my3">
						Login
						<small>Access your account</small>
					</h1>

					{this.state.formErrors ? 
						<div className="notification error mb3">
							<strong>Oh snap!</strong> Looks like you need to adjust a few things. <a href="#" onClick={this.goToError}>Go to first error</a>
							<a href="#" className="right" onClick={(e)=>{e.preventDefault(); $('.notification').hide()}}>
								<i className="fa fa-times" aria-hidden="true"></i>
							</a>
						</div>
					: null }

					<div className="cols-wrapper flex">
						<div className="main-col flex">
							<div className="full-width">
								<form className="ts-form" onSubmit={this.handleSubmit}>
									<InputField formSubmitting={this.state.submitting} 
												validateFields={this.validateFields}
												fieldType='text'
												isRequired={true}
												maxLength = {100}
												uniqueName='username'
												fieldText='Username*'
												placeholderText='Username' />

									<InputField formSubmitting={this.state.submitting} 
												validateFields={this.validateFields}
												fieldType='password'
												isRequired={true}
												minLength={7}
												maxLength = {25}
												uniqueName='password'
												fieldText='Password*'
												placeholderText='Password'
												subTextElement={<a href="#" className="forgot-pass">Forgot password?</a>} />

									<div className="text-right">
										<input type="submit" className="ts-btn grey" value="Login" />
									</div>
								</form>
							</div>
						</div>

						<div className="side-col text-center flex">
							<div className="full-width valign-wrapper">
								<div className="valign margin-center">
									<h3>Not a member?</h3>
									<Link to="/register" className="ts-btn default">Register today</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

module.exports = Login;
