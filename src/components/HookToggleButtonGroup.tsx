'use client';

import * as React from 'react';
import { Controller, FieldValues, FormState, UseControllerProps } from 'react-hook-form';
import { Grid, GridProps, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';

import { callAll } from '@utils/misc';

export interface HookToggleButtonGroupProps<T extends FieldValues = FieldValues>
	extends Omit<UseControllerProps<T>, 'rules'> {
	toggleButtonGroupProps?: ToggleButtonGroupProps;
	gridProps?: GridProps;
	formHelperText?: string;
	formState: FormState<T>;
	label?: React.ReactNode;
	children: React.ReactNode;
}

// ====================================================

/**
 *
 * @description A ToggleButton that uses react-hook-form to manage the form state.
 * @param {HookToggleButtonGroupProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * label: The label to use for the ToggleButton
 * items: The items to use for the ToggleButton
 * defaultValue: The default value to use for the ToggleButton
 *
 * @returns {React.ReactElement}
 *
 */

// ====================================================

export const HookToggleButtonGroup = <T extends FieldValues>({
	gridProps,
	...props
}: HookToggleButtonGroupProps<T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookToggleButtonGroup component
 *
 *
 */
const Component = <T extends FieldValues>({
	toggleButtonGroupProps = {},
	label,
	formHelperText,
	children,
	...restC
}: HookToggleButtonGroupProps<T>) => {
	const { onChange, ...restToggleButtonGroupProps } = toggleButtonGroupProps;

	/**
	 * we don't want to pass onChange to the ToggleButtonGroup
	 * we want to use the hook-form onChange,
	 * but we also want to keep the onChange passed in the toggleButtonGroupProps,
	 * so we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);
	/**
	 * we update the ref on every render
	 */
	onChangeRef.current = onChange;

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, value = restC?.defaultValue ?? null, ref } }) => (
				<ToggleButtonGroup
					exclusive
					{...restToggleButtonGroupProps}
					ref={ref}
					value={value}
					onChange={callAll(
						onChangeRef.current,
						(_event: React.MouseEvent<HTMLElement, MouseEvent>, value: string | string[]) => {
							onChangeI({
								target: {
									value,
								},
							});
						}
					)}>
					{children}
				</ToggleButtonGroup>
			)}
		/>
	);
};
