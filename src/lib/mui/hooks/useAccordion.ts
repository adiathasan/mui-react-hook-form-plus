import * as React from 'react';

import { callAll } from '@utils/misc';

export interface UseAccordionProps {
	defaultValue?: boolean;
}

export type UseAccordionRegisterFn = (props?: {
	onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}) => {
	onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
	expanded: boolean;
};

export function useAccordion({ defaultValue = false }: UseAccordionProps = {}) {
	const [isOpen, setIsOpen] = React.useState(defaultValue);

	const onChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
		setIsOpen(isExpanded);
	};

	const close = () => {
		setIsOpen(false);
	};

	const register: UseAccordionRegisterFn = (props) => {
		return {
			expanded: isOpen,
			onChange: callAll(onChange, props?.onChange),
		};
	};

	return {
		isOpen,
		setIsOpen,
		close,
		register,
	};
}
