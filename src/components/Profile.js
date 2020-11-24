import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = (props) => {
	const [userClimbs, setUserClimbs] = useState({});

	const getUserClimbs = () => {
		axios.get(`http:localhost:3001/user/${props.loggedInStatus.user.id}`).then(
			(response) => {
				setUserClimbs(response);
				console.log('this is users climbing data', response);
			},
			(error) => {
				console.log('error:', error);
			}
		);
	};

	useEffect(() => {
		getUserClimbs();
	}, [userClimbs]);

	return (
		<div>
			<h3>User Name</h3>
			<h3>To Do List</h3>

			<h3>Tick List</h3>
		</div>
	);
};

export default Profile;
