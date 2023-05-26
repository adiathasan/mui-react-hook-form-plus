'use client';

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
	FormControlProps,
	FormHelperText,
	Grid,
	GridProps,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	SelectProps,
} from '@mui/material';

import { callAll, isDev } from '@utils/misc';

export interface HookSelectProps<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
	selectProps?: SelectProps & {
		clearable?: boolean;
	};
	gridProps?: GridProps;
	formControlProps?: FormControlProps;
	formHelperText?: string;
	formState: FormState<T>;
	label?: React.ReactNode;
	items?: { label: string; value: string }[];
	renderItem?: (item: { label: string; value: string }) => React.ReactNode;
	defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
}

// ====================================================

/**
 *
 * @description A Select input field that uses react-hook-form to manage the form state.
 * @param {HookSelectProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * label: The label to use for the Select
 * items: The items to use for the Select
 * defaultValue: The default value to use for the Select
 *
 * @returns {React.ReactElement}
 *
 */

// ====================================================

export const HookSelect = <T extends FieldValues>({ gridProps, ...props }: HookSelectProps<T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookSelect component
 *
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */
const Component = <T extends FieldValues>({
	formState: { errors },
	selectProps = {},
	formControlProps = {},
	items,
	label,
	renderItem,
	formHelperText,
	...restC
}: HookSelectProps<T>) => {
	const { onChange, clearable, multiple, ...restSelect } = selectProps;

	/**
	 * we don't want to pass onChange to the Select
	 * we want to use the hook-form onChange,
	 * but we also want to keep the onChange passed in the selectProps,
	 * so we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);
	/**
	 * we update the ref on every render
	 */
	onChangeRef.current = onChange;

	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	const { current: labelId } = React.useRef(Date.now().toString());

	if (clearable && multiple && isDev()) {
		console.warn("HookSelect: can't use `multiple` and `clearable` together as it will cause bugs");
	}

	return (
		<Controller
			{...restC}
			render={({
				field: { onChange: onChangeI, name, value = restC?.defaultValue ?? items?.[0].value ?? '', ref },
			}) => (
				<FormControl fullWidth error={!!error} {...formControlProps}>
					{label && <InputLabel id={labelId}>{label}</InputLabel>}
					<Select
						label={label}
						labelId={labelId}
						aria-label={name}
						value={value}
						name={name}
						inputRef={ref}
						multiple={multiple}
						onChange={callAll((e: SelectChangeEvent) => {
							if (multiple) {
								const {
									target: { value },
								} = e;

								onChangeI({
									target: {
										// On autofill we get a stringified value.
										value: typeof value === 'string' ? value.split(',') : value,
									},
								});
								return;
							}

							onChangeI(e);
						}, onChangeRef.current)}
						{...restSelect}>
						{clearable && !multiple && (
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
						)}
						{items?.map((item) => (
							<MenuItem value={item.value} key={item.value}>
								{!!renderItem ? renderItem({ label: item.label, value: item.value }) : item.label}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{error?.message || formHelperText}</FormHelperText>
				</FormControl>
			)}
		/>
	);
};
