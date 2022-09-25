import * as React from 'react';

import { callAll } from '@utils/misc';

export interface UseMenuProps<T extends any> {
	defaultValue?: T;
}

export type UseMenuRegisterFn = (props?: { onClose?: (event: Object, reason: string) => void }) => {
	open: boolean;
	onClose: (event: Object, reason: string) => void;
	anchorEl: null | HTMLElement;
};

export function useMenu<T>(props?: UseMenuProps<T>) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const [value, setValue] = React.useState<T | undefined>(props?.defaultValue);

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = React.useCallback(() => {
		setAnchorEl(null);
	}, [setAnchorEl]);

	const register: UseMenuRegisterFn = ({ onClose } = {}) => {
		return {
			open: !!anchorEl,
			onClose: callAll(onClose, handleClose),
			anchorEl,
		};
	};

	return {
		anchorEl,
		handleClose,
		handleOpen,
		value,
		open: !!anchorEl,
		setValue,
		register: React.useCallback(register, [anchorEl, handleClose]),
	};
}
