// Wrap in IIFE
$(function($) {

	'use strict';

	/**
	 * Simple form validation.
	 */

	/**
	 * Helper function to transform first letter of the string to upper case.
	 *
	 * @param string {string}
	 * @return string
	 */
	function firstToUpperCase(string) {
		if(typeof string === 'string') {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	}

	 /** 
	  * Constructor
	  * 
	  * @param form {jQuery}
	  * @param event {javascript}
	  * @param options {object}
	  */
	function Validation(form, options) {

		this.settings = this.mergeSettings(options);

		this.form = $(form);
		this.button = this.form.find(':button');
        this.inputs = this.getInputs();
        this.alert = null;
		this.ignored = new Array();
		this.validated = new Array();

		this.prepareForm();
		this.addEventListeners();

	}

	Validation.prototype = {

		/**
		 * Settings that apply for whole plugin.
		 */
		defaults: {

			// @todo prevent even if valid
			preventDefault: true,
			autocomplete: 'on',
			liveValidation: true,
			noValidate: true,
			disableSubmitInvalid: false, // Live validation must be set to true to make this option work.
            inputs: {},
            formInvalidAlertWarning: 'Formularz nie został wypełniony poprawnie. Popraw oznaczone pola.',

			requiredMessage: function(name) {
				return firstToUpperCase(name + ' is required'); // @todo input name empty
			}

		},

		/**
		 * Input settings.
		 */
		customSettings: {

			length: ['min', 'max'],
			range: ['min', 'max'],
			type: ['letters', 'number', 'alphanumeric', 'url', 'email', 'date'],
			hint: true,
			regexp: true,
            rqmessage: true

		},

		/** 
		 * @param options {object}
		 */
		mergeSettings: function(options) {

			return $.extend({}, this.defaults, options);

		},

		/**
		 * Prepare the form before submiting.
		 */
		prepareForm: function() {

			if(this.settings.noValidate == true) {
				// Disable html validation.
				this.form.attr('noValidate', true);
			}

			if(this.settings.autocomplete === 'off') {

				this.inputs.forEach(function(input) {
					input.getInput().autocomplete = 'off';
                });
                
			}

			this.form.addClass('validation');

		},

		/** 
		 * Find and prepare all inputs.
		 *
		 * @return array
		 */
		getInputs: function() {

			var inputs = this.form.find(':input').not('input[type = "submit"]').not('button');

			var extended = new Array();

			if(inputs.length) {

				inputs.each($.proxy(function(key, input) {


					// Create a custom object with some additional validation methods.
					input = this.extendWithValidation(input);

					// Get all data attributes.
					var data = $(input.getInput()).data();

					// Get HTML5 validation attributes if any found. If not return empty object. 
					var settings = this.getHTML5(input);

					if(!$.isEmptyObject(data)) {
                        
						// By transform data-validation-length to validationLength.
						for(var oldKey in data) {
                            
                            if(oldKey.includes('validation')) {

                                var newKey = oldKey.replace('validation', '').toLowerCase();
    
                                data[newKey] =  data[oldKey];
                                
                                delete data[oldKey];
                                
                            }

						}

                        // Single option.
						for(var option in this.customSettings) {

							if(data.hasOwnProperty(option)) {

								var temp = {};

								if(this.customSettings[option] === true) {							
									temp = data[option];
								}
								else {
									// Split even if there is only one option (working on arrays down here).
									var attributes = data[option].split(',');
									
									attributes.forEach($.proxy(function(element) {
										if(element.includes(':')) {
											var attribute = element.split(':');

											// Check if attribute exists.
											if(this.customSettings[option].includes(attribute[0])) {
												// key = value
												temp[attribute[0]] = attribute[1];
											}
										}
										else {
											if(this.customSettings[option].includes(element)) {
												temp = element;
											} 
										}
									}, this));
									
								}

								if(!$.isEmptyObject(temp)) {
									// Merge HTML5 and custom settings. 
									if(settings.hasOwnProperty(option)) {
										settings[option] = $.extend(settings[option], temp);
									}
									else settings[option] = temp; 
								}

							}

						}

					}

					if(input.getInput().required && !settings.hasOwnProperty('type')) settings.type = input.getInput().type;

					if(!$.isEmptyObject(settings)) {
						input.setSettings(settings);
					}

					extended.push(input);

				}, this));

			}

			return extended;

		},

		/**
		 * Extend default javascript object with some additional validation methods and properties.
		 * 
		 * @param input {javascript}
		 * @return object
		 */ 
		extendWithValidation: function(input) {

			var extended = {

				'input': input, // Original input.
				'validationSettings': null,

				setSettings: function(settings) {
					this.validationSettings = settings;
				},

				getInput: function() {
					return this.input;
                },
                
                getName: function() {
                    return ($(this.input).data('name')) ? $(this.input).data('name') : this.input.name;
                }

			}

			return extended;

		},

		/**
		 * Get HTML5 validation attributes if any found. If not return empty object. 
		 * @todo another look, maybe I can do it better.
		 * @param input {object}
		 * @return object
		 */
		getHTML5: function(input) {

			var html5 = {};

			if(input.getInput().minLength !== -1) var minLength = input.getInput().minLength;
			if(input.getInput().maxLength !== -1) var maxLength = input.getInput().maxLength;
			if(input.getInput().min) var min = input.getInput().min;
			if(input.getInput().max) var max = input.getInput().max;
			if(input.getInput().pattern) var regexp = input.getInput().pattern;

			if(minLength || maxLength) {
				html5.length = {};
				if(minLength) html5.length.min = minLength;
				if(maxLength) html5.length.max = maxLength;
			}

			if(min || max) {
				html5.range = {};
				if(min) html5.range.min = min;
				if(max) html5.range.max = max;
			}

			if(regexp) html5.regexp = regexp;

			return html5;

		},

		/**
		 * Add input to the ignored array.
		 * 
		 * @param input {object}
		 */
		ignore: function(input) {
			
			this.ignored[input.attr('name')] = input;

		},

		/**
		 * Check if input isn't empty.
		 * 
		 * @param input {javascript}
		 * @return bool
		 */
		isEmpty: function(input) {

			// Input might be a checkbox.
			if(input.getInput().type == 'checkbox' || input.getInput().type == 'radio') {
				if(input.getInput().checked === false) return true;
			}
			else {
				if(!input.getInput().value.length) {
					return true;
				}
			}

			return false;

		},

		/**
		 * Custom validation.
		 * 
		 * @param input {javascript}
		 */
		custom: function(input) {

			var valid = true;

			for(var option in input.validationSettings) {

				var settings = input.validationSettings[option];

				switch(option) {
					case 'type':

						/*var type = settings.toLowerCase();

						if(typeof this[type] == 'function') {
							valid = this[type](input);
						}*/

						switch(settings.toLowerCase()) {

							case 'password':
								valid = this.password(input);

								if(!valid) throw firstToUpperCase(input.getName()) + ' must be at least 8 characters long.';
							break;

							case 'email':
								// Email method is already defined.
								valid = this.email(input);

								if(!valid) throw 'Invalid email address';
							break;

							case 'url':
								// Url method is already defined.
								valid = this.url(input);

								if(!valid) throw 'Invalid url';
							break;

							case 'alphanumeric':
								var regex = /^[a-z0-9]+$/i;
								valid = this.checkRegex(input.getInput().value, regex);

								if(!valid) throw 'Only letters and numbers allowed.';
							break;


							case 'number':
								if(isNaN(input.getInput().value)) throw 'Not a number.';
							break;

							case 'letters':
								var regex = /^[a-z]+$/i;
								valid = this.checkRegex(input.getInput().value, regex);

								if(!valid) throw 'Only letters allowed';								
							break;


							case 'date':
								//@todo date
							break;

						}

					break;
					case 'range':
						var value = input.getInput().value;

						// Must be a number
						if(!isNaN(value)) {	
							valid = this.checkRange(value, settings.min, settings.max);

							if(!valid) {
								if(settings.min && settings.max) {
									throw firstToUpperCase(input.getName()) + ' must be in range of ' + settings.min + ' and ' + settings.max + '.';
								}
								else if(settings.min && !settings.max) {
									throw firstToUpperCase(input.getName()) + ' must be at least ' + settings.min;
								}
								else if(settings.max && !settings.min) {
									throw firstToUpperCase(input.getName()) + ' can be maximum of ' + settings.max;
								}
							} 
						}
					break;
					case 'length':
						var length = input.getInput().value.length;

						valid = this.checkLength(length, settings.min, settings.max);

						if(!valid) {
							if(settings.min && settings.max) {
								throw firstToUpperCase(input.getName()) + ' must be between ' + settings.min + ' and ' + settings.max + ' characters long.';
							}
							else if(settings.min && !settings.max) {
								throw firstToUpperCase(input.getName()) + ' must be at least ' + settings.min + ' characters long.';
							}
							else if(settings.max && !settings.min) {
								throw firstToUpperCase(input.getName()) + ' can be maximum ' + settings.max + ' characters long.';
							}
						} 

					break;
					case 'regexp':

						regex = new RegExp(settings);

						valid = this.checkRegex(input.getInput().value, regex);

						if(!valid) throw 'Regexp error';						

					break;
				}

			}

		},

		/**
		 * Validate password.
		 * 
		 * @param input {javascript}
		 * @return boolean
		 */
		password: function(input) {

			var length = input.getInput().value.length;

			return this.checkLength(length, 8); // checkLength() returns true/false.
		},

		/**
		 * Validate email address.
		 * 
		 * @param input {javascript}
		 * @return boolean
		 */
		email: function(input) {

			var value = input.getInput().value;

			// Email address regex.
			var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			return this.checkRegex(value, regex); // checkRegex() returns true/false.	
		},

		/**
		 * Validate url. Not perfect but it works good enough.
		 * 
		 * @param input {javascript}
		 * @return boolean
		 */
		url: function(input) {

			var value = input.getInput().value;

			var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

			return this.checkRegex(value, regex);

		},

		/**
		 * Check length.
		 * 
		 * @param length {int}
		 * @param min {int}
		 * @param max {int}
		 * @return bool
		 */ 
		checkLength: function(length, min = 0, max) {

			if(length) length = parseInt(length);
			if(min) min = parseInt(min);
			if(max) max = parseInt(max);

			if(max) {
				return (length >= min && length <= max) ? true : false;
			}
			else {
				return (length >= min) ? true : false;
			}

		},

		/**
		 * Check if value is within a specified range.
		 *
		 * @param length {int}
		 * @param min {int}
		 * @param max {int}
		 * @return bool
		 */ 
		checkRange: function(value, min, max) {

			if(value) value = parseInt(value);
			if(min) min = parseInt(min);
			if(max) max = parseInt(max);

			if(min && max) {
				return (value >= min && value <= max) ? true : false;
			}
			else if(min && !max) {
				return (value >= min);
			}
			else if(max && !min) {
				return (value <= max) ? true : false;	
			}
			else {
				return true;
			}

		},

		/**
		 * Regex test.
		 * 
		 * @param regex {string}
		 * @param value {string}
		 * @return bool
		 */ 
		checkRegex: function(value, regex) {

			return regex.test(value);

		},

		/**
		 * Input is invalid. Set error and styles.
		 *
		 * @param input {object}
		 * @param message {string}
		 */ 
		isInvalid: function(input, message) {

			var $input = $(input.getInput());
			var div = $input.next('.error-message');

			$input.addClass('is-invalid');

			// Check if error message for this input already exists.
			if(!div.length) {

				div = $('<div/>', {
					'class': 'error-message',
					'data-validation-error-message': $input.attr('name'),
					'text': message
				});
				
				$input.after(div);
			}
			else {
				div.text(message);
			}

		},

		/**
		 * Input valid. Remove any error messages.
		 *
		 * @param input {object}
		 */ 
		isValid: function(input) {

			var $input = $(input.getInput());
			var div = $input.next('.error-message');

			//$input.removeClass('is-invalid').addClass('is-valid');
			$input.removeClass('is-invalid');
			div.remove();

        },
        
		/**
		 * Display and scroll to alert.
		 */ 
        displayWarningAlert: function() {

            // Check if alert is already displayed. If not, add create it and prepend to the form.
            if(!this.alert) {
                this.alert = $('<div/>', {
                    'class': 'alert alert-danger',
                    'text': this.settings.formInvalidAlertWarning
                });
                
                this.form.prepend(this.alert);
            }

            //Scroll to the alert.
            $(document.documentElement, document.body).animate({
                scrollTop: this.alert.offset().top - 80 // 80 px offset.
            }, 600);

        },

		/**
		 * Main validation method.
		 * When inputs are required and empty - throw error.
		 * When inputs are not required and empty do nothing. 
		 * When inputs are not empty and having custom settings, validate for content. 
		 *
		 * @param event {event}
		 */
		validateForm: function(event) {

            if(this.inputs.length) {

                var validated = new Array();

                this.inputs.forEach($.proxy(function(input, key) {
    
                    try {
    
                        // First, check if input is empty.
                        var empty =  this.isEmpty(input);
    
                        // Required but empty - throw error.
                        if(empty && input.getInput().required) {

                            // Check for custom message or call requiredMessage function.
                            throw (input.validationSettings && input.validationSettings.rqmessage) ? input.validationSettings.rqmessage : this.settings.requiredMessage.call(input, input.getName());
                        }

                        // Not empty, check for custom settings.
                        if(!empty && input.validationSettings) {
                            this.custom(input);
                        }
                        
                    }
                    catch(errorMessage) {
                        validated[key] = errorMessage;
                    }
    
                }, this));
    
                // Form is not valid.
                if(validated.length) {

                    this.displayWarningAlert();

                    // Create alert - not valid.
                    if(this.settings.preventDefault === true) event.preventDefault();
                    if(this.settings.disableSubmitInvalid === true && this.settings.liveValidation === true) this.button.attr('disabled', true);
                    
                }
                else {
                    // Form is valid, remove alert.
                    this.alert.remove();
                }
    
                this.inputs.forEach($.proxy(function(input, key) {
                    
                    if(validated.hasOwnProperty(key)) {
                        this.isInvalid(input, validated[key]);
                    }
                    else {
                        this.isValid(input);
                    }
    
                }, this));
                
            }

		},

		/**
		 * Use when validating a single input.
		 *
		 * @param input {javascript}
		 */
		validateInput: function(input) {

			try {

				// First, check if input is empty.
				var empty =  this.isEmpty(input);

				// Required and empty - throw error.
		 		if(empty && input.getInput().required) {
                    throw (input.validationSettings && input.validationSettings.rqmessage) ? input.validationSettings.rqmessage : this.settings.requiredMessage.call(input, input.getName());
		 		}

		 		// Not empty, check for custom settings.
		 		if(!empty && input.validationSettings) {
		 			this.custom(input);
		 		}
				
			}
			catch(error) {
				var message = error;
			}

			// If input is invalid, set error.
			if(message) {
				this.isInvalid(input, message);
			}
			else {
				this.isValid(input); // @todo not working with not required? Check live validation example - bio - textarea
			}

		},

		/**
		 * Event listeners.
		 */ 
		addEventListeners: function() {

			this.inputs.forEach($.proxy(function(input) {

				var $input = $(input.getInput());

				/**
				 * Live validation.
				 * @todo on blur
				 */
				if(this.settings.liveValidation) {

					$input.on('keyup', $.proxy(function() {

						this.validateInput(input);

					}, this));

				}

				/**
				 * Display hint on focus.
				 */
				$input.on('focus', function() {

					if(input.validationSettings && input.validationSettings.hint) {

						var div = $('[data-validation-hint-message=' + input.getName() + ']');

						if(!div.length) {

							div = $('<div/>', {
								'class': 'hint-message',
								'data-validation-hint-message': input.getName(),
								'text': input.validationSettings.hint
							});
								
							$input.after(div);
						}

					}

				});

				/**
				 * Remove hint on blur.
				 */
				$input.on('blur', function() {

					if(input.validationSettings && input.validationSettings.hint) {

						var div = $('[data-validation-hint-message=' + input.getName() + ']');

						if(div.length) {

							div.remove();

						}

					}

				});

			}, this));

		}

	}

	/**
	 * Register validation as jQuery plugin.
	 *
	 * @param options {object}
	 */
	$.fn.validation = function(options) {

		if(this.is('form')) {

			var validation = new Validation(this, options);

			this.on('submit', function(event) {

				validation.validateForm(event);

			});

		}

	}

});