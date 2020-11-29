import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TopNavBar from './TopNavBar';
import RouteRow from './RouteRow';
import { makeStyles } from '@material-ui/core/styles';
import TopoMap from './marker/TopoVert.jpg';
import UserCard from './UserCard';
import '../../node_modules/react-vis/dist/style.css';

const useStyles = makeStyles((theme) => ({
	rootColumn: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		background: `url(${TopoMap})`,
	},
	rootRow: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		flexGrow: 1,
		height: '100vh',
	},

	container: {
		display: 'flex',
	},
	userCard: {
		height: 'fit-content',
	},
}));

const Profile = (props) => {
	const classes = useStyles();
	const { handleLogout, loggedInStatus } = props;
	const [userToDos, setUserToDos] = useState({});
	const [userTickList, setUserTickList] = useState({});
	const [removeRow, setRemoveRow] = useState(false);
	const [piChart, setPiChart] = useState([]);
	const [newData, setNewData] = useState([]);

	// const url = 'http://localhost:3001';
	const url = 'https://local-choss-api.herokuapp.com';

	const updateProfile = () => {
		setRemoveRow(!removeRow);
	};

	const getUserToDos = () => {
		axios.get(`${url}/gettodolist/${props.match.params.id}`).then(
			(response) => {
				setUserToDos(response);
				console.log('this is users climbing data', response);
			},
			(error) => {
				console.log('error:', error);
			}
		);
	};

	const getUserTickList = () => {
		axios.get(`${url}/getticklist/${props.match.params.id}`).then(
			(response) => {
				setUserTickList(response);
				console.log('this is users climbing data', response);
			},
			(error) => {
				console.log('error:', error);
			}
		);
	};

	//this data is for a pie chart but I cant get one to load on page load for
	// some strange reason...
	const getUserPiChart = () => {
		axios.get(`${url}/getuserchart/${props.match.params.id}`).then(
			(response) => {
				setPiChart(response.data);
				console.log('this is users climbing data', response);
			},
			(error) => {
				console.log('error:', error);
			}
		);
	};

	// this is for data that is to be sent to a chart, but i cant get one to load
	// when the page loads and it will only load after removing a row for some reason
	useEffect(() => {
		setNewData(
			Object.keys(piChart).map((key) => ({
				label: String(key),
				angle: piChart[key],
			}))
		);
	}, [removeRow]);

	useEffect(() => {
		getUserPiChart();
	}, [removeRow]);

	useEffect(() => {
		getUserToDos();
	}, [removeRow]);

	useEffect(() => {
		getUserTickList();
	}, [removeRow]);

	return (
		<div className={classes.rootColumn}>
			<TopNavBar handleLogout={handleLogout} loggedInStatus={loggedInStatus} />

			<div className={classes.rootRow}>
				<CssBaseline />
				<div style={{ padding: 20 }}>
					<UserCard loggedInStatus={loggedInStatus} />
				</div>
				<Container>
					{/* {newData ? (
						<RadialChart
							data={newData}
							width={300}
							height={300}
							labelsRadiusMultiplier={1.1}
							labelsStyle={{
								fontSize: 12,
							}}
							showLabels
						/>
					) : null} */}
					<h1>To Do List</h1>
					{userToDos.data
						? userToDos.data.map((climb) => (
								<RouteRow
									deleteClimb={getUserToDos}
									climb={climb}
									setRemoveRow={updateProfile}
								/>
						  ))
						: null}

					<h1>Tick List</h1>
					{userTickList.data
						? userTickList.data.map((climb) => (
								<RouteRow
									deleteClimb={getUserTickList}
									climb={climb}
									setRemoveRow={updateProfile}
								/>
						  ))
						: null}
				</Container>
			</div>
		</div>
	);
};

export default Profile;
