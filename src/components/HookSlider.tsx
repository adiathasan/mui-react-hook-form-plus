import * as React from 'react';
import { GridProps, Grid, Slider, SliderProps } from '@mui/material';

import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

import { callAll } from '@utils/misc';

export interface HookSliderProps<T extends FieldValues = FieldValues> extends Omit<UseControllerProps<T>, 'rules'> {
	sliderProps?: Partial<SliderProps>;
	formState?: FormState<T>;
	gridProps?: GridProps;
	setValue?: UseFormSetValue<T>;
	trigger?: UseFormTrigger<T>;
	config?: {
		/**
		 */
	};
}

// ====================================================

/**
 *
 * @description A text input field that uses react-hook-form to manage the form state.
 * @param {HookSliderProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 *
 * @returns {React.ReactElement}
 *
 */

// ====================================================
export const HookSlider = <T extends FieldValues>({ gridProps, ...props }: HookSliderProps<T>): React.ReactElement => {
	/**
	 * if grid props are passed in we wrap the text field in a grid
	 */
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
 * @description The actual component that is returned from the HookSlider component
 *
 */
const Component = <T extends FieldValues>({
	setValue,
	trigger,
	config = {},
	gridProps,
	sliderProps = {},
	...restC
}: HookSliderProps<T>) => {
	const { onChange, ...rest } = sliderProps;

	/**
	 * we don't want to pass onChange to the Slider
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the sliderProps
	 * So we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);
	/**
	 * we update the ref on every render
	 */
	onChangeRef.current = onChange;

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, value = 0 } }) => (
				<Slider
					{...rest}
					value={value}
					onChange={callAll(onChangeRef.current, (_event: Event, value: number | number[], _activeThumb: number) => {
						onChangeI({
							target: {
								value,
							},
						});
					})}
				/>
			)}
		/>
	);
};

export default HookSlider;
