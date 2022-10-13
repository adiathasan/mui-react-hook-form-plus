import * as React from 'react';
import { Grid } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { storiesOf } from '@storybook/react';

import { HookSwitch } from '@components/HookSwitch';
import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';

const stories = storiesOf('HookSwitch ❕', module);

stories.add('@HookSwitch', () => {
	// import {  Grid } from '@mui/material';
	// import { useWatch } from 'react-hook-form';
	// import { HookSwitch, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		person: {
			isActive: false,
			isAgent: true,
		},
	};

	const { registerState, control } = useHookForm({
		defaultValues,
	});

	const isAdmin = useWatch({
		control,
		name: 'person.isActive',
	});

	return (
		<div>
			<h3>This is a Switch hooked up with react-hook-form</h3>
			<h4>
				Supports `labelProps` & `switchProps` from{' '}
				<a href='https://mui.com/material-ui/react-switch/' target='_blank' rel='noopener noreferrer'>
					MUI
				</a>{' '}
			</h4>
			<Grid container columnSpacing={{ xs: 1, md: 3 }}>
				<HookSwitch
					{...registerState('person.isActive')}
					label='Active'
					gridProps={{
						xs: 4,
					}}
				/>
				<Grid item alignSelf='center' xs={4}>
					I'm {isAdmin ? 'Admin' : 'Not Admin'}
				</Grid>
				<HookSwitch
					{...registerState('person.isAgent')}
					label='Agent'
					switchProps={{
						onChange(_event, checked) {
							setTimeout(() => {
								alert(`I'm ${checked ? 'an agent' : 'not an agent'}`);
							}, 300);
						},
					}}
					labelProps={{
						labelPlacement: 'start',
					}}
					gridProps={{
						xs: 4,
					}}
				/>
			</Grid>
		</div>
	);
});
