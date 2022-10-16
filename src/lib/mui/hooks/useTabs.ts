import * as React from 'react';

import { callAll } from '@utils/misc';

export interface UseTabsProps {
	defaultValue?: number;
}

export type UseTabsRegisterFn = (props?: { onChange?: (event: React.ChangeEvent, value: number) => void }) => {
	onChange: (event: React.ChangeEvent, value: number) => void;
	value: number;
};

export const useTabs = (props?: UseTabsProps) => {
	const [value, setvalue] = React.useState(props?.defaultValue ?? 0);

	const handleChange = React.useCallback(
		(_event: React.ChangeEvent, value: number) => {
			setvalue(value);
		},
		[setvalue]
	);

	const register: UseTabsRegisterFn = ({ onChange } = {}) => {
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
