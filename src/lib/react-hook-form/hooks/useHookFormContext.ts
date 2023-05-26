'use client';

import * as React from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { useFillFormValues } from '../hooks/useFillFormValues';

export const useHookFormContext = <TFieldValues extends FieldValues>() => {
	const form = useFormContext<TFieldValues>();

	const { control, formState, setValue, trigger } = form;

	const registerState = React.useCallback(
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

	return { registerState, setterFn, ...form };
};
