import * as React from 'react';
import {
	Autocomplete,
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
	AutocompleteProps,
	AutocompleteRenderInputParams,
	Grid,
	GridProps,
	TextField,
	TextFieldProps,
} from '@mui/material';
import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { Optional } from '@utils/types';
import { callAll } from '../utils/misc';

export interface ISearchSelectProps<
	A,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
	T extends FieldValues = FieldValues
> extends UseControllerProps<T> {
	textFieldProps?: TextFieldProps;
	autocompleteProps: Omit<
		Optional<AutocompleteProps<A, Multiple, DisableClearable, FreeSolo>, 'renderInput'>,
		'getOptionLabel'
	> & {
		getOptionLabel?: (option: A) => string;
	};
	formState: FormState<T>;
	gridProps?: GridProps;
	noWrapper?: boolean;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {
		/**
		 * triggerErrorOnBlur - Trigger Error on blur - default: true
		 */
		triggerErrorOnBlur?: boolean;
	};
}

type HookAutoCompletePropType<
	A,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
	T extends FieldValues
> = ISearchSelectProps<A, Multiple, DisableClearable, FreeSolo, T>;

// ====================================================

/**
 *
 * @description A searchable select field that uses react-hook-form to manage the form state.
 * @param {ISearchSelectProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 * autocompleteProps: The props to pass to the Autocomplete component
 * textFieldProps: The props to pass to the TextField component
 *
 * @returns {React.ReactElement}
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */

// ====================================================

export const HookAutoComplete = <
	A,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
	T extends FieldValues = FieldValues
>({
	gridProps,
	...props
}: HookAutoCompletePropType<A, Multiple, DisableClearable, FreeSolo, T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookAutoComplete component
 *
 * @danger do not remove {formState: { errors }} from props as it is subscribed to the state
 *
 */
const Component = <
	A,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
	T extends FieldValues = FieldValues
>({
	textFieldProps = {},
	setValue,
	trigger,
	config = {},
	formState: { errors },
	gridProps,
	autocompleteProps,
	noWrapper,
	...restC
}: HookAutoCompletePropType<A, Multiple, DisableClearable, FreeSolo, T>) => {
	const { error } = restC?.control?.getFieldState(restC.name) ?? {};

	const { onChange, ...restAuto } = autocompleteProps;

	/**
	 * we don't want to pass onChange & onBlur to the AutoComplete
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the autoCompleteProps
	 * So we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);

	const { triggerErrorOnBlur = false } = config;

	return (
		<Controller
			{...restC}
			render={({
				field: { onChange: onChangeI, onBlur: onBlurI, value = autocompleteProps.options[0], ref, name },
			}) => (
				<Autocomplete
					value={value as any}
					{...restAuto}
					onChange={callAll(
						onChangeRef.current,
						(
							_event: React.SyntheticEvent<Element, Event>,
							value: any,
							_reason: AutocompleteChangeReason,
							_details?: AutocompleteChangeDetails<any> | undefined
						) => {
							onChangeI({ target: { value } });
						}
					)}
					renderInput={
						!!restAuto.renderInput
							? restAuto.renderInput
							: (params) => (
									<TextField
										{...textFieldProps}
										{...params}
										aria-invalid={!!error ? 'true' : 'false'}
										error={!!error}
										helperText={error?.message}
										inputRef={ref}
										onBlur={callAll(onBlurI, textFieldProps.onBlur, async () => {
											if (triggerErrorOnBlur) {
												await trigger?.(name);
											}
										})}
									/>
							  )
					}
				/>
			)}
		/>
	);
};
