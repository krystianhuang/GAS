import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {mainListItems, secondaryListItems} from './listItems';
import StudentTable from './studentInfoTable.js';
import {getApi} from "./Api";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";


function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
}));

export default function EnhancedTable() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const [topics, setTopics] = React.useState([]);
	const [topic, setTopic] = React.useState({candidates: [], groups: []});
	// Send get users api and set rows in state.
	useEffect(() => {
		getApi('/topics').then(data => setTopics(data));
	}, []);

	const handleTopicChange = (event) => {
		for (let i in topics) {
			if (topics[i].id === event.target.value) {
				if (topics[i].groups) {
					const groups = [];
					for (let key of Object.keys(topics[i].groups)) {
						groups.push(topics[i].groups[key]);
					}
					topics[i].groups = groups;
				}
				setTopic(topics[i]);
				break;
			}
		}
	}

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<div className={classes.root}>
			<CssBaseline/>
			<AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
					>
						<MenuIcon/>
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						Student Assigner Tool
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon/>
					</IconButton>
				</div>
				<Divider/>
				<List>{mainListItems}</List>
				<Divider/>
				<List>{secondaryListItems}</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer}/>
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								id="outlined-select-currency"
								select
								label="Topic"
								onChange={handleTopicChange}
								helperText="Please select a topic"
								variant="outlined"
								fullWidth
							>
								{topics.map((topic) => (
									<MenuItem key={topic.id} value={topic.id}>
										{topic.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<StudentTable rows={topic.candidates ? topic.candidates : []} topic={topic}/>
						</Grid>
						{topic.groups && topic.groups.map((group) => (
							<Grid item xs={12}>
								<Card variant="outlined">
									<CardContent>
										<Typography color="textSecondary" variant="h5" component="h2" gutterBottom>
											{group.name}
										</Typography>
										<Divider/>
										<Table size="small">
											<TableHead>
												<TableRow>
													<TableCell>Student ID</TableCell>
													<TableCell>Email</TableCell>
													<TableCell>Skills</TableCell>
													<TableCell>Role</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{group.members.map((row) => (
													<TableRow key={row.studentId}>
														<TableCell component="th" scope="row">
															{row.studentId}
														</TableCell>
														<TableCell>{row.email}</TableCell>
														<TableCell>{row.skills.join(',')}</TableCell>
														<TableCell>{row.role}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
					<Box pt={4}>
						<Copyright/>
					</Box>
				</Container>
			</main>
		</div>
	);
}

