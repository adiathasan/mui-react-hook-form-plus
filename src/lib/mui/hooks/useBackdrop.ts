'use client';

import * as React from 'react';

import { callAll } from '@utils/misc';

export interface UseBackdropProps {
	defaultValue?: boolean;
}

export type UseBackDropRegisterFn = (props?: { onClick?: (event: React.MouseEvent) => void }) => {
	onClick: (event?: React.MouseEvent) => void;
	open: boolean;
};

export function useBackdrop({ defaultValue = false }: UseBackdropProps = {}) {
	const [isOpen, setIsOpen] = React.useState(defaultValue);

	const onClick = () => {
		setIsOpen((o) => !o);
	};

	const close = () => {
		setIsOpen(false);
	};

	const register: UseBackDropRegisterFn = (props) => {
		return {
			open: isOpen,
			onClick: callAll(onClick, props?.onClick),
		};
	};

	return {
		setIsOpen,
		register,
		isOpen,
		close,
		open: () => setIsOpen(true),
	};
}
