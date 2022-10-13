import * as React from 'react';
import { useWatch } from 'react-hook-form';
import { storiesOf } from '@storybook/react';
import { Button, Grid } from '@mui/material';

import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';
import { HookCheckBox } from '@components/HookCheckBox';
import { jsonStringify } from '@utils/misc';

const stories = storiesOf('HookCheckBox ✔', module);

stories.add('@HookCheckBox', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookCheckBox, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		person: {
			isAdmin: true,
			isPlayer: true,
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
			<h2>
				This is a MUI{' '}
				<a target='_blank' href='https://mui.com/material-ui/react-checkbox/'>
					CheckBox
				</a>{' '}
				hooked up with react-hook-form
			</h2>
			<h3>Learn How we display `label` and use `gridProps`</h3>
			<Grid container columnSpacing={{ xs: 1, md: 3 }}>
				<HookCheckBox
					{...registerState('person.isAdmin')}
					formControlLabelProps={{
						label: 'Admin',
					}}
					gridProps={{
						xs: 4,
					}}
				/>
				<HookCheckBox
					{...registerState('person.isPlayer')}
					formControlLabelProps={{
						label: 'Player',
						labelPlacement: 'start',
					}}
					gridProps={{
						xs: 4,
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

stories.add('Group CheckBox', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookCheckBox, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		person: {
			isAdmin: false,
			isPlayer: false,
		},
	};

	const { registerState, handleSubmit, control } = useHookForm({
		defaultValues,
	});

	const person = useWatch({
		control,
		name: 'person',
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>We can group checkbox easily. Follow the example below. </h2>
			<h3> One downside is that you have to register with a name with `registerState()` Fn. </h3>

			<h3>
				We can even show <span style={{ color: 'red' }}>`error`</span> message using custom validation
			</h3>
			<Grid
				container
				style={{
					minHeight: 150,
				}}>
				<HookCheckBox
					{...registerState('person')}
					label='Settings'
					groupCheckProps={[
						{
							name: 'person.isAdmin',
							formControlLabelProps: {
								label: 'Admin',
							},
						},
						{
							name: 'person.isPlayer',
							formControlLabelProps: {
								label: 'Player',
							},
						},
					]}
					gridProps={{
						xs: 10,
					}}
					error={{
						value: !(person.isAdmin || person.isPlayer),
						message: 'One must be selected',
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

stories.add('Colored Checkbox', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookCheckBox, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		person: {
			isAdmin: true,
			isPlayer: true,
			isConfident: true,
			isCadet: true,
			isBoring: true,
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
			<h2>Learn how we can have achieve colored checkbox and learn how to we have used `gridProps`.</h2>
			<Grid container columnSpacing={{ xs: 1, md: 3 }}>
				<HookCheckBox
					{...registerState('person.isAdmin')}
					checkBoxProps={{
						color: 'primary',
					}}
					gridProps={{
						xs: 2,
					}}
				/>
				<HookCheckBox
					{...registerState('person.isPlayer')}
					checkBoxProps={{
						color: 'secondary',
					}}
					gridProps={{
						xs: 2,
					}}
				/>
				<HookCheckBox
					{...registerState('person.isCadet')}
					checkBoxProps={{
						color: 'warning',
					}}
					gridProps={{
						xs: 2,
					}}
				/>
				<HookCheckBox
					{...registerState('person.isConfident')}
					checkBoxProps={{
						color: 'success',
					}}
					gridProps={{
						xs: 2,
					}}
				/>
				<HookCheckBox
					{...registerState('person.isBoring')}
					checkBoxProps={{
						color: 'error',
					}}
					gridProps={{
						xs: 2,
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
