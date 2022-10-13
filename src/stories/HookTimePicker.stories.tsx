import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useHookForm } from '@lib/react-hook-form/hooks/useHookForm';
import { jsonStringify } from '@utils/misc';
import { HookTimePicker } from '@components/HookTimePicker';
import { HookStaticTimePicker } from '@components/HookStaticTimePicker';
import { HookDesktopTimePicker } from '@components/HookDesktopTimePicker';
import { HookMobileTimePicker } from '@components/HookMobileTimePicker';

const stories = storiesOf('TimePicker 🕗', module);

stories.add('HookTimePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookTimePicker, useHookForm } from 'mui-react-hook-form-plus ';

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
				<h2>This is a `TimePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `TimePickerProps` 🐭</h3>
				<HookTimePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					timePickerProps={{
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

stories.add('HookStaticTimePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookStaticTimePicker, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = {
		trialEndsAt: new Date(),
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
				<h2>This is a `StaticTimePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `staticTimePickerProps` 🐭</h3>
				<div style={{ position: 'relative', margin: '0 auto', maxWidth: 800 }}>
					<HookStaticTimePicker
						{...registerState('trialEndsAt')}
						rules={{
							required: true,
						}}
						staticTimePickerProps={{
							orientation: 'landscape',
							openTo: 'minutes',
							ampm: true,
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

stories.add('HookDesktopTimePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookDesktopTimePicker, useHookForm } from 'mui-react-hook-form-plus ';

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
				<h2>This is a `DesktopTimePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `desktopTimePickerProps` 🐭</h3>
				<HookDesktopTimePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					desktopTimePickerProps={{
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

stories.add('HookMobileTimePicker', () => {
	// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
	// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
	// import { Button } from '@mui/material';

	// import { HookMobileTimePicker, useHookForm } from 'mui-react-hook-form-plus ';

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
				<h2>This is a `MobileTimePicker` hooked up with `react-hook-form`</h2>
				<h3>Learn how we use `mobileTimePickerProps` 🐭</h3>
				<HookMobileTimePicker
					{...registerState('trialEndsAt')}
					rules={{
						required: true,
					}}
					mobileTimePickerProps={{
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
