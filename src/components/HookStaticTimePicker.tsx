import * as React from 'react';
import { Grid, GridProps, TextField, TextFieldProps } from '@mui/material';
import { StaticTimePicker, StaticTimePickerProps } from '@mui/x-date-pickers';
import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { callAll } from '../utils/misc';

export interface HookStaticTimePickerProps<TInputDate, TDate, T extends FieldValues = FieldValues>
	extends UseControllerProps<T> {
	textFieldProps?: TextFieldProps;
	staticTimePickerProps?: Partial<StaticTimePickerProps<TInputDate, TDate>>;
	formState: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {};
}

type HookStaticTimePickerPropType<TInputDate, TDate, T extends FieldValues = FieldValues> = HookStaticTimePickerProps<
	TInputDate,
	TDate,
	T
>;

// ====================================================

/**
 *
 * @description A searchable select field that uses react-hook-form to manage the form state.
 * @param {HookStaticTimePickerProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * StaticTimePickerProps: The props to pass to the StaticTimePicker component
 * textFieldProps: The props to pass to the TextField component
 *
 * @returns {React.ReactElement}
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */

// ====================================================

export const HookStaticTimePicker = <TInputDate, TDate, T extends FieldValues = FieldValues>({
	gridProps,
	...props
}: HookStaticTimePickerPropType<TInputDate, TDate, T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookStaticTimePicker component
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
	staticTimePickerProps,
	...restC
}: HookStaticTimePickerPropType<TInputDate, TDate, T>) => {
	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	const { onChange, renderInput, ...restDate } = staticTimePickerProps ?? {};

	/**
	 * we don't want to pass onChange to the StaticTimePicker
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the StaticTimePicker
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
				<StaticTimePicker
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
