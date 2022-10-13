import * as React from 'react';
import { Grid, GridProps, TextField, TextFieldProps } from '@mui/material';
import { MobileTimePicker, MobileTimePickerProps } from '@mui/x-date-pickers';
import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { callAll } from '../utils/misc';

export interface HookMobileTimePickerProps<TInputDate, TDate, T extends FieldValues = FieldValues>
	extends UseControllerProps<T> {
	textFieldProps?: TextFieldProps;
	mobileTimePickerProps?: Partial<MobileTimePickerProps<TInputDate, TDate>>;
	formState: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {};
}

type HookMobileTimePickerPropType<TInputDate, TDate, T extends FieldValues = FieldValues> = HookMobileTimePickerProps<
	TInputDate,
	TDate,
	T
>;

// ====================================================

/**
 *
 * @description A searchable select field that uses react-hook-form to manage the form state.
 * @param {HookMobileTimePickerProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * MobileTimePickerProps: The props to pass to the MobileTimePicker component
 * textFieldProps: The props to pass to the TextField component
 *
 * @returns {React.ReactElement}
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */

// ====================================================

export const HookMobileTimePicker = <TInputDate, TDate, T extends FieldValues = FieldValues>({
	gridProps,
	...props
}: HookMobileTimePickerPropType<TInputDate, TDate, T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookMobileTimePicker component
 *
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */
const Component = <TInputDate, TDate, T extends FieldValues = FieldValues>({
	textFieldProps = {},
	setValue,
	trigger,
	config = {},
	formState: { errors: _errors },
	gridProps,
	mobileTimePickerProps,
	...restC
}: HookMobileTimePickerPropType<TInputDate, TDate, T>) => {
	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	const { onChange, renderInput, ...restDate } = mobileTimePickerProps ?? {};

	/**
	 * we don't want to pass onChange to the MobileTimePicker
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the MobileTimePicker
	 * So we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, value, ref, name } }) => (
				<MobileTimePicker
					{...restDate}
					value={value}
					onChange={callAll((newValue: Date) => {
						onChangeI(newValue);
					}, onChangeRef.current)}
					renderInput={
						!!renderInput
							? renderInput
							: (params) => {
									return (
										<TextField
											{...params}
											{...textFieldProps}
											ref={params.inputRef}
											inputRef={ref}
											name={name}
											error={!!error}
											helperText={error?.message}
										/>
									);
							  }
					}
				/>
			)}
		/>
	);
};
