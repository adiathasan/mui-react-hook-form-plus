import * as React from 'react';
import { Grid, GridProps, TextField, TextFieldProps } from '@mui/material';
import { DesktopTimePicker, DesktopTimePickerProps } from '@mui/x-date-pickers';
import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { callAll } from '../utils/misc';

export interface HookDesktopTimePickerProps<TInputDate, TDate, T extends FieldValues = FieldValues>
	extends UseControllerProps<T> {
	textFieldProps?: TextFieldProps;
	desktopTimePickerProps?: Partial<DesktopTimePickerProps<TInputDate, TDate>>;
	formState: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {};
}

type HookDesktopTimePickerPropType<TInputDate, TDate, T extends FieldValues = FieldValues> = HookDesktopTimePickerProps<
	TInputDate,
	TDate,
	T
>;

// ====================================================

/**
 *
 * @description A searchable select field that uses react-hook-form to manage the form state.
 * @param {HookDesktopTimePickerProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * DesktopTimePickerProps: The props to pass to the DesktopTimePicker component
 * textFieldProps: The props to pass to the TextField component
 *
 * @returns {React.ReactElement}
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */

// ====================================================

export const HookDesktopTimePicker = <TInputDate, TDate, T extends FieldValues = FieldValues>({
	gridProps,
	...props
}: HookDesktopTimePickerPropType<TInputDate, TDate, T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookDesktopTimePicker component
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
	desktopTimePickerProps,
	...restC
}: HookDesktopTimePickerPropType<TInputDate, TDate, T>) => {
	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	const { onChange, renderInput, ...restDate } = desktopTimePickerProps ?? {};

	/**
	 * we don't want to pass onChange to the DesktopTimePicker
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the DesktopTimePicker
	 * So we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, value, ref, name } }) => (
				<DesktopTimePicker
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
