import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Pagination, Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useMenu } from '@lib/mui/hooks/useMenu';
import { usePagination } from '@lib/mui/hooks/usePagination';
import { useAccordion } from '@lib/mui/hooks/useAccordion';

const stories = storiesOf('MUI Hooks ↩', module);

stories.add('Summary', () => {
	return (
		<div>
			<h2>Welcome to MUI hooks</h2>
			<h3>Get the effortless `hooks` to `register` to your MUI `components`</h3>
			<ul>
				<li>useMenu</li>
				<li>usePagination</li>
				<li>useAccordion</li>
			</ul>
			<h4 style={{ fontSize: 'x-large', textAlign: 'center' }}>⬇⬇⬇</h4>
		</div>
	);
});

const items = ['Profile', 'My account', 'Logout'];

stories.add('useMenu', () => {
	const { register, open, handleOpen, handleClose } = useMenu();

	return (
		<div>
			<h2>MUI - Menu with `useMenu` hook</h2>
			<Button
				id='demo-positioned-button'
				aria-controls={open ? 'demo-positioned-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleOpen}>
				Dashboard
			</Button>
			<Menu {...register()}>
				{items.map((item) => (
					<MenuItem onClick={handleClose} key={item}>
						{item}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
});

stories.add('usePagination', () => {
	const { page, register } = usePagination({ defaultPage: 2 });

	return (
		<Stack spacing={2}>
			<h2>MUI - Pagination with `usePagination` hook from `mui-react-hook-form-plus`</h2>
			<Typography>Page: {page}</Typography>
			{/* Count will come form api! */}
			<Pagination variant='outlined' color='primary' count={10} {...register()} />
		</Stack>
	);
});

stories.add('useAccordion', () => {
	const { register: aRegister } = useAccordion();
	const { register: bRegister } = useAccordion();

	return (
		<Stack spacing={2}>
			<h2>MUI - Accordion with `useAccordion` hook from `mui-react-hook-form-plus`</h2>
			<div>
				<Accordion variant='outlined' {...aRegister()}>
					<AccordionSummary expandIcon={'⬇'} aria-controls='panel1bh-content'>
						<Typography sx={{ width: '33%', flexShrink: 0 }}>General settings</Typography>
						<Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
							dignissim quam.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion variant='outlined' {...bRegister()}>
					<AccordionSummary expandIcon={'⬇'} aria-controls='panel1bh-content'>
						<Typography sx={{ width: '33%', flexShrink: 0 }}>All settings</Typography>
						<Typography sx={{ color: 'text.secondary' }}>I am a Tester</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
							dignissim quam.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		</Stack>
	);
});
