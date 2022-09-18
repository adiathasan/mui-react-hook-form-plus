import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { useHookForm } from '@lib/react-hook-form/useHookForm';
import { HookTextField } from '@components/HookTextField';

const stories = storiesOf('HookTextField', module);

stories.add('@HookTextField', () => {
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
