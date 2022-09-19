import * as React from 'react';
import { Button } from '@mui/material';
import { storiesOf } from '@storybook/react';

import { useHookForm } from '@lib/react-hook-form/useHookForm';
import { HookTextField } from '@components/HookTextField';
import { jsonStringify } from '@utils/misc';
import { Stack } from '@mui/system';

const stories = storiesOf('useHookForm', module);

stories.add('@setValues', () => {
	// import { HookTextField, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = { firstName: 'Adiat', lastName: 'Hasan' };

	const { registerState, handleSubmit, reset, setValues } = useHookForm({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h3>Learn how to add or reset multiple fields with new `setValues` from `useHookForm` hook</h3>

			<Stack direction='row' spacing={2}>
				<HookTextField {...registerState('firstName')} />
				<HookTextField {...registerState('lastName')} />
			</Stack>
			<br />
			<Stack direction='row' spacing={2}>
				<Button
					variant='outlined'
					onClick={() => {
						setValues({
							firstName: 'CHICHI',
							lastName: 'FOFO',
						});
					}}>
					CHANGE
				</Button>
				<Button
					color='error'
					variant='outlined'
					onClick={() => {
						reset();
					}}>
					RESET
				</Button>
				<Button color='info' variant='contained' type='submit'>
					Submit
				</Button>
			</Stack>
		</form>
	);
});
