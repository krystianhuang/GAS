import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

export const mainListItems = (
	<div>
		<ListItem button component={Link} to="/viewStudentInfo">
			<ListItemIcon>
				<EditIcon/>
			</ListItemIcon>
			<ListItemText primary="Group Assigner"/>
		</ListItem>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListItem button component={Link} to="/studentData">
			<ListItemIcon>
				<PersonIcon/>
			</ListItemIcon>
			<ListItemText primary="User Info"/>
		</ListItem>
		<ListItem button component={Link} to="/">
			<ListItemIcon>
				<ExitToAppIcon/>
			</ListItemIcon>
			<ListItemText primary="Sign Out"/>
		</ListItem>
	</div>
);