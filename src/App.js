import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import MapContainer from './components/MapContainer';
import Home from './components/Home';
import Login from './components/registrations/Login';
import Signup from './components/registrations/Signup';
import Profile from './components/Profile';

function App() {
	const url = 'http://localhost:3001/climbs';
	// const url = 'https://local-choss-api.herokuapp.com/';

	//handling if the user is logged in or not
	const [isLoggedIn, setIsLoggedIn] = useState({
		isLoggedIn: false,
		user: {},
	});

	//this function handles the user data to set the state to logged in
	const handleLogin = (data) => {
		setIsLoggedIn({
			isLoggedIn: true,
			user: data.user,
		});
	};

	//this function sets the state to logged out and removes the user data
	const handleLogout = () => {
		setIsLoggedIn({
			isLoggedIn: false,
			user: {},
		});
	};

	// Checks if user is logged in using local storage
	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			handleLogin(foundUser);
		}
	}, []);

	// THE CODE BELOW WAS CHECKING FOR IF SOMEONE WAS LOGGED IN THROUGH THE BACK END I STARTED DOING IT THROUGH THE LOCAL STORAGE FOR PERSISTENCE BECAUSE I COULD NOT FIGURE OUT HOW TO GET THIS TO WORK.

	//get request using axios to communicate with rails server
	//it checks through the def is_logged_in? route
	//if the user is verified then a logged_in boolean is returned along with
	// the user object
	// const loginStatus = () => {
	// 	const url = 'http://localhost:3001/logged_in';
	// 	axios
	// 		.get(`${url}`, {
	// 			withCredentials: true,
	// 		})
	// 		.then((response) => {
	// 			if (response.data.logged_in) {
	// 				handleLogin(response);
	// 			} else {
	// 				handleLogout(response);
	// 			}
	// 		})
	// 		.catch((error) => console.log('api errors:', error));
	// };

	// //keeps track of any changes to the logged in user
	// useEffect(() => {
	// 	loginStatus();
	// }, []);

	////////////////////////////////////////////////////////////////////////////
	//////////////BELOW HANDLES SEARCHING AND GETTING THE LOCATION//////////////
	////////////////////////////////////////////////////////////////////////////

	//setting location from search
	const [locations, setLocations] = useState({
		latitude: null,
		longitude: null,
	});

	//getting data from api call based on location from search
	const [climbs, setClimbs] = useState([]);

	//api call made to get climbs close to location from search
	useEffect(() => {
		fetch(`${url}/${locations.latitude}/${locations.longitude}`)
			.then((res) => res.json())
			.then((data) => setClimbs(data));
	}, [locations]);

	//function that lifted state from searchableMap.js to set lat
	// and long when user searched a location
	const handleCoords = (longitude, latitude) => {
		setLocations({ latitude: latitude, longitude: longitude });
	};

	return (
		<div style={{ display: 'flex' }}>
			<Switch>
				<Route
					exact
					path='/home'
					render={(rp) => (
						<Home
							{...rp}
							handleLogout={handleLogout}
							loggedInStatus={isLoggedIn}
						/>
					)}
				/>
				<Route
					exact
					path='/login'
					render={(rp) => (
						<Login
							{...rp}
							handleLogin={handleLogin}
							loggedInStatus={isLoggedIn}
						/>
					)}
				/>

				<Route
					exact
					path='/signup'
					render={(rp) => (
						<Signup
							{...rp}
							handleLogin={handleLogin}
							loggedInStatus={isLoggedIn}
						/>
					)}
				/>

				<Route
					exact
					path='/'
					render={(rp) => (
						<MapContainer
							{...rp}
							handleLogin={handleLogin}
							handleLogout={handleLogout}
							loggedInStatus={isLoggedIn}
							handleCoords={handleCoords}
							climbs={climbs}
							locations={locations}
						/>
					)}
				/>
				<Route
					exact
					path='/user'
					render={(rp) => <Profile {...rp} loggedInStatus={isLoggedIn} />}
				/>
			</Switch>
		</div>
	);
}

export default App;
