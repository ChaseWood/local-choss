import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TopoVert from '../marker/TopoVert.jpg';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	background: {
		backgroundImage: `url(${TopoVert})`,
	},
}));

const Signup = (props) => {
	const classes = useStyles();
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
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form onSubmit={handleSubmit} className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<TextField
								autoComplete='fname'
								name='username'
								variant='outlined'
								required
								fullWidth
								id='username'
								label='User Name'
								autoFocus
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password_confirmation'
								label='Confirm Password'
								type='password'
								id='password_confirmation'
								autoComplete='current-password'
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link to='/login'>Already have an account? Sign in</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<div>
				<div>{creds.errors ? handleErrors() : null}</div>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Signup;
