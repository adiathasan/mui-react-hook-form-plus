import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Backdrop,
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Pagination,
	Stack,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import { Add as AddIcon } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import { Restore as RestoreIcon } from '@mui/icons-material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { LocationOn as LocationOnIcon } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

import { useBottomNavigation } from '@lib/mui/hooks/useBottomNavigation';
import { usePagination } from '@lib/mui/hooks/usePagination';
import { useAccordion } from '@lib/mui/hooks/useAccordion';
import { useBackdrop } from '@lib/mui/hooks/useBackdrop';
import { useDialog } from '@lib/mui/hooks/useDialog';
import { useMenu } from '@lib/mui/hooks/useMenu';
import { useTabs } from '@lib/mui/hooks/useTabs';

const stories = storiesOf('MUI Hooks ↩', module);

stories.add('Summary', () => {
	return (
		<div>
			<h2>Welcome to MUI hooks</h2>
			<h3>Get the effortless `hooks` to `register` to your MUI `components`</h3>
			<ul>
				<li>useMenu</li>
				<li>usePagination</li>
				<li>useTabs</li>
				<li>useBottomNavigation</li>
				<li>useAccordion</li>
				<li>useDialog</li>
				<li>useBackdrop</li>
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

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

stories.add('useTabs', () => {
	const { register, value } = useTabs();

	return (
		<Stack spacing={2}>
			<h2>MUI - Tabs with `useTabs` hook from `mui-react-hook-form-plus`</h2>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs {...register()} aria-label='basic tabs example'>
						<Tab label='Item One' />
						<Tab label='Item Two' />
						<Tab label='Item Three' />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					Item One
				</TabPanel>
				<TabPanel value={value} index={1}>
					Item Two
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item Three
				</TabPanel>
			</Box>
		</Stack>
	);

	/**
	 * function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}
	 */
});
stories.add('useBottomNavigation', () => {
	const { register } = useBottomNavigation();

	return (
		<Box sx={{ width: 500 }}>
			<BottomNavigation {...register()} style={{ backgroundColor: '#eaf2ff' }} showLabels>
				<BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
				<BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
				<BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
			</BottomNavigation>
		</Box>
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

const emails = ['username@gmail.com', 'user02@gmail.com'];

stories.add('useDialog', () => {
	const { register, open } = useDialog();

	return (
		<Stack spacing={2}>
			<h2>MUI - Dialog with `useDialog` hook from `mui-react-hook-form-plus`</h2>
			<Button variant='outlined' onClick={open}>
				Open simple dialog
			</Button>

			<Dialog {...register()}>
				<DialogTitle>Set backup account</DialogTitle>
				<List sx={{ pt: 0 }}>
					{emails.map((email) => (
						<ListItem button key={email}>
							<ListItemAvatar>
								<Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={email} />
						</ListItem>
					))}
					<ListItem autoFocus button>
						<ListItemAvatar>
							<Avatar>
								<AddIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Add account' />
					</ListItem>
				</List>
			</Dialog>
		</Stack>
	);
});

stories.add('useBackdrop', () => {
	const { register, open } = useBackdrop();

	return (
		<Stack spacing={2}>
			<h2>MUI - Backdrop with `useBackdrop` hook from `mui-react-hook-form-plus`</h2>
			<Button onClick={open} variant='outlined'>
				Show backdrop
			</Button>
			<Backdrop style={{ zIndex: 10000 }} {...register()}>
				<CircularProgress color='inherit' />
			</Backdrop>
		</Stack>
	);
});
