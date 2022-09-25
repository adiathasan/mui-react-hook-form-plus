import * as React from 'react';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import { storiesOf } from '@storybook/react';
import { FormProvider as HookFormProvider } from 'react-hook-form';

import HookRating from '@components/HookRating';
import { HookSelect } from '@components/HookSelect';
import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';
import { HookTextField } from '@components/HookTextField';
import { jsonStringify } from '@utils/misc';
import { useHookFormContext } from '@lib/react-hook-form/hooks/useHookFormContext';

const stories = storiesOf('Form Context', module);

interface Person {
	firstName: string;
	lastName: string;
	sex: string;
	rating: number;
}

export const NestedComponent = () => {
	// import { Stack } from '@mui/system';
	// import { HookSelect, HookRating, useHookFormContext } from 'mui-react-hook-form-plus ';

	const { registerState } = useHookFormContext<Person>();

	return (
		<Stack direction='row' alignItems='center' spacing={2}>
			<HookSelect
				{...registerState('sex')}
				label='SEX'
				selectProps={{
					clearable: true,
					style: {
						minWidth: 224,
					},
				}}
				items={[
					{ label: 'MALE', value: 'male' },
					{ label: 'FEMALE', value: 'female' },
					{ label: 'OTHERS', value: 'others' },
				]}
				gridProps={{
					xs: 6,
				}}
				rules={{
					required: {
						value: true,
						message: 'Please select atleast one',
					},
				}}
			/>
			<HookRating {...registerState('rating')} ratingProps={{ precision: 0.5 }} />
		</Stack>
	);
};

stories.add('HookFormProvider', () => {
	// import { Stack } from '@mui/system';
	// import { HookTextField, useHookFormContext, HookFormProvider } from 'mui-react-hook-form-plus ';

	const defaultValues = { firstName: '', lastName: '', sex: '', rating: 3.5 };

	const methods = useHookForm<Person>({
		defaultValues,
	});

	const { registerState, handleSubmit } = methods;

	const onSubmit = (data: Person) => {
		alert(jsonStringify(data));
	};

	return (
		<HookFormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>`HookFormProvider` replaces `FormProvider` form `react-hook-form` library _&_ </h2>
				<h2>`useHookFormContext` replaces `useFormContext` form `react-hook-form` library ↩</h2>
				<h2>To use `useHookFormContext` it must be wrapped inside a `HookFormProvider`</h2>
				<h3>Learn how we use the `useHookFormContext` from a nested component</h3>

				<Stack direction='row' spacing={2}>
					<HookTextField {...registerState('firstName')} textFieldProps={{ label: 'First Name' }} />
					<HookTextField {...registerState('lastName')} textFieldProps={{ label: 'Last Name' }} />
				</Stack>
				<br />
				<NestedComponent />
				<br />
				<Stack direction='row' spacing={2}>
					<Button color='info' variant='contained' type='submit'>
						Submit
					</Button>
				</Stack>
			</form>
		</HookFormProvider>
	);

	/**
	 * - NestedComponent -

		// import { Stack } from '@mui/system';
		// import { HookSelect, HookRating, useHookFormContext } from 'mui-react-hook-form-plus ';

		const { registerState } = useHookFormContext<Person>();

		return (
			<Stack direction='row' alignItems='center' spacing={2}>
				<HookSelect
					{...registerState('sex')}
					label='SEX'
					selectProps={{
						clearable: true,
						style: {
							minWidth: 224,
						},
					}}
					items={[
						{ label: 'MALE', value: 'male' },
						{ label: 'FEMALE', value: 'female' },
						{ label: 'OTHERS', value: 'others' },
					]}
					gridProps={{
						xs: 6,
					}}
					rules={{
						required: {
							value: true,
							message: 'Please select atleast one',
						},
					}}
				/>
				<HookRating {...registerState('rating')} ratingProps={{ precision: 0.5 }} />
			</Stack>
		);
	}
	 */
});
