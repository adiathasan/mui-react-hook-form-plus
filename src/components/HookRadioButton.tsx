import * as React from 'react';
import {
	Controller,
	FieldValues,
	FormState,
	Path,
	PathValue,
	UnpackNestedValue,
	UseControllerProps,
} from 'react-hook-form';
import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	GridProps,
	Radio,
	RadioGroup,
	RadioGroupProps,
} from '@mui/material';

import { callAll } from '@utils/misc';

export interface HookRadioButtonProps<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
	radioGroupProps?: RadioGroupProps;
	gridProps?: GridProps;
	formHelperText?: string;
	formState: FormState<T>;
	label?: string;
	fields: { label: string; value: string }[];
	defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
	disabled?: any;
}

// ====================================================

/**
 *
 * @description A radio input field that uses react-hook-form to manage the form state.
 * @param {HookRadioButtonProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * label: The label to use for the radio group
 * fields: The fields to use for the radio group
 * defaultValue: The default value to use for the radio group
 *
 * @returns {React.ReactElement}
 *
 */

// ====================================================

export const HookRadioButton = <T extends FieldValues>({
	gridProps,
	...props
}: HookRadioButtonProps<T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookRadioButton component
 *
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */
const Component = <T extends FieldValues>({
	formState: { errors },
	radioGroupProps = {},
	fields,
	label,
	disabled,
	formHelperText,
	...restC
}: HookRadioButtonProps<T>) => {
	const { onChange, ...restRadioGroup } = radioGroupProps;

	/**
	 * we don't want to pass onChange to the RadioButton
	 * we want to use the hook-form onChange,
	 * but we also want to keep the onChange passed in the radioButtonProps,
	 * so we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);
	/**
	 * we update the ref on every render
	 */
	onChangeRef.current = onChange;

	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, name, value = restC?.defaultValue ?? fields[0].value, ref } }) => (
				<FormControl component='fieldset' error={!!error}>
					{label && <FormLabel component='span'>{label}</FormLabel>}
					<RadioGroup
						row
						ref={ref}
						aria-label={name}
						name={name}
						value={value}
						onChange={callAll(onChangeI, onChangeRef.current)}
						{...restRadioGroup}>
						{fields.map((field) => (
							<FormControlLabel
								key={field.value}
								{...field}
								control={<Radio color='primary' disabled={disabled === field.value} />}
							/>
						))}
					</RadioGroup>
					<FormHelperText>{error?.message || formHelperText}</FormHelperText>
				</FormControl>
			)}
		/>
	);
};
