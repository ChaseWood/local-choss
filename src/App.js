import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MapContainer from './components/MapContainer';

function App() {
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
				{/* <Route exact path='/map' component={Map} /> */}
			</Switch>
		</div>
	);
}

export default App;
