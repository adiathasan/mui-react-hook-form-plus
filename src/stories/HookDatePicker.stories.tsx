import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';
import { jsonStringify } from '@utils/misc';
import { HookDatePicker } from '@components/HookDatePicker';
import { HookStaticDatePicker } from '@components/HookStaticDatePicker';
import { HookDesktopDatePicker } from '@components/HookDesktopDatePicker';
import { HookMobileDatePicker } from '@components/HookMobileDatePicker';

const stories = storiesOf('DatePicker', module);

stories.add('HookDatePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookDatePicker, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = {
		trialEndsAt: null as Date | null,
	};

	const { registerState, handleSubmit } = useHookForm({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>This is a `DatePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `datePickerProps` 🐭</h3>
				<HookDatePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					datePickerProps={{
						label: 'Basic',
					}}
				/>
				<br />
				<Button sx={{ marginTop: 2 }} type='submit' variant='contained'>
					Submit
				</Button>
			</form>
		</LocalizationProvider>
	);
});

stories.add('HookStaticDatePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookStaticDatePicker, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = {
		trialEndsAt: null as Date | null,
	};

	const { registerState, handleSubmit } = useHookForm({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>This is a `StaticDatePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `staticDatePickerProps` 🐭</h3>
				<HookStaticDatePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					staticDatePickerProps={{
						displayStaticWrapperAs: 'desktop',
						openTo: 'year',
					}}
				/>
				<br />
				<Button sx={{ marginTop: 2 }} type='submit' variant='contained'>
					Submit
				</Button>
			</form>
		</LocalizationProvider>
	);
});

stories.add('HookDesktopDatePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookDesktopDatePicker, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = {
		trialEndsAt: null as Date | null,
	};

	const { registerState, handleSubmit } = useHookForm({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>This is a `DesktopDatePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `desktopDatePickerProps` 🐭</h3>
				<HookDesktopDatePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					desktopDatePickerProps={{
						label: 'Desktop',
					}}
				/>
				<br />
				<Button sx={{ marginTop: 2 }} type='submit' variant='contained'>
					Submit
				</Button>
			</form>
		</LocalizationProvider>
	);
});

stories.add('HookMobileDatePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookMobileDatePicker, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = {
		trialEndsAt: new Date() as Date,
	};

	const { registerState, handleSubmit } = useHookForm({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>This is a `MobileDatePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `mobileDatePickerProps` 🐭</h3>
				<HookMobileDatePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					mobileDatePickerProps={{
						label: 'Mobile',
					}}
				/>
				<br />
				<Button sx={{ marginTop: 2 }} type='submit' variant='contained'>
					Submit
				</Button>
			</form>
		</LocalizationProvider>
	);
});
