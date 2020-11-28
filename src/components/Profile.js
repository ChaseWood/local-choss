import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TopNavBar from './TopNavBar';
import RouteRow from './RouteRow';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

const Profile = (props) => {
	const { handleLogout } = props;
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
		<>
			<CssBaseline />
			<Container maxWidth>
				<TopNavBar handleLogout={handleLogout} />
				<PieChart width={400} height={300}>
					<Pie
						dataKey='value'
						startAngle={180}
						endAngle={0}
						data={newData}
						cx={200}
						cy={200}
						outerRadius={80}
						fill='#8884d8'
						label
					/>
					<Tooltip />
				</PieChart>
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
		</>
	);
};

export default Profile;
