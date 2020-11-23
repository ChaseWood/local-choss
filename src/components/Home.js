import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
	const { loggedInStatus } = props;
	const handleClick = () => {
		axios
			.delete('http://localhost:3001/logout', { withCredentials: true })
			.then((response) => {
				props.handleLogout();
				props.history.push('/');
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			{loggedInStatus.isLoggedIn === false ? (
				<Link to='/login'>Log In</Link>
			) : null}
			<br></br>

			{loggedInStatus.isLoggedIn === false ? (
				<Link to='/signup'>Sign Up</Link>
			) : null}

			<br></br>

			{loggedInStatus.isLoggedIn === true ? (
				<Link to='/logout' onClick={handleClick}>
					Log Out
				</Link>
			) : null}
		</div>
	);
};

export default Home;
