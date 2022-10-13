import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Button, Grid, Typography } from '@mui/material';
import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';
import { HookSelect } from '@components/HookSelect';
import { jsonStringify } from '@utils/misc';

const stories = storiesOf('HookSelect 🖱', module);

stories.add('@HookSelect', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookSelect, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		person: {
			firstName: 'Atif',
			lastName: 'Aslam',
			sex: '',
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
				<a target='_blank' href='https://mui.com/material-ui/react-select/'>
					Select
				</a>{' '}
				hooked up with react-hook-form
			</h2>
			<h3>Learn How we use `selectProps` and `gridProps`</h3>
			<h3>We can also validate with `rules` prop</h3>
			<Grid container sx={{ minHeight: 90 }}>
				<HookSelect
					{...registerState('person.sex')}
					label='SEX'
					selectProps={{
						clearable: true,
					}}
					items={[
						{ label: 'MALE', value: 'male' },
						{ label: 'FEMALE', value: 'female' },
						{ label: 'OTHERS', value: 'others' },
					]}
					gridProps={{
						xs: 6,
						md: 4,
					}}
					rules={{
						required: {
							value: true,
							message: 'Please select atleast one',
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

stories.add('MultiSelect', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookSelect, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		person: {
			firstName: 'Atif',
			lastName: 'Aslam',
			// pass array if multiselect
			hobby: [],
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
				This is a{' '}
				<a target='_blank' href='https://mui.com/material-ui/react-select/#multiple-select'>
					Multi Select
				</a>
			</h2>
			<h3>Learn How we used `multiple` atrribute in `selectProps`</h3>
			<h3>We can also use `renderItem` prop to render custom items as needed</h3>
			<Grid container sx={{ minHeight: 80 }}>
				<HookSelect
					{...registerState('person.hobby')}
					label='Hobby'
					selectProps={{
						multiple: true,
					}}
					items={[
						{ label: 'Coding', value: 'coding' },
						{ label: 'Debugging', value: 'debugging' },
						{ label: 'Testing', value: 'testing' },
					]}
					renderItem={({ label }) => {
						return <Typography variant='caption'>💻 {label}</Typography>;
					}}
					gridProps={{
						xs: 6,
						md: 4,
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
