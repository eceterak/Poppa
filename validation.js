/**
 * It's a jQuery plugin so use this function like any other jQuery function: $(form).validation().
 * It will check all required and additional inputs set in settings.inputs. Result of validation test is saved into inputsValid array.
 * If any of the inputsValid value is false, the whole form is not valid.
 * How to use settings:
 * To check custom input (not required) set:
 * inputs: {
 * 	user_password: { 	// Input name
 *		min: 3, 	// required
 *		max: 20, 	// required
 *		regexp: { 	// additional regexp
 *			code: /^[some regexp/, // required if regexp set
 *			message: 'Not allowed' // required if regexp set
 *		},
 *      confirm: true,	// Set to confirm input
 *		message: 'User name must be between 3 and 20 characters long' // required
 *	},
 * preventDefault is enabled by default. To dissable it set: prevent: false in settings.
 * @param {object} settings
 * @param {event} event
 * @return bool
 */

$.fn.validation = function(event, settings = null) {
	// Works only on forms.
	if(this.is("form")) {
		var formValid = false;
		var inputsValid = [];
		var $this = this;
		var prevent = true;
		var formContainer = $(this).closest('.form-container');
		if(settings !== null && settings.hasOwnProperty('prevent')) prevent = settings.prevent;
		$('.inv-feedback').remove(); // Remove all old messages.
		if(settings !== null && settings.inputs !== null) {
			var keys = Array();
			$.each(settings.inputs, function(key, value) {
				var custom = $this.find('input[name = "' + key + '"]');
				if(custom.length > 0) {
					keys.push(key);
					inputsValid.push(checkInput(custom, value)); // It returns true/false.
				}
			});
		}
		this.find(':input').not('input[type = "submit"]').each(function() {
			if($(this).prop('required')) {
				// Validate required inputs appart from those already tested.
				if(typeof keys === 'undefined' || (!keys.includes($(this).attr('name')))) {
					inputsValid.push(checkInput($(this)));
				}
			}
		});
		if(prevent == true) event.preventDefault();
		var val = Object.values(inputsValid);
		if(!val.includes(false)) formValid = true;
		if(formValid == false) {
			formContainer.find(".dialog-message-error").text('Please correct errors.');
			formContainer.find(".dialog-message-error").removeClass("d-none");
		}
		return formValid; // Returns true/false
	}
	
	/**
	 * Run proper function for each input type.
	 * @param {object} input
	 * @param {object} settings
	 */

	function checkInput(input, settings = null) {
		var isValid = false;
		var min = 3;
		var max = 20;
		var regexp = null;
		var message = 'Error';
		if(settings !== null) {
			min = settings.min; // Min && max must be set in settings.
			max = settings.max;
			message = settings.message;
			if(settings.hasOwnProperty('regexp')) {
				regexp = settings.regexp.code;
				var regexpMessage = settings.regexp.message; // Regexp has it's own message.
			}
			if(settings.hasOwnProperty('confirm') && settings.confirm === true) {
				var index = input.index('input'); // Find index of the current input.
				var nextIndex = index + 1; // Next input - index is higher by one.
				var confirm = $('input').eq(nextIndex);
				setMessage(confirm); // Set confirm input to invalid by default.
			}
		}
		isValid = checkLength(input, min, max, message); // First, check length.
		if(regexp !== null && isValid) {
			isValid = isValid && checkRegexp(input, regexp, regexpMessage); // true && false == false
		}
		if(settings !== null && confirm && isValid) {
			isValid = isValid && checkConfirm(input, confirm);
		}
		return isValid;
	}

	/**
	 * Check if input value is the right length.
	 * If input is empty, set 'Required' message.
	 * @param {object} input
	 * @param {int} min
	 * @param {int} max
	 * @param {string} message
	 * @return bool
	 */

	function checkLength(input, min, max, message) {
		var inputLength = input.val().length;
		var isValid = false;
		if(inputLength == 0) {
			setMessage(input, 'Required');
		}
		else {
			if(inputLength < min || inputLength > max) {
				setMessage(input, message);
			}
			else {
				inputValid(input);
				isValid = true;
			}		
		}
		return isValid;
	}

	/**
	 * Test input for regexp. 
	 * @param {object} input
	 * @param {string} regexp
	 * @param {string} message
	 * @return bool
	 */

	function checkRegexp(input, regexp, message) {
		var inputValue = input.val();
		var isValid = false;
		if(!(regexp.test(inputValue))) {
			setMessage(input, message);
		}
		else {
			inputValid(input);
			isValid = true;
		}
		return isValid;
	}

	/**
	 * If input needs to be confirmed (like password or email), get a values of current input and of closest to it input.
	 * If input values do not match, return false and set error message for both inputs.
	 * @param {object} input
	 * @return bool
	 */

	function checkConfirm(input, confirm) {
		var password = input.val();
		var confirmPassword = confirm.val();
		var isValid = false;
		if(password !== confirmPassword) {
			setMessage(input, 'Passwords do not match.'); // Set not match for both inputs.
			setMessage(confirm, 'Passwords do not match.');
		}
		else {
			inputValid(input);
			inputValid(confirm);
			isValid = true;
		}
		return isValid;
	}

	/**
	 * Setup an error. Message is optional. 
	 * @param {object} input
	 * @param {string} message
	 */

	function setMessage(input, message = null) {
		input.removeClass('is-valid');
		input.addClass('is-invalid');
		if(message !== null) input.after('<div class = "inv-feedback"><small>' + message + '</small></div>');
	}

	/**
	 * Remove error message and set input to valid.
	 * @param {object} input
	 */

	function inputValid(input) {
		input.removeClass('is-invalid');
		input.addClass('is-valid');
	}	
}