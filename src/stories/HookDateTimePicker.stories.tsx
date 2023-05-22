import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';
import { jsonStringify } from '@utils/misc';
import { HookDateTimePicker } from '@components/HookDateTimePicker';
import { HookStaticDateTimePicker } from '@components/HookStaticDateTimePicker';
import { HookDesktopDateTimePicker } from '@components/HookDesktopDateTimePicker';
import { HookMobileDateTimePicker } from '@components/HookMobileDateTimePicker';

const stories = storiesOf('DateTimePicker', module);

stories.add('HookDateTimePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookDateTimePicker, useHookForm } from 'mui-react-hook-form-plus ';

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
				<h2>This is a `DateTimePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `dateTimePickerProps` 🐭</h3>
				<HookDateTimePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					dateTimePickerProps={{
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

stories.add('HookStaticDateTimePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookStaticDateTimePicker, useHookForm } from 'mui-react-hook-form-plus ';

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
				<h2>This is a `StaticDateTimePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `staticDateTimePickerProps` 🐭</h3>
				<div style={{ position: 'relative', margin: '0 auto', maxWidth: 600 }}>
					<HookStaticDateTimePicker
						{...registerState('trialEndsAt')}
						rules={{
							required: true,
						}}
						staticDateTimePickerProps={{
							displayStaticWrapperAs: 'desktop',
							openTo: 'year',
						}}
					/>
				</div>
				<br />
				<Button sx={{ marginTop: 2 }} type='submit' variant='contained'>
					Submit
				</Button>
			</form>
		</LocalizationProvider>
	);
});

stories.add('HookDesktopDateTimePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookDesktopDateTimePicker, useHookForm } from 'mui-react-hook-form-plus ';

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
				<h2>This is a `DesktopDateTimePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `desktopDateTimePickerProps` 🐭</h3>
				<HookDesktopDateTimePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					desktopDateTimePickerProps={{
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

stories.add('HookMobileDateTimePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookMobileDateTimePicker, useHookForm } from 'mui-react-hook-form-plus ';

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
				<h2>This is a `MobileDateTimePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `mobileDateTimePickerProps` 🐭</h3>
				<HookMobileDateTimePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					mobileDateTimePickerProps={{
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
