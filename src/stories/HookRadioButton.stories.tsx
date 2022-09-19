import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { HookTextField } from '@components/HookTextField';
import { Button, Grid } from '@mui/material';
import { useHookForm } from '@lib/react-hook-form/useHookForm';
import HookRadioButton from '@components/HookRadioButton';
import { jsonStringify } from '@utils/misc';

const stories = storiesOf('HookRadioButton', module);

stories.add('@HookRadioButton', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookRadioButton, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		person: {
			firstName: 'Atif',
			lastName: 'Aslam',
			sex: 'male',
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
			<h3>This is a Radio field hooked up with react-hook-form</h3>
			<Grid container columnSpacing={{ xs: 1, md: 3 }}>
				<HookRadioButton
					gridProps={{
						xs: 12,
						md: 6,
					}}
					{...registerState('person.sex')}
					fields={[
						{ label: 'MALE', value: 'male' },
						{ label: 'FEMALE', value: 'female' },
						{ label: 'OTHERS', value: 'others' },
					]}
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
