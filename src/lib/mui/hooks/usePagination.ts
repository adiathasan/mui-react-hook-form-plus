import { callAll } from '@utils/misc';
import * as React from 'react';

export interface UsePaginationProps {
	defaultPage?: number;
}

export type UsePaginationRegisterFn = (props?: { onChange?: (event: React.ChangeEvent, value: number) => void }) => {
	onChange: (event: React.ChangeEvent, value: number) => void;
	page: number;
};

export const usePagination = (props?: UsePaginationProps) => {
	const [page, setPage] = React.useState(props?.defaultPage ?? 1);

	const handleChange = React.useCallback(
		(_event: React.ChangeEvent, value: number) => {
			setPage(value);
		},
		[setPage]
	);

	const register: UsePaginationRegisterFn = ({ onChange } = {}) => {
		return {
			page,
			onChange: callAll(onChange, handleChange),
		};
	};

	return {
		page,
		handleChange,
		register: React.useCallback(register, [page, handleChange]),
	};
};
