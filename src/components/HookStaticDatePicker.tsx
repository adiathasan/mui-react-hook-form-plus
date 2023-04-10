import * as React from 'react';
import { Grid, GridProps, TextField, TextFieldProps } from '@mui/material';
import { StaticDatePicker, StaticDatePickerProps } from '@mui/x-date-pickers';
import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { callAll } from '../utils/misc';

export interface HookStaticDatePickerProps<TInputDate, TDate, T extends FieldValues = FieldValues>
	extends UseControllerProps<T> {
	textFieldProps?: TextFieldProps;
	staticDatePickerProps?: Partial<StaticDatePickerProps<TInputDate, TDate>>;
	formState: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {};
}

type HookStaticDatePickerPropType<TInputDate, TDate, T extends FieldValues = FieldValues> = HookStaticDatePickerProps<
	TInputDate,
	TDate,
	T
>;

// ====================================================

/**
 *
 * @description A searchable select field that uses react-hook-form to manage the form state.
 * @param {HookStaticDatePickerProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * StaticdatePickerProps: The props to pass to the StaticDatePicker component
 * textFieldProps: The props to pass to the TextField component
 *
 * @returns {React.ReactElement}
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */

// ====================================================

export const HookStaticDatePicker = <TInputDate, TDate, T extends FieldValues = FieldValues>({
	gridProps,
	...props
}: HookStaticDatePickerPropType<TInputDate, TDate, T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookStaticDatePicker component
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
	staticDatePickerProps,
	...restC
}: HookStaticDatePickerPropType<TInputDate, TDate, T>) => {
	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	const { onChange, renderInput, ...restDate } = staticDatePickerProps ?? {};

	/**
	 * we don't want to pass onChange to the StaticDatePicker
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the StaticDatePicker
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
				<StaticDatePicker
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
