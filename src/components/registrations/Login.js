import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = (props) => {
	const { loggedInStatus } = props;
	const [creds, setCreds] = useState({
		username: '',
		email: '',
		password: '',
		errors: '',
	});

	const handleChange = (event) => {
		setCreds({ ...creds, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		let user = {
			username: creds.username,
			email: creds.email,
			password: creds.password,
		};

		axios
			.post('http://localhost:3001/login', { user }, { withCredentials: true })
			.then((response) => {
				if (response.data.logged_in) {
					props.handleLogin(response.data);
					redirect();
				} else {
					setCreds({ ...creds, errors: response.data.errors });
				}
			})
			.catch((error) => console.log('api errors:', error));
	};

	const redirect = () => {
		props.history.push('/');
	};

	useEffect(() => {
		if (loggedInStatus) {
			redirect();
		} else {
			return null;
		}
	});

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
			<h1>Login In</h1>

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
					type='password'
					name='password'
					onChange={handleChange}
				/>

				<button placeholder='submit' type='submit'>
					Log In
				</button>

				<div>
					or <Link to='/signup'>Sign Up</Link>
				</div>
			</form>
			<div>{creds.errors ? handleErrors() : null}</div>
		</div>
	);
};

export default Login;
