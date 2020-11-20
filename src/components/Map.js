import React, { useState } from 'react';
import MapGL, { GeolocateControl, Marker } from 'react-map-gl';
import SearchableMap from './SearchableMap';
import 'mapbox-gl/dist/mapbox-gl.css';
require('dotenv').config();

const TOKEN = process.env.REACT_APP_TOKEN;

const geolocateStyle = {
	float: 'right',
	margin: '50px',
	padding: '10px',
};

const Map = (props) => {
	const { locations } = props;

	const [viewport, setViewPort] = useState({
		width: '100%',
		height: 900,
		latitude: 0,
		longitude: 0,
		zoom: 2,
	});

	const _onViewportChange = (viewport) => {
		setViewPort({ ...viewport, transitionDuration: 0.5 });
	};

	//This onClick works when the geolocator to find your location fires.
	// Hoping to use this to get the lat and long and use that to then find the
	// climbs that are within 50 miles or so
	const handleClick = () => {
		console.log('THIS WAS CLICKED');
	};

	// Creates a map that goes to your current location by clicking on a button in the top left corner of the page
	return (
		<div style={{ margin: '0 auto' }}>
			<MapGL
				onClick={handleClick}
				{...viewport}
				mapboxApiAccessToken={TOKEN}
				mapStyle='mapbox://styles/chasewood/ckhmw6nna08e019qnybnfzjor'
				onViewportChange={_onViewportChange}>
				{/* GeoLocateControl creates the button to locate where you are */}
				<GeolocateControl
					position='top-right'
					style={geolocateStyle}
					positionOptions={{ enableHighAccuracy: true }}
					trackUserLocation={true}
				/>
				{/* Maps over climbs from api call in app.js */}
				{/* Need to figure out better markers */}
				{/* {locations.routes.map((location) => (
					<Marker
						key={location.id}
						latitude={location.latitude}
						longitude={location.longitude}>
						<div>YOU ARE HERE</div>
					</Marker>
				))} */}
			</MapGL>
		</div>
	);
};

export default Map;
