import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';

const TOKEN = process.env.REACT_APP_TOKEN;

const SearchableMap = () => {
	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 1,
	});
	const [searchResultsLayer, setSearchResultsLayer] = useState(null);

	const mapRef = React.useRef();

	const handleViewportChange = (newViewport) => {
		setViewport({
			...viewport,
			...newViewport,
		});
	};

	const handleOnResult = (event) => {
		setSearchResultsLayer(
			new GeoJsonLayer({
				id: 'search-result',
				data: event.result.geometry,
				getFillColor: [255, 0, 0, 128],
				getRadius: 1000,
				pointRadiusMinPixels: 10,
				pointRadiusMaxPixels: 10,
			})
		);
	};

	return (
		<div style={{ height: '100vh' }}>
			<h1
				style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>
				Use the search bar to find a location or click <a href='/'>here</a> to
				find your location
			</h1>
			<MapGL
				ref={mapRef}
				{...viewport}
				mapStyle='mapbox://styles/chasewood/ckhmw6nna08e019qnybnfzjor'
				width='100%'
				height='90%'
				onViewportChange={handleViewportChange}
				mapboxApiAccessToken={TOKEN}>
				<Geocoder
					mapRef={mapRef}
					onResult={handleOnResult}
					onViewportChange={handleViewportChange}
					mapboxApiAccessToken={TOKEN}
					position='top-left'
				/>
				<DeckGL {...viewport} layers={[searchResultsLayer]} />
			</MapGL>
		</div>
	);
};

export default SearchableMap;
