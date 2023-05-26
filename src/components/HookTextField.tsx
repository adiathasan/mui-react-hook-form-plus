'use client';

import * as React from 'react';
import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { callAll } from '@utils/misc';
import { Grid, GridProps, TextField, TextFieldProps } from '@mui/material';

export interface HookTextFieldProps<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
	textFieldProps?: TextFieldProps & {
		readonly notifyText?: string;
	};
	formState: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {
		/**
		 * trimWhitespaceOnBlur - Trim Whitespace on blur - default: true
		 * triggerErrorOnBlur - Trigger Error on blur - default: true
		 */
		trimWhitespaceOnBlur?: boolean;
		triggerErrorOnBlur?: boolean;
	};
}

// ====================================================

/**
 *
 * @description A text input field that uses react-hook-form to manage the form state.
 *
 * @param {HookTextFieldProps}
 * if grid props are passed in we wrap the text field in a grid
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 *
 * @returns {React.ReactElement}
 *
 */

// ====================================================
export const HookTextField = <T extends FieldValues>({
	gridProps,
	...props
}: HookTextFieldProps<T>): React.ReactElement => {
	/**
	 * if grid props are passed in we wrap the text field in a grid
	 */
	if (gridProps) {
		return (
			<Grid item {...gridProps}>
				<Component {...props} />
			</Grid>
		);
	}

	return <Component {...props} />;
};

/**
 *
 * @description The actual component that is returned from the HookTextField component
 *
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */
const Component = <T extends FieldValues>({
	textFieldProps = {},
	setValue,
	trigger,
	config = {},
	formState: { errors: _e },
	gridProps,
	...restC
}: HookTextFieldProps<T>) => {
	const { onChange, onBlur, notifyText, name: _, ...rest } = textFieldProps;

	const { trimWhitespaceOnBlur = false, triggerErrorOnBlur = false } = config;

	/**
	 * we don't want to pass onChange & onBlur to the TextField
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the textFieldProps
	 * So we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);
	const onBlurRef = React.useRef(onBlur);
	/**
	 * we update the ref on every render
	 */
	onChangeRef.current = onChange;
	onBlurRef.current = onBlur;

	const { error } = restC.control?.getFieldState(restC.name) ?? {};

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, value = '', onBlur: onBlurI, ref, name } }) => (
				<TextField
					aria-invalid={!!error ? 'true' : 'false'}
					error={!!error}
					helperText={error?.message}
					inputRef={ref}
					value={value ?? ''}
					{...rest}
					/**
					 * Here we need to call the both the onChange and the onChangeI as user might be listing to the on change of the text field props
					 */
					onBlur={callAll(onBlurI, onBlurRef.current, async () => {
						if (trimWhitespaceOnBlur) {
							const trimmedValue = typeof value === 'string' ? value.trim() : undefined;
							/**
							 * we explicitly know that it is string
							 */
							setValue?.(name, trimmedValue as any);
						}

						if (triggerErrorOnBlur) {
							await trigger?.(name);
						}
					})}
					onChange={callAll(onChangeI, onChangeRef.current)}
				/>
			)}
		/>
	);
};
