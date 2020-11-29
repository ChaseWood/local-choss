import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';
import Icon from './marker/marker.png';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import RoomIcon from '@material-ui/icons/Room';

const TOKEN = process.env.REACT_APP_TOKEN;
const useStyles = makeStyles((theme) => ({
	img: {
		width: 30,
		height: 45,
	},
	imgClicked: {
		width: 30,
		height: 45,
		backgroundColor: 'red',
	},
}));

const SearchableMap = (props) => {
	const classes = useStyles();
	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 1,
	});
	const [searchResultsLayer, setSearchResultsLayer] = useState(null);
	const [selectedHotSpot, setSelectedHotSpot] = useState(null);

	const mapStyle = {
		float: 'right',
	};

	const mapRef = React.useRef();

	const handleViewportChange = (newViewport) => {
		setViewport({
			...viewport,
			...newViewport,
		});
	};

	const handleOnResult = (event) => {
		props.handleCoords(event.result.center[0], event.result.center[1]);
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
				<DeckGL {...viewport} layers={[searchResultsLayer]}>
					{props.locations.latitude ? (
						<Marker
							offsetLeft={-20}
							offsetTop={-50}
							key={props.locations.latitude}
							latitude={props.locations.latitude}
							longitude={props.locations.longitude}>
							<RoomIcon
								fontSize='large'
								style={{ color: red[500], fontSize: 50 }}
							/>
							{/* <img className={classes.imgClicked} src={Icon} alt='ICON' /> */}
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
									{props.showMarker.showMarker === true &&
									props.showMarker.id === location.name ? (
										<RoomIcon
											onClick={() => {
												setSelectedHotSpot(location);
											}}
											fontSize='large'
											style={{ color: red[500], fontSize: 50 }}
										/>
									) : (
										<RoomIcon
											onClick={() => {
												setSelectedHotSpot(location);
											}}
											fontSize='large'
										/>
									)}
								</Marker>
						  ))
						: null}
					{selectedHotSpot !== null ? (
						<Popup
							latitude={selectedHotSpot.latitude}
							longitude={selectedHotSpot.longitude}
							closeOnClick={false}
							onClose={() => setSelectedHotSpot(null)}
							anchor='top'>
							<div>{selectedHotSpot.name}</div>
							<div>{selectedHotSpot.type}</div>
							<div>{selectedHotSpot.rating}</div>
							<div>{selectedHotSpot.stars} Stars</div>
							<button
								text='Set To-Do'
								onClick={() => props.setToDo(selectedHotSpot)}>
								To-Do
							</button>
							<button
								text='Set To-Do'
								onClick={() => props.handleTickList(selectedHotSpot)}>
								Tick
							</button>
						</Popup>
					) : null}
				</DeckGL>
			</MapGL>
		</div>
	);
};

export default SearchableMap;
