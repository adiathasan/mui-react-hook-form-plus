import * as React from 'react';

import { callAll } from '@utils/misc';

export interface UseDialogProps {
	defaultValue?: boolean;
}

export type UseDialogRegisterFn = (props?: { onClose?: (event: React.SyntheticEvent) => void }) => {
	onClose: (event: React.SyntheticEvent) => void;
	open: boolean;
};

export function useDialog({ defaultValue = false }: UseDialogProps = {}) {
	const [isOpen, setIsOpen] = React.useState(defaultValue);

	const onClose = (_event: React.SyntheticEvent) => {
		setIsOpen(false);
	};

	const register: UseDialogRegisterFn = (props) => {
		return {
			open: isOpen,
			onClose: callAll(onClose, props?.onClose),
		};
	};

	return {
		isOpen,
		register,
		setIsOpen,
		close: onClose,
		open: () => setIsOpen(true),
	};
}
