import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import VerifyAlert from './VerifyAlert';
import TopNavBar from '../TopNavBar';

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
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		flexGrow: 1,
	},
	item: {
		padding: 0,
	},
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = (props) => {
	const classes = useStyles();
	const { loggedInStatus } = props;
	const [creds, setCreds] = useState({
		username: '',
		email: '',
		password: '',
		errors: '',
	});

	const url = 'http://localhost:3001';
	// const url = 'https://local-choss-api.herokuapp.com';

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
			.post(`${url}/login`, { user }, { withCredentials: true })
			.then((response) => {
				if (response.data.logged_in === true) {
					props.handleLogin(response.data);
					console.log('this is response.data from login', response.data);
					localStorage.setItem('user', JSON.stringify(response.data));
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
		if (loggedInStatus.isLoggedIn) {
			redirect();
		} else {
			return null;
		}
	});

	const handleErrors = () => {
		return (
			<div>
				{/* <VerifyAlert /> */}
				<ul>
					{creds.errors.map((error) => {
						return <li key={error}>{error}</li>;
					})}
				</ul>
			</div>
		);
	};

	return (
		<div className={classes.root}>
			<TopNavBar loggedInStatus={loggedInStatus} />
			<Container component='main' maxWidth='xs'>
				<CssBaseline />

				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<form onSubmit={handleSubmit} className={classes.form} noValidate>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='username'
							label='User Name'
							name='username'
							autoComplete='user-name'
							autoFocus
							onChange={handleChange}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							onChange={handleChange}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={handleChange}
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							Sign In
						</Button>
						<Grid container>
							{/* <Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid> */}
							<Grid item>
								<Link to='/signup'>{"Don't have an account? Sign Up"}</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<div>
					<div>{creds.errors ? handleErrors() : null}</div>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
};

export default Login;
