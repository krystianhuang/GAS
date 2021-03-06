import React, {useContext, useEffect} from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {mainListItems, secondaryListItems} from "./studentListItems";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {getApi} from "./Api";
import Grid from "@material-ui/core/Grid";
import {userContext} from "./userContext";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
		margin: "30px 20px",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},

	form: {
		padding: '20px',
		marginTop: '80px',
	}
}));

export default function Dashboard() {
	const {user} = useContext(userContext);
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const [topics, setTopics] = React.useState([]);
	const [group, setGroup] = React.useState({});

	useEffect(() => {
		getApi('users/' + user.id + '/topics').then(data => setTopics(data));
	}, []);

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleTopicChange = (event) => {
		getApi('users/' + user.id + '/topics/' + event.target.value).then(data => setGroup(data));
	}

	return (
		<div className={classes.root}>
			<CssBaseline/>
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
								<MenuItem key={topic.topicId} value={topic.topicId}>
									{topic.topicName}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<h4>{group.name}</h4>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Student ID</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>Skills</TableCell>
										<TableCell>Role</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{group.members && group.members.map((row) => (
										<TableRow key={row.email}>
											<TableCell>{row.studentId}</TableCell>
											<TableCell>{row.email}</TableCell>
											<TableCell>{row.skills.join(', ')}</TableCell>
											<TableCell>{row.role}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</main>
		</div>
	);
}
