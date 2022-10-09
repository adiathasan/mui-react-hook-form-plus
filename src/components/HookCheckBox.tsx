import * as React from 'react';
import {
	Controller,
	FieldPath,
	FieldValues,
	FormState,
	Path,
	UseControllerProps,
	UseFormSetFocus,
} from 'react-hook-form';
import {
	ButtonBaseActions,
	Checkbox,
	CheckboxProps,
	FormControl,
	FormControlLabel,
	FormControlLabelProps,
	FormHelperText,
	FormLabel,
	Grid,
	GridProps,
} from '@mui/material';

import { callAll } from '@utils/misc';

export interface HookCheckBoxProps<T extends FieldValues = FieldValues> extends Omit<UseControllerProps<T>, 'rules'> {
	checkBoxProps?: CheckboxProps;
	formControlLabelProps?: Omit<FormControlLabelProps, 'control'>;
	gridProps?: GridProps;
	formHelperText?: string;
	groupCheckProps?: {
		name: FieldPath<T>;
		checkBoxProps?: CheckboxProps;
		formControlLabelProps?: Omit<FormControlLabelProps, 'control'>;
	}[];
	formState: FormState<T>;
	label?: string;
	disabled?: any;
	error?: {
		value: boolean;
		message?: string;
	};
	setFocus: UseFormSetFocus<T>;
}

// ====================================================

/**
 *
 * @description A radio input field that uses react-hook-form to manage the form state.
 * @param {HookCheckBoxProps}
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

export const HookCheckBox = <T extends FieldValues>({
	gridProps,
	...props
}: HookCheckBoxProps<T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookCheckBox component
 *
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */
const Component = <T extends FieldValues>({
	formState: { errors: _errors },
	checkBoxProps = {},
	label,
	disabled,
	formHelperText,
	setFocus,
	groupCheckProps,
	formControlLabelProps = { label: undefined },
	error,
	...restC
}: HookCheckBoxProps<T>) => {
	const actionRef = React.useRef<{ [x: string]: { action: ButtonBaseActions; ref: HTMLInputElement } }>({});

	const { onChange, ...restCheckBox } = checkBoxProps;

	/**
	 * we don't want to pass onChange to the CheckBox
	 * we want to use the hook-form onChange,
	 * but we also want to keep the onChange passed in the checkBoxProps,
	 * so we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);
	/**
	 * we update the ref on every render
	 */
	onChangeRef.current = onChange;

	React.useEffect(() => {
		if (groupCheckProps && _errors) {
			groupCheckProps.every((g) => {
				const { error } = restC?.control?.getFieldState(g.name) ?? {};

				if (!!error) {
					actionRef.current[g.name]?.ref.focus();
					actionRef.current[g.name]?.action.focusVisible();
					return false;
				}

				return true;
			});
			return;
		}

		const { error } = restC?.control?.getFieldState(restC.name) ?? {};

		if (!!error) {
			actionRef.current[restC.name]?.ref.focus();
			actionRef.current[restC.name]?.action.focusVisible();
		}
	}, [_errors, groupCheckProps]);

	return (
		<FormControl component='fieldset' error={!!error?.value}>
			{label && <FormLabel component='legend'>{label}</FormLabel>}
			{!!groupCheckProps ? (
				groupCheckProps.map(({ name, checkBoxProps, formControlLabelProps }) => (
					<React.Fragment key={name}>
						<Controller
							{...restC}
							name={name}
							rules={{
								validate: () => {
									return error?.value ? error.message : undefined;
								},
							}}
							render={({ field: { onChange: onChangeI, value = false, ref } }) => (
								<>
									<FormControlLabel
										{...(formControlLabelProps as any)}
										control={
											<Checkbox
												{...checkBoxProps}
												action={(action: ButtonBaseActions) => {
													actionRef.current = {
														...actionRef.current,
														[name]: { action, ref: actionRef.current[name]?.ref },
													};
												}}
												inputRef={(instance: HTMLInputElement) => {
													actionRef.current = {
														...actionRef.current,
														[name]: { ref: instance, action: actionRef.current[name]?.action },
													};

													return ref;
												}}
												name={name}
												checked={value}
												onChange={callAll(onChangeI, onChangeRef.current, checkBoxProps?.onChange)}
											/>
										}
									/>
								</>
							)}
						/>
					</React.Fragment>
				))
			) : (
				<Controller
					{...restC}
					rules={{
						validate: () => {
							return error?.value ? error.message : undefined;
						},
					}}
					render={({ field: { onChange: onChangeI, name, value = false, ref } }) => (
						<>
							<FormControlLabel
								{...formControlLabelProps}
								control={
									<Checkbox
										{...restCheckBox}
										action={(action: ButtonBaseActions) => {
											actionRef.current = {
												...actionRef.current,
												[name]: { action, ref: actionRef.current[name]?.ref },
											};
										}}
										inputRef={(instance: HTMLInputElement) => {
											actionRef.current = {
												...actionRef.current,
												[name]: { ref: instance, action: actionRef.current[name]?.action },
											};

											return ref;
										}}
										name={name}
										checked={value}
										onChange={callAll(onChangeI, onChangeRef.current)}
									/>
								}
							/>
						</>
					)}
				/>
			)}
			<FormHelperText>{(!!error?.value && error?.message) || formHelperText}</FormHelperText>
		</FormControl>
	);
};
