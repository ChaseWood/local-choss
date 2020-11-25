import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TopNavBar from './TopNavBar';
import RouteRow from './RouteRow';

const Profile = (props) => {
	const { handleLogout } = props;
	const [userToDos, setUserToDos] = useState({});
	const [userTickList, setUserTickList] = useState({});

	const getUserToDos = () => {
		axios
			.get(`http://localhost:3001/gettodolist/${props.match.params.id}`)
			.then(
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
		axios
			.get(`http://localhost:3001/getticklist/${props.match.params.id}`)
			.then(
				(response) => {
					setUserTickList(response);
					console.log('this is users climbing data', response);
				},
				(error) => {
					console.log('error:', error);
				}
			);
	};

	useEffect(() => {
		getUserToDos();
	}, []);

	useEffect(() => {
		getUserTickList();
	}, []);

	return (
		<>
			<CssBaseline />
			<Container maxWidth>
				<TopNavBar handleLogout={handleLogout} />
				<h3>Name</h3>
				<h3>To Do List</h3>
				{userToDos.data
					? userToDos.data.map((climb) => <RouteRow climb={climb} />)
					: null}

				<h3>Tick List</h3>
				{userTickList.data
					? userTickList.data.map((climb) => <RouteRow climb={climb} />)
					: null}
			</Container>
		</>
	);
};

export default Profile;
