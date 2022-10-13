import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Grid } from '@mui/material';

import { HookSlider } from '@components/HookSlider';
import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';
import { jsonStringify } from '@utils/misc';

const stories = storiesOf('HookSlider 🎢', module);

stories.add('@HookSlider', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookSlider, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		price: {
			range: 30,
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
				<a target='_blank' href='https://mui.com/material-ui/react-slider/'>
					Slider
				</a>{' '}
				hooked up with react-hook-form
			</h2>
			<br />
			<h3>Learn How we use `sliderProps` and `gridProps`</h3>
			<h3>Adding `label` is a piece of 🥮</h3>
			<Grid container columnSpacing={{ xs: 1, md: 3 }}>
				<HookSlider
					{...registerState('price.range')}
					sliderProps={{
						valueLabelDisplay: 'on',
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

stories.add('Vertical Slider', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookSlider, useHookForm } from 'mui-react-hook-form-plus';

	const defaultValues = {
		price: {
			range: [10, 90],
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
			<h2>This is a Vertical slider with range selection</h2>
			<h3>Learn How we use `sliderProps` and `gridProps`</h3>
			<Grid container columnSpacing={{ xs: 1, md: 3 }} sx={{ height: 300 }}>
				<HookSlider
					{...registerState('price.range')}
					sliderProps={{
						orientation: 'vertical',
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
