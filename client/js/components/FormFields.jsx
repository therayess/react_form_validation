import React from 'react';
import helpers from '../helpers/helperFunctions';

// Error messages object, save all the relevant messages here to be used in the Fields classes
const errorMessagesArr = { required: 'This field is required',
							minLength: (value) => 'This field requires a minimum of ' + value + ' characters',
							maxLength: (value) => 'The entered number of characters exceed the maximum limit of ' + value + ' characters',
							date: 'Invalid date, format should be mm/dd/yyyy',
							email: 'Invalid email address',
							verify: (value) => 'The entered string should match the one in the ' + value + ' field'
						};

// FieldValidator manages the component state, life cycle and communication with the parent form
class FieldValidator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fieldIsValid: true,
			errorMessages: [],
			fieldValidated: false
		}

		this.handleInput = this.handleInput.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.validateField = this.validateField.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		// This listens to the form submit action signal passed down from the parent form
		// and triggers the validation for the field accordingly

		if (nextProps.formSubmitting) {
			this.handleFormSubmit();
		}
	}
	componentDidUpdate(prevProps, prevState) {
		// After field is validated and component updated accordingly with an error or no error;
		// we run the callback function to signal the parent form that the field validation is done
		// and accordingly; the parent form will handle the submission and the checking for invalid fields

		if (!prevState.fieldValidated && this.state.fieldValidated) {
			this.props.validateFields();

			this.setState({ fieldValidated: false });
		}
	}
}

// InputField handles creating and event binding of all input fields like text, password, email, etc..
class InputField extends FieldValidator {
	handleInput(e) {
		// Handles form validation on field input-related events
		this.validateField(e.target.value);
	}
	handleFormSubmit() {
		// Handles form validation on parent form submit event
		let fieldValue = $('input[name=' + this.props.uniqueName + ']')[0].value;
		
		this.validateField(fieldValue);
	}
	validateField(fieldValue) {
		// Here we run our validation and update the state with the result

		let isValid = true,
			errorMessages = [];

		// Required fields check
		if (this.props.isRequired) {
			if (fieldValue.trim() == '') {
				isValid = false;
				errorMessages.push(errorMessagesArr['required']);
			}
		}

		// Min length check
		if (this.props.minLength && this.props.minLength > 0) {
			if (fieldValue.length < this.props.minLength) {
				isValid = false;
				errorMessages.push(errorMessagesArr['minLength'](this.props.minLength));
			}
		}

		// Max length check
		if (this.props.maxLength) {
			if (fieldValue.length > this.props.maxLength) {
				isValid = false;
				errorMessages.push(errorMessagesArr['maxLength'](this.props.maxLength));
			}
		}

		// Date format check
		if (this.props.isDate) {
			 if (!helpers.isValidDate(fieldValue)) {
			 	isValid = false;
				errorMessages.push(errorMessagesArr['date']);
			 }
		}

		// Email format check
		if (this.props.fieldType == 'email') {
			if (!helpers.isValidEmail(fieldValue)) {
			 	isValid = false;
				errorMessages.push(errorMessagesArr['email']);
			 }
		}

		// Verify fields check
		if (this.props.verifyField) {
			let targetFieldValue = $('input[name=' + this.props.verifyField + ']')[0].value;
			if (fieldValue != targetFieldValue) {
				isValid = false;
				errorMessages.push(errorMessagesArr['verify'](this.props.verifyField));
			}
		}

		this.setState({ fieldIsValid: isValid, errorMessages: errorMessages, fieldValidated: true });
	}
	togglePassword(e) {
		if (e.target.checked) {
			$('input[name=' + this.props.uniqueName + ']').attr('type', 'text');
		}
		else {
			$('input[name=' + this.props.uniqueName + ']').attr('type', 'password');
		}
	}
	render() {
		return (
			<div className={this.state.fieldIsValid ? 'input-group' : 'input-group error'}>
				<label htmlFor={this.props.uniqueName}>{this.props.fieldText}</label>

				<div className={`relative ${this.props.showPasswordTrigger ? 'field-extra' : null}`}>
					<input type={this.props.fieldType} name={this.props.uniqueName}  
										placeholder={this.props.placeholderText}  
										onBlur={this.handleInput}
										className={`${this.props.isDate ? 'date' : null } 
													${!this.state.fieldIsValid ? 'invalid-field' : null} 
													${this.props.showPasswordTrigger ? 'prime' : null}`} />

					{this.props.isDate ? 
						<span className="date-calendar"><i className=" fa fa-calendar"></i></span>
					:null }

					{this.props.showPasswordTrigger ? 
						<div className="sub text-center">
							<label>
								<input type="checkbox" name="show_password" onClick={this.togglePassword.bind(this)} />
								<span>Show</span>
							</label>
						</div>
					: null }
				</div>

				{!this.state.fieldIsValid ? 
					this.state.errorMessages.map((message, index) => (
						<small className="error-msg" key={index}>{message}</small>
					))
				: null }

				{this.props.subTextElement ? ( <small>{this.props.subTextElement}</small> ) : null}
			</div>
		)
	}
}

// For select fields and managing their actions i.e: onChange, onBlur, etc.
class SelectField extends FieldValidator {
	handleInput(e) {
		// Handles form validation on field input-related events
		this.validateField(e.target.value);
	}
	handleFormSubmit() {
		// Handles form validation on parent form submit event
		let fieldValue = $('select[name=' + this.props.uniqueName + ']')[0].value;

		this.validateField(fieldValue);
	}
	validateField(fieldValue) {
		// Here we run our validation and update the state with the result

		let isValid = true,
			errorMessages = [];

		// Required fields check
		if (this.props.isRequired) {
			if (fieldValue == '-') {
				isValid = false;
				errorMessages.push(errorMessagesArr['required']);
			}
		}

		this.setState({ fieldIsValid: isValid, errorMessages: errorMessages, fieldValidated: true });
	}
	render() {
		return (
			<div className={this.state.fieldIsValid ? 'input-group' : 'input-group error'}>
				<label htmlFor={this.props.uniqueName}>{this.props.fieldText}</label>

				<div className="relative">
					<select name={this.props.uniqueName} 
							onChange={this.handleInput} 
							onBlur={this.handleInput}
							className={!this.state.fieldIsValid ? 'invalid-field' : null}>
						<option value="-">{this.props.placeholderText}</option>
						{this.props.options.map((option, index) => (
							<option key={index} value={option}>{option}</option>
						))}
					</select>
				</div>

				{!this.state.fieldIsValid ? 
					this.state.errorMessages.map((message, index) => (
						<small className="error-msg" key={index}>{message}</small>
					))
				: null }

				{this.props.subTextElement ? ( <small>{this.props.subTextElement}</small> ) : null}
			</div>
		)
	}
}

module.exports = { InputField, SelectField };
