import * as React from 'react';
import { Button } from '@mui/material';
import { storiesOf } from '@storybook/react';

import { useHookForm } from '@lib/react-hook-form/useHookForm';
import { HookTextField } from '@components/HookTextField';
import { useInputValidate } from '@hooks/useInputValidate';
import { useFillFormValues } from '@lib/react-hook-form/useFillFormValues';

const stories = storiesOf('HookTextField', module);

stories.add('HookTextField', () => {
	// import { HookTextField, useHookForm } from '@mui-react-hook-form-plus ';

	const defaultValues = { text: 'Typescript is awesome' };

	const { registerState, handleSubmit } = useHookForm({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(JSON.stringify(_data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h3>This is a text field hooked up with react-hook-form</h3>
			<HookTextField {...registerState('text')} />
		</form>
	);
});

stories.add('useFillFormValues', () => {
	// import { HookTextField, useHookForm, useFillFormValues } from '@mui-react-hook-form-plus ';

	const defaultValues = { name: 'Adiat', sex: 'male' };

	const { registerState, handleSubmit, setValue, reset } = useHookForm({
		defaultValues,
	});

	const { setterFn } = useFillFormValues(setValue);

	const onSubmit = (_data: typeof defaultValues) => {
		alert(JSON.stringify(_data));
	};

	const validate = useInputValidate();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h3>Learn how to add or reset multiple fields with new `useFillFormValues` hook</h3>

			<HookTextField {...registerState('name')} />
			<HookTextField {...registerState('sex')} />
			<hr />
			<Button
				variant='contained'
				onClick={() => {
					setterFn({
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
