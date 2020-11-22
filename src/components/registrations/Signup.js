import React, { useState } from 'react';
import axios from 'axios';

const Signup = (props) => {
	const [creds, setCreds] = useState({
		username: '',
		email: '',
		password: '',
		password_confirmation: '',
		errors: '',
	});

	const handleChange = (event) => {
		setCreds({ ...creds, [event.target.name]: event.target.value });
	};

	//creating a user object based on the creds state
	//this is sent to the Rails server for authentication
	//then the response is checked if its valid, we call handleLogin in App.js
	//this changes the isLogged_in state
	// else the Rails server responds with errors and
	// the state is set to errors
	const handleSubmit = (event) => {
		event.preventDefault();

		let user = {
			username: creds.username,
			email: creds.email,
			password: creds.password,
			password_confirmation: creds.password_confirmation,
		};

		axios
			.post('http://localhost:3001/users', { user }, { withCredentials: true })
			.then((response) => {
				if (response.data.status === 'created') {
					props.handleLogin(response.data);
					redirect();
				} else {
					setCreds({ ...creds, errors: response.data.errors });
				}
			})
			.catch((error) => console.log('api errors:', error));
	};

	//If the user successfully logs in then you are sent back to home.js
	//this comes from router props history method passed down from app.js
	const redirect = () => {
		props.history.push('/');
	};

	const handleErrors = () => {
		return (
			<div>
				<ul>
					{creds.errors.map((error) => {
						return <li key={error}>{error}</li>;
					})}
				</ul>
			</div>
		);
	};

	return (
		<div>
			<h1>Sign Up</h1>

			<form onSubmit={handleSubmit}>
				<input
					placeholder='username'
					type='text'
					name='username'
					onChange={handleChange}
				/>
				<input
					placeholder='email'
					type='text'
					name='email'
					onChange={handleChange}
				/>
				<input
					placeholder='password'
					type='text'
					name='password'
					onChange={handleChange}
				/>
				<input
					placeholder='password confirmation'
					type='text'
					name='password_confirmation'
					onChange={handleChange}
				/>

				<button placeholder='submit' type='submit'>
					Sign Up
				</button>
			</form>
			<div>{creds.errors ? handleErrors() : null}</div>
		</div>
	);
};

export default Signup;
