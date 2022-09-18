import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { useHookForm } from '@lib/react-hook-form/useHookForm';
import { HookTextField } from '@components/HookTextField';
import { Button } from '@mui/material';

const stories = storiesOf('useHookForm', module);

stories.add('@setValues', () => {
	// import { HookTextField, useHookForm } from '@mui-react-hook-form-plus ';

	const defaultValues = { name: 'Adiat', sex: 'male' };

	const { registerState, handleSubmit, reset, setValues } = useHookForm({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(JSON.stringify(_data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h3>Learn how to add or reset multiple fields with new `setValues` from `useHookForm` hook</h3>

			<HookTextField {...registerState('name')} />
			<HookTextField {...registerState('sex')} />
			<hr />
			<Button
				variant='contained'
				onClick={() => {
					setValues({
						name: 'CHICHI',
						sex: 'FEMALE',
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
		</form>
	);
});
