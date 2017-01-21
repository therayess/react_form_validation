import React from 'react';
import { Link, browserHistory } from 'react-router';
import Breadcrumbs from './Breadcrumbs';
import { InputField, SelectField } from './FormFields';

class Register extends React.Component {
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
						Register
						<small>Create an account and get started today.</small>
					</h1>

					{this.state.formErrors ? 
						<div className="notification error mb3">
							<strong>Oh snap!</strong> Looks like you need to adjust a few things. <a href="#" onClick={this.goToError}>Go to first error</a>
							<a href="#" className="right"><i className="fa fa-times" aria-hidden="true"></i></a>
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
												uniqueName='forename'
												fieldText='Forename*'
												placeholderText='Forename' />

									<InputField formSubmitting={this.state.submitting} 
												validateFields={this.validateFields}
												fieldType='text'
												isRequired={true}
												maxLength = {100}
												uniqueName='surname'
												fieldText='Surname*'
												placeholderText='Surname' />

									<div className="cols-wrapper">
										<div className="side-col">
											<SelectField formSubmitting={this.state.submitting} 
														validateFields={this.validateFields}
														isRequired={true}
														uniqueName='sex'
														fieldText='Sex*'
														options={['Male', 'Female']}
														placeholderText='Please select' />
										</div>

										<div className="main-col">
											<InputField formSubmitting={this.state.submitting} 
														validateFields={this.validateFields}
														fieldType='text'
														isRequired={true}
														isDate={true}
														uniqueName='dob'
														fieldText='Date of birth*'
														placeholderText='Select dates' />
										</div>
									</div>

									<InputField formSubmitting={this.state.submitting} 
												validateFields={this.validateFields}
												fieldType='email'
												isRequired={true}
												uniqueName='email'
												fieldText='Email Address*'
												placeholderText='Email address' />

									<InputField formSubmitting={this.state.submitting} 
												validateFields={this.validateFields}
												fieldType='email'
												verifyField='email'
												isRequired={true}
												uniqueName='email_verify'
												fieldText='Verify Email Address*'
												placeholderText='Verify email address' />

									<InputField formSubmitting={this.state.submitting} 
												validateFields={this.validateFields}
												fieldType='password'
												isRequired={true}
												minLength={7}
												maxLength = {25}
												showPasswordTrigger = {true}
												uniqueName='password'
												fieldText='Password*'
												placeholderText='Password'
												subTextElement='Use between 7 - 25 characters. At least one uppercase character. At least one number.' />

									<div className="text-right">
										<input type="submit" className="ts-btn grey" value="Register" />
									</div>
								</form>
							</div>
						</div>

						<div className="side-col text-center flex">
							<div className="full-width valign-wrapper">
								<div className="valign margin-center">
									<h3>Already a member?</h3>
									<Link to="/login" className="ts-btn default">Login</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

module.exports = Register;
