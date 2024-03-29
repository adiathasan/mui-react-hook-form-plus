'use client';

import * as React from 'react';

import { callAll } from '@utils/misc';

export interface UseBottomNavigationProps {
	defaultValue?: number;
}

export type UseBottomNavigationRegisterFn = (props?: {
	onChange?: (event: React.ChangeEvent, value: number) => void;
}) => {
	onChange: (event: React.ChangeEvent, value: number) => void;
	value: number;
};

export const useBottomNavigation = (props?: UseBottomNavigationProps) => {
	const [value, setValue] = React.useState(props?.defaultValue ?? 0);

	const handleChange = React.useCallback(
		(_event: React.ChangeEvent, value: number) => {
			setValue(value);
		},
		[setValue]
	);

	const register: UseBottomNavigationRegisterFn = ({ onChange } = {}) => {
		return {
			value,
			onChange: callAll(onChange, handleChange),
		};
	};

	return {
		value,
		handleChange,
		register: React.useCallback(register, [value, handleChange]),
	};
};
