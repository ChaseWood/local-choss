import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MapContainer from './components/MapContainer';

function App() {
	const url = 'http://localhost:3000/climbs';

	const [locations, setLocations] = useState({
		latitude: 39.7331135,
		longitude: -104.96619050000001,
	});

	const [climbs, setClimbs] = useState([]);

	useEffect(() => {
		fetch(`${url}/${locations.latitude}/${locations.longitude}`)
			.then((res) => res.json())
			.then((data) => setClimbs(data));
	}, [locations]);

	console.log('this is climbs data', climbs);

	const handleCoords = (longitude, latitude) => {
		setLocations({ latitude: latitude, longitude: longitude });
	};

	return (
		<div>
			<Switch>
				<Route
					exact
					path='/'
					render={(rp) => (
						<MapContainer {...rp} handleCoords={handleCoords} climbs={climbs} />
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
