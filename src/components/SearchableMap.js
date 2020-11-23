import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';

const TOKEN = process.env.REACT_APP_TOKEN;

const SearchableMap = (props) => {
	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 1,
	});
	const [searchResultsLayer, setSearchResultsLayer] = useState(null);

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
				<Geocoder
					mapRef={mapRef}
					onResult={handleOnResult}
					onViewportChange={handleViewportChange}
					mapboxApiAccessToken={TOKEN}
					position='top-left'
				/>
				{props.locations.latitude ? (
					<Marker
						key={props.locations.latitude}
						latitude={props.locations.latitude}
						longitude={props.locations.longitude}>
						<div>Empty</div>
					</Marker>
				) : null}
				<DeckGL {...viewport} layers={[searchResultsLayer]} />
			</MapGL>
		</div>
	);
};

export default SearchableMap;
