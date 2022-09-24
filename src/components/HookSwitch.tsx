import * as React from 'react';
import { SwitchProps, FormControlLabelProps, GridProps, Grid, FormControlLabel, Switch } from '@mui/material';

import { callAll } from '@utils/misc';

import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

export interface HookSwitchProps<T extends FieldValues = FieldValues> extends Omit<UseControllerProps<T>, 'rules'> {
	switchProps?: SwitchProps;
	labelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
	label?: React.ReactNode;
	formState?: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {
		/**
		 */
	};
}

// ====================================================

/**
 *
 * @description A text input field that uses react-hook-form to manage the form state.
 * @param {HookSwitchProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 *
 * @returns {React.ReactElement}
 *
 */

// ====================================================
export const HookSwitch = <T extends FieldValues>({ gridProps, ...props }: HookSwitchProps<T>): React.ReactElement => {
	/**
	 * if grid props are passed in we wrap the text field in a grid
	 */
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
 * @description The actual component that is returned from the HookSwitch component
 *
 */
const Component = <T extends FieldValues>({
	switchProps = {},
	setValue,
	labelProps,
	trigger,
	config = {},
	gridProps,
	label,
	...restC
}: HookSwitchProps<T>) => {
	const { onChange, ...rest } = switchProps;

	/**
	 * we don't want to pass onChange to the Switch
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the switchProps
	 * So we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, value = false } }) => (
				<FormControlLabel
					{...labelProps}
					label={label}
					control={<Switch checked={value} {...rest} onChange={callAll(onChangeI, onChangeRef.current)} />}
				/>
			)}
		/>
	);
};
