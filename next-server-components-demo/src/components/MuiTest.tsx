'use client';

import * as React from 'react';
import { Grid, Button } from '@mui/material';
import { HookTextField, useHookForm } from 'mui-react-hook-form-plus';

const defaultValues = {
	person: {
		firstName: 'Atif Aslam',
		lastName: '',
	},
};

export const MuiTest = (): React.ReactElement => {
	const { registerState, handleSubmit } = useHookForm({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {};
	return (
		<div>
			<h1>MuiTest</h1>
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
								value: true,
								message: 'Required',
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
		</div>
	);
};
