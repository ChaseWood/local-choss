import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';
import Icon from './marker/marker.png';

const TOKEN = process.env.REACT_APP_TOKEN;

const SearchableMap = (props) => {
	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 1,
	});
	const [searchResultsLayer, setSearchResultsLayer] = useState(null);
	const [showPopup, setShowPopup] = useState({ showPopup: true });

	const mapStyle = {
		float: 'right',
	};

	const mapRef = React.useRef();

	const handleViewportChange = (newViewport) => {
		setViewport({
			...viewport,
			...newViewport,
		});
		// props.handleCoords(viewport.latitude, viewport.longitude);
	};

	const handleOnResult = (event) => {
		props.handleCoords(event.result.center[0], event.result.center[1]);
		console.log('this is handleOnResult', event);
		setSearchResultsLayer(
			new GeoJsonLayer({
				id: 'search-result',
				data: event.result.geometry,
				getFillColor: [0, 48, 68, 0],
				getRadius: 1000,
				pointRadiusMinPixels: 500,
				pointRadiusMaxPixels: 600,
			})
		);
	};

	return (
		<div style={{ height: '100vh' }}>
			<MapGL
				style={mapStyle}
				ref={mapRef}
				{...viewport}
				mapStyle='mapbox://styles/chasewood/ckhmw6nna08e019qnybnfzjor'
				width='100%'
				height='100%'
				onViewportChange={handleViewportChange}
				mapboxApiAccessToken={TOKEN}>
				{showPopup && (
					<Popup
						latitude={37.78}
						longitude={-122.41}
						closeOnClick={false}
						onClose={() => setShowPopup({ showPopup: false })}
						anchor='top'>
						<div>You are here</div>
					</Popup>
				)}
				<Geocoder
					mapRef={mapRef}
					onResult={handleOnResult}
					onViewportChange={handleViewportChange}
					mapboxApiAccessToken={TOKEN}
					position='top-left'
				/>
				{props.locations.latitude ? (
					<Marker
						offsetLeft={-20}
						offsetTop={-20}
						key={props.locations.latitude}
						latitude={props.locations.latitude}
						longitude={props.locations.longitude}>
						<img src={Icon} alt='ICON' />
					</Marker>
				) : (
					<div></div>
				)}
				{props.climbs.routes
					? props.climbs.routes.map((location) => (
							<Marker
								offsetLeft={-20}
								offsetTop={-20}
								key={location.id}
								latitude={location.latitude}
								longitude={location.longitude}>
								<img src={Icon} alt='ICON' />
							</Marker>
					  ))
					: null}
				<DeckGL {...viewport} layers={[searchResultsLayer]} />
			</MapGL>
		</div>
	);
};

export default SearchableMap;
