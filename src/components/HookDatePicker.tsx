import * as React from 'react';
import { Grid, GridProps, TextField, TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { callAll } from '../utils/misc';

export interface HookDatePickerProps<TInputDate, TDate, T extends FieldValues = FieldValues>
	extends UseControllerProps<T> {
	textFieldProps?: TextFieldProps;
	datePickerProps?: Partial<DatePickerProps<TInputDate, TDate>>;
	formState: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {};
}

type HookDatePickerPropType<TInputDate, TDate, T extends FieldValues = FieldValues> = HookDatePickerProps<
	TInputDate,
	TDate,
	T
>;

// ====================================================

/**
 *
 * @description A searchable select field that uses react-hook-form to manage the form state.
 * @param {HookDatePickerProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * datePickerProps: The props to pass to the DatePicker component
 * textFieldProps: The props to pass to the TextField component
 *
 * @returns {React.ReactElement}
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */

// ====================================================

export const HookDatePicker = <TInputDate, TDate, T extends FieldValues = FieldValues>({
	gridProps,
	...props
}: HookDatePickerPropType<TInputDate, TDate, T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookDatePicker component
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
	datePickerProps,
	...restC
}: HookDatePickerPropType<TInputDate, TDate, T>) => {
	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	const { onChange, renderInput, ...restDate } = datePickerProps ?? {};

	/**
	 * we don't want to pass onChange to the DatePicker
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the DatePicker
	 * So we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, value, ref, name } }) => (
				<DatePicker
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

export default HookDatePicker;
