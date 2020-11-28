import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '100%',
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: '#264653',
		zIndex: theme.zIndex.drawer + 1,
	},
	link: {
		textDecoration: 'none',
		color: 'white',
	},
	buttonMargin: {
		marginRight: 5,
		marginLeft: 'auto',
		textDecoration: 'none',
		color: 'white',
	},
}));

const TopNavBar = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<Link className={classes.link} to='/'>
						<Typography variant='h4' noWrap>
							Local Choss
						</Typography>
					</Link>
					{props.loggedInStatus.isLoggedIn === true ? (
						<Link className={classes.buttonMargin} to='/'>
							<Button onClick={props.handleLogout} color='inherit'>
								Sign Out
							</Button>
						</Link>
					) : null}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default TopNavBar;
