import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Map from './components/Map';
import SearchableMap from './components/SearchableMap';
import MapContainer from './components/MapContainer';

function App() {
	const apiKey = '200965041-9849b0bf4efa888bd435da7521d00992';
	// const url = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=40.03&lon=-105.25&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=${apiKey}`;
	const url = 'http://localhost:3000/climbs';

	const [locations, setLocations] = useState({
		latitude: null,
		longitude: null,
	});

	const [climbs, setClimbs] = useState([]);

	useEffect(() => {
		fetch(`${url}/${locations.latitude}/${locations.longitude}`)
			.then((res) => res.json())
			.then((data) => setClimbs(data));
		console.log('this is climbs data', climbs);
	}, [locations]);

	// const getLocations = async () => {
	// 	try {
	// 		const res = await fetch(url);
	// 		const json = await res.json();
	// 		setLocations(json);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// useEffect(() => getLocations(), []);

	const handleCoords = (longitude, latitude) => {
		setLocations({ latitude: latitude, longitude: longitude });
		console.log(latitude, longitude);
	};

	return (
		<div>
			<Switch>
				<Route
					exact
					path='/'
					render={(rp) => <MapContainer {...rp} handleCoords={handleCoords} />}
				/>
			</Switch>
		</div>
	);
}

export default App;
