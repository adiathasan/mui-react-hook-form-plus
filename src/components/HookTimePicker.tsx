'use client';

import * as React from 'react';
import { Grid, GridProps, TextField, TextFieldProps } from '@mui/material';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers';
import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { callAll } from '../utils/misc';

export interface HookTimePickerProps<TInputDate, TDate, T extends FieldValues = FieldValues>
	extends UseControllerProps<T> {
	textFieldProps?: TextFieldProps;
	timePickerProps?: Partial<TimePickerProps<TInputDate>>;
	formState: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {};
}

type HookTimePickerPropType<TInputDate, TDate, T extends FieldValues = FieldValues> = HookTimePickerProps<
	TInputDate,
	TDate,
	T
>;

// ====================================================

/**
 *
 * @description A searchable select field that uses react-hook-form to manage the form state.
 * @param {HookTimePickerProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * TimePickerProps: The props to pass to the TimePicker component
 * textFieldProps: The props to pass to the TextField component
 *
 * @returns {React.ReactElement}
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */

// ====================================================

export const HookTimePicker = <TInputDate, TDate, T extends FieldValues = FieldValues>({
	gridProps,
	...props
}: HookTimePickerPropType<TInputDate, TDate, T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookTimePicker component
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
	timePickerProps,
	...restC
}: HookTimePickerPropType<TInputDate, TDate, T>) => {
	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	const { onChange, ...restDate } = timePickerProps ?? {};

	/**
	 * we don't want to pass onChange to the TimePicker
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the TimePicker
	 * So we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);
	/**
	 * we update the ref on every render
	 */
	onChangeRef.current = onChange;

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, value, ref, name } }) => (
				<TimePicker
					{...restDate}
					value={value}
					onChange={callAll((newValue: Date) => {
						onChangeI(newValue);
					}, onChangeRef.current)}
				/>
			)}
		/>
	);
};

export default HookTimePicker;
