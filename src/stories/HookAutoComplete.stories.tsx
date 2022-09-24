import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Grid } from '@mui/material';

import { HookAutoComplete } from '@components/HookAutoComplete';
import { jsonStringify } from '@utils/misc';
import { useHookForm } from '@lib/react-hook-form/useHookForm';
import { top100Films } from '@utils/auto-complete-mock';

const stories = storiesOf('HookAutoComplete', module);

stories.add('@HookAutoComplete', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookAutoComplete, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = {
		movie: null,
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
			<Grid container spacing={3} sx={{ minHeight: 120 }}>
				<HookAutoComplete
					{...registerState('movie')}
					autocompleteProps={{
						options: top100Films,
						autoHighlight: true,
						isOptionEqualToValue: ({ label }, value) => label === value.label,
					}}
					textFieldProps={{
						label: 'Movie',
						placeholder: 'The...',
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
