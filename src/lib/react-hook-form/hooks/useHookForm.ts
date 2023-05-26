'use client';

import { useCallback } from 'react';
import {
	Control,
	FieldPath,
	FieldValues,
	FormState,
	useForm,
	UseFormProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { useInputValidate } from '@hooks/useInputValidate';
import { useFillFormValues } from './useFillFormValues';

// ====================================================

/**
 * @description this hook is used to create a custom registerState function that is used to register the state of the form
 *
 *
 * @param {UseFormProps} props - the props of the hook as defined in the useForm hook
 *
 * @returns a custom **registerState** | **setValues** ``method`` is returned with all the methods of the original *react-hook-form*
 *
 * @see https://react-hook-form.com/api/useform
 */

// ====================================================
export function useHookForm<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
	props?: UseFormProps<TFieldValues, TContext>
) {
	/**
	 * this is react-hook-form's useForm hook
	 * we manipulate it to add a custom registerState function
	 */
	const form = useForm(props);

	const { control, formState, setValue, trigger } = form;

	/**
	 * @description this function is used to register the state of the form inputs
	 * The main motivation is for maintaining hassle-free prop drilling
	 */
	const registerState = useCallback(
		(name: FieldPath<TFieldValues>) => {
			return {
				control,
				formState,
				name,
				setValue,
				trigger,
			};
		},
		[control, formState, setValue, trigger]
	);

	const { setterFn } = useFillFormValues(setValue);

	return {
		registerState,
		setValues: setterFn,
		validator: useInputValidate(),
		...form,
	};
}

// ====================================================

/**
 * This is used if you want to pass registerState to a component
 *
 * const { registerState } = useHookForm<IFormState>({defaultValues: {name: ''}})
 *
 * Example: <MyComponent {...registerState('name')} />
 *
 * interface MyComponentProps {
 *   registerState: UseHookFormRegisterFn<IFormState>
 * }
 */

// ====================================================
export type UseHookFormRegisterFn<TFieldValues extends FieldValues = FieldValues> = (name: FieldPath<TFieldValues>) => {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues, object>;
	trigger: UseFormTrigger<TFieldValues>;
	setValue: UseFormSetValue<TFieldValues>;
	formState: FormState<TFieldValues>;
};

export type SetValuesFn<TFieldValues extends FieldValues = FieldValues> = (
	data: Partial<TFieldValues>,
	includeKeys?: 'ALL' | (keyof TFieldValues)[]
) => void;
