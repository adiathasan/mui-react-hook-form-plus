import * as React from 'react';
import { useWatch } from 'react-hook-form';
import { storiesOf } from '@storybook/react';
import { ToggleButton } from '@mui/material';

import { HookToggleButtonGroup } from '@components/HookToggleButtonGroup';
import { useHookForm } from '@lib/react-hook-form/useHookForm';

const stories = storiesOf('HookToggleButtonGroup', module);

stories.add('@HookToggleButtonGroup', () => {
	// import { useWatch } from 'react-hook-form';
	// import { ToggleButton } from '@mui/material';
	// import { HookTextField, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = {
		view: 'web' as 'web' | 'android' | 'ios',
	};

	const { registerState, control } = useHookForm({
		defaultValues,
	});

	const view = useWatch({ control, name: 'view' });

	return (
		<div>
			<h2>This is a `ToggleButtonGroup` hooked up with `react-hook-form`</h2>
			<h4>Learn how we use `toggleButtonGroupProps` ☢</h4>
			<HookToggleButtonGroup
				{...registerState('view')}
				toggleButtonGroupProps={{
					color: 'secondary',
				}}>
				<ToggleButton value='web'>Web</ToggleButton>
				<ToggleButton value='android'>Android</ToggleButton>
				<ToggleButton value='ios'>iOS</ToggleButton>
			</HookToggleButtonGroup>
			<h4>You are in - {view ?? 'Earth'}</h4>
		</div>
	);
});

stories.add('Multiple Active', () => {
	// import { useWatch } from 'react-hook-form';
	// import { ToggleButton } from '@mui/material';
	// import { HookTextField, useHookForm } from 'mui-react-hook-form-plus ';

	const defaultValues = {
		view: ['web', 'ios'],
	};

	const { registerState, control } = useHookForm({
		defaultValues,
	});

	const view = useWatch({ control, name: 'view' });

	return (
		<div>
			<h2>This is a `ToggleButtonGroup` hooked up with `react-hook-form`</h2>
			<h3>Learn how we use `exclusive: false` in `toggleButtonGroupProps` to have multi toggle 🖱</h3>
			<HookToggleButtonGroup
				{...registerState('view')}
				toggleButtonGroupProps={{
					color: 'primary',
					exclusive: false,
				}}>
				<ToggleButton value='web'>Web</ToggleButton>
				<ToggleButton value='android'>Android</ToggleButton>
				<ToggleButton value='ios'>iOS</ToggleButton>
			</HookToggleButtonGroup>
			<h4>You are in - {view.join(' 🍠 ') || 'Earth'}</h4>
		</div>
	);
});
