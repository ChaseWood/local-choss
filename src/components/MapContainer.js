import React, { useEffect, useRef, useState } from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import TopoMap from './marker/TopoVert.jpg';
import SearchableMap from '../components/SearchableMap';

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
		background: `url(${TopoMap})`,
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

export default function MapContainer(props) {
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

	const handleLogoutClick = () => {
		axios
			.delete('http://localhost:3001/logout', { withCredentials: true })
			.then((response) => {
				props.handleLogout();
				props.history.push('/');
			})
			.catch((error) => console.log(error));
	};

	// // Checks if user is logged in using local storage
	// useEffect(() => {
	// 	const loggedInUser = localStorage.getItem('user');
	// 	if (loggedInUser) {
	// 		const foundUser = JSON.parse(loggedInUser);
	// 		props.handleLogin(foundUser);
	// 		console.log('this is localStorage', foundUser);
	// 	}
	// }, []);

	//sets climb to the user who is logged in
	const setToDo = (climb) => {
		console.log('this is setToDo', climb);
		axios({
			method: 'post',
			url: `http://localhost:3001/settodo/${props.loggedInStatus.user.id}/${climb.id}`,
			data: {
				user_id: props.loggedInStatus.user.id,
				route_id: climb.id,
				ticklist: false,
				name: climb.name,
				style: climb.type,
				rating: climb.rating,
				stars: climb.stars,
				pitches: climb.pitches,
				location: climb.location,
				longitude: climb.longitude,
				latitude: climb.latitude,
				url: climb.url,
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

	const handleTickList = (tick) => {
		axios({
			method: 'post',
			url: `http://localhost:3001/setticklist/${props.loggedInStatus.user.id}/${tick.id}`,
			data: {
				user_id: props.loggedInStatus.user.id,
				route_id: tick.id,
				ticklist: true,
				name: tick.name,
				style: tick.type,
				rating: tick.rating,
				stars: tick.stars,
				pitches: tick.pitches,
				location: tick.location,
				longitude: tick.longitude,
				latitude: tick.latitude,
				url: tick.url,
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
					<Link to='/'>
						<Typography variant='h4' noWrap>
							Local Choss
						</Typography>
					</Link>
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
								<Button onClick={handleLogoutClick} color='inherit'>
									logout
								</Button>
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
								<Link to={'/users/' + props.loggedInStatus.user.id}>
									<MenuItem onClick={handleClose}>Profile</MenuItem>
								</Link>
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
											<Button
												onClick={() => handleTickList(route)}
												variant='contained'>
												Add New Tick
											</Button>
										</ListItem>
										<Divider />
									</>
							  ))
							: null}
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
