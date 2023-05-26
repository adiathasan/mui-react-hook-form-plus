'use client';

import * as React from 'react';
import { Grid, GridProps, TextFieldProps } from '@mui/material';
import { MobileDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers';
import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { callAll } from '../utils/misc';

export interface HookMobileDatePickerProps<TInputDate, TDate, T extends FieldValues = FieldValues>
	extends UseControllerProps<T> {
	textFieldProps?: TextFieldProps;
	mobileDatePickerProps?: Partial<MobileDatePickerProps<TInputDate>>;
	formState: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {};
}

type HookMobileDatePickerPropType<TInputDate, TDate, T extends FieldValues = FieldValues> = HookMobileDatePickerProps<
	TInputDate,
	TDate,
	T
>;

// ====================================================

/**
 *
 * @description A searchable select field that uses react-hook-form to manage the form state.
 * @param {HookMobileDatePickerProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * MobileDatePickerProps: The props to pass to the MobileDatePicker component
 * textFieldProps: The props to pass to the TextField component
 *
 * @returns {React.ReactElement}
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */

// ====================================================

export const HookMobileDatePicker = <TInputDate, TDate, T extends FieldValues = FieldValues>({
	gridProps,
	...props
}: HookMobileDatePickerPropType<TInputDate, TDate, T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookMobileDatePicker component
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
	mobileDatePickerProps,
	...restC
}: HookMobileDatePickerPropType<TInputDate, TDate, T>) => {
	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	const { onChange, ...restDate } = mobileDatePickerProps ?? {};

	/**
	 * we don't want to pass onChange to the MobileDatePicker
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the MobileDatePicker
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
				<MobileDatePicker
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
