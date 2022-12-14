import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Grid } from '@mui/material';

import { HookTextField } from '@components/HookTextField';
import { jsonStringify } from '@utils/misc';
import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';

const stories = storiesOf('HookTextField', module);

stories.add('@HookTextField', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookTextField, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = {
		person: {
			firstName: 'Atif Aslam',
			lastName: '',
		},
	};

	const { registerState, handleSubmit } = useHookForm({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>This is a `TextField` hooked up with `react-hook-form`</h2>
			<h3>Learn how we use `textFieldProps` 🐭</h3>
			<Grid container spacing={3}>
				<HookTextField
					{...registerState('person.firstName')}
					textFieldProps={{
						label: 'First Name',
						variant: 'filled',
						color: 'primary',
						fullWidth: true,
						style: {
							minHeight: 79,
						},
					}}
					gridProps={{
						xs: 12,
						md: 5,
					}}
					rules={{
						maxLength: {
							value: 5,
							message: 'Must be less than 6 char',
						},
						minLength: {
							value: 2,
							message: 'Must be greater 1 char',
						},
						required: {
							message: 'Required',
							value: true,
						},
					}}
				/>
				<HookTextField
					{...registerState('person.lastName')}
					textFieldProps={{
						label: 'Last Name',
						variant: 'filled',
						color: 'primary',
						fullWidth: true,
						style: {
							minHeight: 79,
						},
					}}
					gridProps={{
						xs: 12,
						md: 5,
					}}
					rules={{
						required: {
							message: 'Required',
							value: true,
						},
					}}
				/>
			</Grid>
			<Grid>
				<Button type='submit' variant='contained'>
					Submit
				</Button>
			</Grid>
		</form>
	);
});
