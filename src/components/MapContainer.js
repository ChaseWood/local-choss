import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import SearchableMap from './SearchableMap';
import { TextareaAutosize } from '@material-ui/core';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '100%',
		///////////////added button styles/////////////
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	//style for map
	content: {
		width: '100%',
		flexGrow: 1,
	},
	//style for login buttons
	menuButton: {
		marginLeft: 'auto',
	},
	title: {
		flexGrow: 1,
	},
}));

export default function ClippedDrawer(props) {
	const classes = useStyles();
	///////////////added states and functions/////////////
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleChange = (event) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const setToDo = (climb) => {
		console.log(props.loggedInStatus);
		axios({
			method: 'post',
			url: 'http://localhost:3001/climbs',
			data: {
				route_id: climb.id,
				name: climb.name,
				style: climb.type,
				rating: climb.rating,
				stars: climb.stars,
				pitches: climb.pitches,
				location: climb.location,
				longitude: climb.longitude,
				latitude: climb.latitude,
				url: climb.url,
				user_id: props.loggedInStatus.user.id,
			},
		}).then(
			(response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<Typography variant='h4' noWrap>
						Local Choss
					</Typography>
					<Typography variant='h6' noWrap>
						Crags by State
					</Typography>
					{/*/////////// Login and profile buttons ///////////*/}
					{auth && (
						<div className={classes.menuButton}>
							{props.loggedInStatus.isLoggedIn === true ? null : (
								<Link to='/login'>
									<Button color='inherit'>Login</Button>
								</Link>
							)}
							{props.loggedInStatus.isLoggedIn === true ? null : (
								<Link to='/signup'>
									<Button color='inherit'>SignUp</Button>
								</Link>
							)}
							{props.loggedInStatus.isLoggedIn === true ? (
								<Link to='/logout'>
									<Button color='inherit'>logout</Button>
								</Link>
							) : null}
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								color='inherit'>
								<AccountCircle />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						{props.climbs.routes
							? props.climbs.routes.map((route) => (
									<>
										<ListItem button key={route.name}>
											<h3>{route.name}</h3>
											<Button
												variant='contained'
												text='Set To-Do'
												onClick={() => setToDo(route)}
												secondary='Add To-Do'>
												Set To-Do
											</Button>
											<Button variant='contained'>Add New Tick</Button>
										</ListItem>
										<Divider />
									</>
							  ))
							: ['climb', 'climb'].map((route, index) => (
									<>
										<ListItem button key={route}>
											<ListItemText primary={route} />
										</ListItem>
										<Divider />
									</>
							  ))}
					</List>
				</div>
			</Drawer>
			<main className={classes.content}>
				<Toolbar />

				<SearchableMap
					handleCoords={props.handleCoords}
					climbs={props.climbs}
					locations={props.locations}
				/>
			</main>
		</div>
	);
}
