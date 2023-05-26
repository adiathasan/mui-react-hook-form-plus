'use client';

type Required = { message: string; value?: boolean } | boolean;
type RegexInternal = { value: RegExp; message: string };
type MaxLength = { value: number; message: string };
type MinLength = { value: number; message: string };
type ValidateFieldFn = (value: string) => Promise<string> | string;

export interface Validator {
	required?: Required;
	regex?: RegexInternal;
	maxLength?: MaxLength;
	minLength?: MinLength;
	validateField?: ValidateFieldFn;
}

/**
 *
 * @param {Validator} validator
 * @returns
 */
export const simpleValidator = (validator: Validator = {}) => {
	return async (value: string = '') => {
		if (value === null || value === undefined) {
			return;
		}

		const { regex, maxLength, minLength, required, validateField } = validator;

		if (typeof required === 'object' && !value) {
			return required.message;
		}

		if (typeof required === 'boolean' && !value) {
			return 'Required';
		}

		if (minLength && !!value && value.length < minLength.value) {
			return minLength.message;
		}

		if (maxLength && !!value && value.length > maxLength.value) {
			return maxLength.message;
		}

		/**
		 * we don't trim the value here, because we want to validate the whole value
		 */
		if (regex && !regex.value.test(value)) {
			return regex.message;
		}

		if (validateField && !!value && typeof validateField === 'function') {
			return validateField(value);
		}

		return;
	};
};

/**
 * @description Use this hook to validate input value. To use it you need to call the validate function with the value and the validator.
 * @returns an object with the following properties:
 * validate: a function that takes a value and returns an error message if the value is invalid
 */
export function useInputValidate() {
	return (validator: Validator = {}) => {
		return {
			validate: async (value: string = '') => {
				return simpleValidator(validator)(value);
			},
		};
	};
}
