import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TopNavBar from './TopNavBar';
import RouteRow from './RouteRow';
import { makeStyles } from '@material-ui/core/styles';
import UserCard from './UserCard';

const useStyles = makeStyles((theme) => ({
	rootColumn: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	},
	rootRow: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		flexGrow: 1,
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

	const url = 'http://localhost:3001';
	// const url = 'https://local-choss-api.herokuapp.com';

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

	useEffect(() => {
		setNewData(
			Object.keys(piChart).map((key) => ({
				name: String(key),
				value: piChart[key],
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
					<h3>Name</h3>
					<h3>To Do List</h3>
					{userToDos.data
						? userToDos.data.map((climb) => (
								<RouteRow
									deleteClimb={getUserToDos}
									climb={climb}
									setRemoveRow={updateProfile}
								/>
						  ))
						: null}

					<h3>Tick List</h3>
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
