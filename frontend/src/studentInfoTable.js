import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AdbIcon from '@material-ui/icons/Adb';
import CreateGroup from './groupConfirmation.js';
import {postApi} from "./Api";
import {toast} from "react-toastify";

function createData(name, calories, fat, carbs, protein) {
	return {name, calories, fat, carbs, protein};
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{id: 'sid', disablePadding: true, align: 'left', label: 'Student ID'},
	{id: 'email', disablePadding: false, align: 'left', label: 'Email'},
	{id: 'skills', disablePadding: false, align: 'left', label: 'Skills'},
	{id: 'role', disablePadding: false, align: 'left', label: 'Role'},
];

function EnhancedTableHead(props) {
	const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{'aria-label': 'select all desserts'}}
						color="primary"
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({}));

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	header: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
		backgroundColor: theme.palette.primary.dark,
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
		boxShadow: 12,
		borderColor: 'red'
		// paddingTop: '30vh'
	},
	table: {
		minWidth: 750,

	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	space: {
		paddingTop: '10vh'
	},
	highlight:
		theme.palette.type === 'dark'
			? {
				color: theme.palette.primary.main,
				backgroundColor: lighten(theme.palette.primary.light, 0.85),
			}
			: {
				color: theme.palette.primary.main,
				backgroundColor: theme.palette.primary.main,
			},
	title: {
		flex: '1 1 100%',
		color: 'white'
	},
	icon: {
		color: 'white'
	}
}));


export default function StudentTable(props) {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('sid');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const {rows, topic} = props;

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const StyledTableRow = withStyles((theme) => ({
		root: {
			'&:nth-of-type(odd)': {
				backgroundColor: theme.palette.action.hover,
			},
			'&:selected': {
				backgroundColor: "purple"
			}
		},
	}))(TableRow);

	const handleAutoGroup = () => {
		const body = [];
		let count = 1;
		while(topic.candidates && topic.candidates.length > 0){
			const members = [];
			let frontendSatisfied = true;
			let backendSatisfied = true;
			let found = false;
			for(let i=0; i<topic.frontend.minNumber; i++){
				found = false;
				for(let j in topic.candidates){
					if(topic.candidates[j].role === 'frontend' && !topic.candidates[j].grouped){
						members.push(topic.candidates[j].user.id);
						topic.candidates[j].grouped = true;
						found = true;
						break;
					}
				}
				if(!found){
					frontendSatisfied = false;
					break;
				}
			}

			for(let i=0; i<topic.backend.minNumber; i++){
				found = false;
				for(let j in topic.candidates){
					if(topic.candidates[j].role === 'backend' && !topic.candidates[j].grouped){
						members.push(topic.candidates[j].user.id);
						topic.candidates[j].grouped = true;
						found = true;
						break;
					}
				}
				if(!found){
					backendSatisfied = false;
					break;
				}
			}

			if(frontendSatisfied && backendSatisfied) {
				body.push({
					groupName: 'GroupA' + (count++),
					members
				});
				topic.candidates = topic.candidates.filter(c=>!c.grouped);
			} else {
				let c = 0;
				while(topic.candidates && topic.candidates.length > 0) {
					body[c].members.push(topic.candidates[0].user.id);
					topic.candidates[0].grouped = true;
					c++;
					if(c>body.length -1){
						c -= body.length;
					}
					topic.candidates = topic.candidates.filter(can=>!can.grouped);
				}
			}
		}
		console.log(body);
		postApi("/topics/" + props.topic.id + "/groups", body).then((res) => {
			//Use the response data.
			if (res.result === "success") {
				toast.success("You have successfully created a group.", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
				});
				window.location.reload();
			} else {
				toast.error("Submission failed.", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
				});
			}
		});
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} elevation={15}>
				<Toolbar
					className={clsx(classes.header, {
						[classes.highlight]: selected.length > 0,
					})}
				>
					{selected.length > 0 ? (
						<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
							{selected.length} selected
						</Typography>
					) : (
						<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
							Candidates not in Groups
						</Typography>
					)}

					{selected.length > 0 ? (
							<Tooltip title="Create Group">
								<CreateGroup userList={selected} topic={topic}/>
							</Tooltip>
						)
						: (
							<Tooltip>
								<IconButton disabled="true">
									<GroupAddIcon className={classes.icon} fontSize="large"/>
								</IconButton>
							</Tooltip>
						)
					}
					<Tooltip title="Auto Group">
						<IconButton onClick={handleAutoGroup}>
							<AdbIcon className={classes.icon} fontSize="large"/>
						</IconButton>
					</Tooltip>
				</Toolbar>
				<TableContainer>
					<Table
						className={classes.table}
						size='medium'
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.user.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<StyledTableRow
											hover
											onClick={(event) => handleClick(event, row.user.id)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.user.id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													color="primary"
												/>
											</TableCell>
											<TableCell component="th" id={labelId} scope="row" padding="none">
												{row.user.studentId}
											</TableCell>
											<TableCell align="left">{row.user.email}</TableCell>
											<TableCell
												align="left">{row.user.skills ? row.user.skills.join(', ') : ''}</TableCell>
											<TableCell align="left">{row.role}</TableCell>
										</StyledTableRow>
									);
								})}
							{emptyRows > 0 && (
								<StyledTableRow style={{height: 53 * emptyRows}}>
									<TableCell colSpan={6}/>
								</StyledTableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	)

}