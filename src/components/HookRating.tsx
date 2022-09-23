import * as React from 'react';
import { GridProps, Grid, Rating, RatingProps } from '@mui/material';

import { callAll } from '@utils/misc';

import {
	Controller,
	FieldValues,
	FormState,
	UseControllerProps,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';

export interface HookRatingProps<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
	ratingProps?: RatingProps;
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
 * @param {HookRatingProps}
 *
 * formState: The form state to use from the useHookForm hook that we are using.
 *
 * @returns {React.ReactElement}
 *
 */

// ====================================================
export const HookRating = <T extends FieldValues>({ gridProps, ...props }: HookRatingProps<T>): React.ReactElement => {
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
 * @description The actual component that is returned from the HookRating component
 *
 */
const Component = <T extends FieldValues>({
	setValue,
	trigger,
	config = {},
	gridProps,
	ratingProps = {},
	...restC
}: HookRatingProps<T>) => {
	const { onChange, ...rest } = ratingProps;

	/**
	 * we don't want to pass onChange to the Rating
	 * we want to use the hook-form onChange
	 * But we also want to keep the onChange passed in the ratingProps
	 * So we use callAll to merge the two
	 */
	const onChangeRef = React.useRef(onChange);

	return (
		<Controller
			{...restC}
			render={({ field: { onChange: onChangeI, value = 0 } }) => (
				<Rating
					{...rest}
					value={value}
					onChange={callAll(
						onChangeRef.current,
						(_event: React.SyntheticEvent<Element, Event>, value: number | null) => {
							onChangeI({
								target: {
									value,
								},
							});
						}
					)}
				/>
			)}
		/>
	);
};

export default HookRating;
