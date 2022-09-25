import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Grid } from '@mui/material';

import { HookRating } from '@components/HookRating';
import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';
import { jsonStringify } from '@utils/misc';

const stories = storiesOf('HookRating', module);

stories.add('@HookRating', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookRating, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		player: {
			rating: 3.5,
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
				<a target='_blank' href='https://mui.com/material-ui/react-rating/'>
					Rating
				</a>{' '}
				hooked up with react-hook-form
			</h2>
			<h3>Learn How we use `ratingProps` and `gridProps`</h3>
			<Grid container columnSpacing={{ xs: 1, md: 3 }}>
				<HookRating
					{...registerState('player.rating')}
					ratingProps={{
						precision: 0.5,
					}}
					gridProps={{
						xs: 12,
					}}
				/>
			</Grid>
			<br />
			<br />
			<Grid>
				<Button type='submit' variant='contained'>
					Submit
				</Button>
			</Grid>
		</form>
	);
});
