import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, CircularProgress, Grid } from '@mui/material';

import { HookAutoComplete } from '@components/HookAutoComplete';
import { jsonStringify, sleep } from '@utils/misc';
import { useHookForm } from '@lib/react-hook-form/useHookForm';
import { top100Films } from '@utils/auto-complete-mock';

const stories = storiesOf('HookAutoComplete ⌨', module);

stories.add('@HookAutoComplete 🛫', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookAutoComplete, useHookForm } from 'mui-react-hook-form-plus ';

	/**
	 * (alias) const top100Films: {
    		label: string;
    		year: number;
		}[]
		
		import top100Films
	 */

	interface DefaultValues {
		movie: {
			label: string;
			year: number;
		} | null;
	}

	const defaultValues = {
		movie: null,
	};

	const { registerState, handleSubmit } = useHookForm<DefaultValues>({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>This is a `AutoComplete` hooked up with `react-hook-form`</h2>
			<h3>Learn how we use `autocompleteProps` & `textFieldProps` 🥡</h3>
			<Grid container spacing={3} sx={{ minHeight: 120 }}>
				<HookAutoComplete
					{...registerState('movie')}
					autocompleteProps={{
						options: top100Films,
						autoHighlight: true,
						isOptionEqualToValue: ({ label }, value) => label === value.label,
					}}
					textFieldProps={{
						label: 'Movie',
						placeholder: 'The...',
					}}
					gridProps={{
						xs: 12,
					}}
					rules={{
						required: {
							message: 'Required',
							value: true,
						},
					}}
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

stories.add('Asynchronous 🏃', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookAutoComplete, useHookForm } from 'mui-react-hook-form-plus ';

	interface DefaultValues {
		movie: {
			label: string;
			year: number;
		} | null;
	}

	const [options, setOptions] = React.useState<typeof top100Films>([]);
	const [open, setOpen] = React.useState(false);

	const loading = open && options.length === 0;

	const defaultValues = {
		movie: null,
	};

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			await sleep(1e3); // For demo purposes.

			if (active) {
				setOptions([...top100Films]);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	const { registerState, handleSubmit } = useHookForm<DefaultValues>({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Asynchronous `Request` state can be optained</h2>
			<h3>Learn how we use `autocompleteProps` & `textFieldProps` 🥡</h3>
			<Grid container spacing={3} sx={{ minHeight: 120 }}>
				<HookAutoComplete
					{...registerState('movie')}
					autocompleteProps={{
						options,
						autoHighlight: true,
						isOptionEqualToValue: ({ label }, value) => label === value.label,
						loading,
						open,
						onOpen: () => {
							setOpen(true);
						},
						onClose: () => {
							setOpen(false);
						},
					}}
					textFieldProps={{
						label: 'Movie',
						placeholder: 'The...',
						InputProps: {
							endAdornment: <>{loading ? <CircularProgress color='inherit' size={20} /> : null}</>,
						},
					}}
					gridProps={{
						xs: 12,
					}}
					rules={{
						required: {
							message: 'Required',
							value: true,
						},
					}}
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

stories.add('Multi Value 🎮', () => {
	// import { Button, Grid } from '@mui/material';
	// import { HookAutoComplete, useHookForm } from 'mui-react-hook-form-plus ';

	/**
	 * (alias) const top100Films: {
    		label: string;
    		year: number;
		}[]
		
		import top100Films
	 */

	interface DefaultValues {
		movie: {
			label: string;
			year: number;
		}[];
	}

	const defaultValues = {
		movie: [top100Films[6], top100Films[8]],
	};

	const { registerState, handleSubmit } = useHookForm<DefaultValues>({
		defaultValues,
	});

	const onSubmit = (_data: typeof defaultValues) => {
		alert(jsonStringify(_data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Multi Value type is a piece of 🧁. Just add `multiple`</h2>
			<h3>Learn how we use `autocompleteProps` & `textFieldProps` 🥡</h3>
			<Grid container spacing={3} sx={{ minHeight: 120 }}>
				<HookAutoComplete
					{...registerState('movie')}
					autocompleteProps={{
						options: top100Films,
						autoHighlight: true,
						isOptionEqualToValue: ({ label }, value) => label === value.label,
						multiple: true,
					}}
					textFieldProps={{
						label: 'Movie',
						placeholder: 'Search...',
					}}
					gridProps={{
						xs: 12,
					}}
					rules={{
						required: {
							message: 'Required',
							value: true,
						},
					}}
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
