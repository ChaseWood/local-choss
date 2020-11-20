import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import SearchableMap from './components/SearchableMap';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

function App() {
	const apiKey = '200965041-9849b0bf4efa888bd435da7521d00992';
	// const url = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=40.03&lon=-105.25&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=${apiKey}`;
	const url = 'http://localhost:3000/climbs';

	const [locations, setLocations] = useState([]);

	// useEffect(() => {
	// 	fetch(url)
	// 		.then((res) => res.json())
	// 		.then((data) => setLocations(data));
	// }, []);

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

	return (
		<div>
			<Switch>
				<Route exact path='/' component={Map} />
				<Route exact path='/' component={SearchableMap} />
			</Switch>
		</div>
	);
}

export default App;
