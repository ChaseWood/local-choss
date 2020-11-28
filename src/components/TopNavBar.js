import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const TopNavBar = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Link to='/'>
						<Typography variant='h6' className={classes.title}>
							Local Choss
						</Typography>
					</Link>
					<Link to='/'>
						<Button onClick={props.handleLogout} color='inherit'>
							Sign Out
						</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default TopNavBar;
